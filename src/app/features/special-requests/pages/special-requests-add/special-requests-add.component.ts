import { Component, OnInit } from '@angular/core';
import { CoreService } from 'app/core/services/core.service';
import { SpecialRequestsService } from '../../services/special-requests.service';

@Component({
  selector: 'app-special-requests-add',
  templateUrl: './special-requests-add.component.html',
  styleUrls: ['./special-requests-add.component.css']
})
export class SpecialRequestsAddComponent implements OnInit {
  laboratorios: any[];

  constructor(private specialRequestsService: SpecialRequestsService, private coreService: CoreService) { }

  ngOnInit(): void {
    this.coreService.getAdminLabs().subscribe( response => this.laboratorios = response );
  }

  onCrear(values: any) {
    const userId = this.coreService.getuserId();
    this.specialRequestsService.createSpecialReservation(values, userId)
    .subscribe( 
      response => { this.coreService.successNotification(response.message); },
      error => { this.coreService.errorNotification(error.error.error); } 
    );
  }

}
