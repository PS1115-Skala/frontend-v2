import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { LoadingBarService } from "@ngx-loading-bar/core";
import { environment } from "environments/environment";
import { forkJoin } from "rxjs";
import { DialogUploadImageComponent } from "../../components/dialogs/dialog-upload-image.component";
import { Item } from "../../models/item";
import { Room } from "../../models/room";
import { DashboardService } from "../../services/dashboard.service";
declare var $: any;

@Component({
  selector: "app-room-admin",
  templateUrl: "./room-admin.component.html",
  styleUrls: ["./room-admin.component.css"],
})
export class RoomAdminComponent implements OnInit {
  roomId: string;
  room: Room;
  picture: string;
  API = environment.api_url;
  items: Item[];
  isLabAdmin: boolean;
  roomForm: FormGroup;
  itemsFormGroup: FormGroup[] = [];
  // Arreglo de Ids de los items que seran eliminados.
  itemsToBeDeleted: string[] = [];
  // Arreglo de items que se pueden agregar
  itemsToBeAdded: any;
  croppedImg: string;

  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    private loadingBar: LoadingBarService,
    private formBuilder: FormBuilder,
    private location: Location,
    private dialog: MatDialog
  ) {}

  initRoomForm(): void {
    // Creamos el FormGroup de Items
    this.items.forEach((item) => {
      this.itemsFormGroup.push(
        this.formBuilder.group({
          id: [{ value: item.id, disabled: true }],
          name: [{ value: item.name, disabled: true }],
          description: [{ value: item.description, disabled: true }],
          quantity: [item.quantity, Validators.min(1)],
        })
      );
    });
    // Creamos formgroup de la sala
    this.roomForm = this.formBuilder.group({
      name: [this.room.name, Validators.required],
      description: [this.room.description, Validators.required],
      isActive: [this.room.is_active],
      editItems: this.formBuilder.array(this.itemsFormGroup),
      newItems: this.formBuilder.array([]),
    });
  }

  ngOnInit(): void {
    this.loadingBar.start();
    this.route.params.subscribe((params) => {
      this.roomId = params["roomId"];
    });
    this.itemsFormGroup = [];
    this.itemsToBeDeleted = [];
    let roomDetails = this.dashboardService.getRoomDetails(this.roomId);
    let roomItems = this.dashboardService.getRoomItems(this.roomId);
    let itemsToBeAdded = this.dashboardService.getNotItems(this.roomId);
    forkJoin({
      roomDetails: roomDetails,
      roomItems: roomItems,
      itemsToBeAdded: itemsToBeAdded,
    }).subscribe(({ roomDetails, roomItems, itemsToBeAdded }) => {
      this.room = roomDetails[0];
      this.picture = `${this.API}/salas/${this.roomId}/picture`;
      this.items = roomItems;
      this.itemsToBeAdded = itemsToBeAdded;
      this.initRoomForm();
    });
    this.loadingBar.complete();
  }

  openChangeImageDialog() {
    let dialogRef = this.dialog.open(DialogUploadImageComponent, {
      height: "600px",
      width: "600px",
      data: {
        picture: this.picture,
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      this.croppedImg = data;
    });
  }

  goBack() {
    this.location.back();
  }

  addNewItemFormGroup() {
    this.newItems.push(
      this.formBuilder.group({
        id: ["", Validators.required],
        description: [{ value: "", disabled: true }, Validators.required],
        quantity: ["", Validators.min(1)],
      })
    );
  }

  removeEditItemFormGroup(index) {
    let itemId = this.editItems.controls[index].get("id").value;
    this.itemsToBeDeleted.push(itemId);
    this.editItems.removeAt(index);
  }

  removeNewItemFormGroup(index) {
    this.newItems.removeAt(index);
  }

  updateItemDescription(index, description) {
    this.newItems.controls[index].get("description").setValue(description);
  }

  successNotify(message) {
    $.notify(
      {
        icon: "check",
        message: message,
      },
      {
        type: "success",
        timer: 5000,
        placement: {
          from: "top",
          align: "right",
        },
      }
    );
  }

  errorNotify(message) {
    $.notify(
      {
        icon: "close",
        message: message,
      },
      {
        type: "danger",
        timer: 5000,
        placement: {
          from: "top",
          align: "right",
        },
      }
    );
  }

  submitItems() {
    let observableItems = [];
    // Eliminar Items
    this.itemsToBeDeleted.forEach((itemId) => {
      observableItems.push(
        this.dashboardService.deleteItemSala(this.roomId, itemId)
      );
    });
    // Editar Items
    this.editItems.controls.forEach((itemControl) => {
      observableItems.push(
        this.dashboardService.editItemSala(
          this.roomId,
          itemControl.get("id").value,
          itemControl.get("quantity").value
        )
      );
    });
    // Agregar Items
    this.newItems.controls.forEach((itemControl) => {
      observableItems.push(
        this.dashboardService.addItemSala(
          this.roomId,
          itemControl.get("id").value,
          itemControl.get("quantity").value
        )
      );
    });
    forkJoin(observableItems).subscribe(
      () => {
        this.loadingBar.complete();
        this.successNotify("Sala actualizada exitosamente.");
        this.goBack();
      },
      (error) => {
        this.loadingBar.complete();
        this.errorNotify("Error al modificar los items de la sala.");
        this.ngOnInit();
      }
    );
  }

  onSubmit() {
    this.loadingBar.start();
    if (this.roomForm.valid) {
      if (this.croppedImg) {
        this.dashboardService
          .editImageRoom(this.roomId, this.croppedImg)
          .subscribe((error) => {
            this.loadingBar.complete();
            this.errorNotify("Hubo un error al modificar imagen de sala");
          });
      }
      let observableEditRoom = this.dashboardService.editRoom(
        this.roomId,
        this.name.value,
        this.description.value,
        this.isActive.value
      );
      observableEditRoom.subscribe(
        () => {
          this.submitItems();
        },
        (error) => {
          this.loadingBar.complete();
          this.errorNotify(
            "No se puede desactivar una sala con reservas activas."
          );
        }
      );
    } else {
      this.loadingBar.complete();
    }
  }

  get name() {
    return this.roomForm.get("name");
  }

  get description() {
    return this.roomForm.get("description");
  }

  get isActive() {
    return this.roomForm.get("isActive");
  }

  get editItems() {
    return this.roomForm.get("editItems") as FormArray;
  }

  get newItems() {
    return this.roomForm.get("newItems") as FormArray;
  }
}
