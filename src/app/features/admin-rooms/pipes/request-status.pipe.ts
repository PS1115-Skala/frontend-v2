import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "requestStatus",
})
export class RequestStatusPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case "P":
        return "Pendiente";
      case "A":
        return "Aprobada";
      case "R":
        return "Rechazada";
      default:
        return value;
    }
  }
}
