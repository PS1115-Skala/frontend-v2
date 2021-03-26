import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "userType",
})
export class UserTypePipe implements PipeTransform {
  transform(type: number): string {
    switch (type) {
      case 0: {
        return "Departamento";
      }
      case 1111: {
        return "Estudiante";
      }
      case 2222: {
        return "Profesor";
      }
      case 3333: {
        return "Admin Lab";
      }
      case 4444: {
        return "Laboratorio F";
      }
    }
    return null;
  }
}
