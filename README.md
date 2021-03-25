# Sistema de reservas del laboratorio F (https://www.front.reservac.live/)

**Sistema de reservas del laboratorio F** Este sistema se utilizara para gestionar toda la información correspondiente a salas del laboratorio F.

## Tabla de contenido

- [Versiones](#versiones)
- [Terminal de Comandos](#terminal-de-comandos)
- [Comandos utiles](#comandos-utiles)
- [Utilidades](#utilidades)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Recursos](#recursos)

## Versiones

Nodejs version: v15.6.0

npm version: 6.14.11## Quick start

## Terminal de Comandos

El proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli)version 1.0.0 y angular 4.x.

1. Instala la version mencionada de [NodeJs Official Page](https://nodejs.org/en).
2. Abre la terminal
3. Asegurate de tener instalado el [Angular CLI](https://github.com/angular/angular-cli) sino por favor instalalo.
4. Corre en la terminal: `npm install`
5. Corre `ng serve` para un servidor de desarrollo. Dirigete al `http://localhost:4200/`. La aplicacion se recarga sola si se detectan cambios en el codigo fuente.

## Comandos utiles

Para generar un modulo: `ng generate module features/<tu_feature> --routing`

Para generar un componente dentro del modulo: `ng generate module features/<tu_feature>/pages/<tu_componente> --module=<tu_feature>.module`

Para generar un servicio dentro del modulo: `ng generate service features/<tu_feature>/services/<tu_servicio>`

Tambien se pueden generar guards, interceptores, interfaces, entre otros siguiendo una sintaxis similar.

## Utilidades

Para generar modales se recomienda utilizar [Dialog | Angular Material](https://material.angular.io/components/dialog/overview)

Para generar datatable se recomienda utilizar [Angular DataTables](https://l-lin.github.io/angular-datatables/#/welcome)

## Estructura del proyecto

El proyecto esta utilizando la plantilla [Material Dashboard Angular 2](https://demos.creative-tim.com/material-dashboard-angular2/#/dashboard)

La documentacion de la plantilla se puede encontrar en [Documentacion de Material Dashboard](https://demos.creative-tim.com/material-dashboard-angular2/#/documentation/tutorial)

Para realizar la creacion de modulos dentro del proyecto se usara la siguiente convencion:

Cualquier componente o servicio que vaya a ser utilizado por todos los modulos del proyecto deben ir en la carpeta `core`.

La creacion de cualquier modulo debe ir debera ir en la carpeta `features`.

La estructura siguiendo esta convencion queda de la siguiente manera [Arbol del proyecto](https://medium.com/@shijin_nath/angular-right-file-structure-and-best-practices-that-help-to-scale-2020-52ce8d967df5):

```
frontend-v2 (Obviando la estructura de un proyecto de Angular)
├── src
│   ├── app
│   │   ├── app.component.css
│   │   ├── app.component.html
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   ├── app.routing.ts
│   │   ├── core
│   │   │   ├── components
│   │   │   ├── constants
│   │   │   ├── guards
│   │   │   ├── interceptors
│   │   │   ├── models
│   │   │   ├── services
│   │   ├── features
│   │   │   ├── tu feature
│   │   │   │   ├── components
│   │   │   │   ├── pages
│   │   │   │   ├── constants
│   │   │   │   ├── guards
│   │   │   │   ├── interceptors
│   │   │   │   ├── models
│   │   │   │   ├── services
│   │   │   │   tu-feature.component.css|html|ts
│   │   │   │   tu-feature.module.ts
│   │   │   │   tu-feature.routing.module.ts
│   ├── assets
│   │   ├── css
│   │   │   └── demo.css
│   │   ├── img
│   │   └── scss
│   │       ├── core
│   │       └── material-dashboard.scss

```

Luego añadir el componente de tu feature al app.routing con su rutas hijas. Por defecto todos los features utilizaran el app-layout. Para entender esto ver la estructura del modulo de dashboard o auth.

## Recursos

- Demo: <https://demos.creative-tim.com/material-dashboard-angular2/#/dashboard>
- Download Page: <https://www.creative-tim.com/product/material-dashboard-angular2>
- Documentation: <https://demos.creative-tim.com/material-dashboard-angular2/#/documentation/tutorial>
- License Agreement: <https://www.creative-tim.com/license>
- Support: <https://www.creative-tim.com/contact-us>
- Issues: [Github Issues Page](https://github.com/creativetimofficial/material-dashboard-angular2/issues)
- [Material Kit](https://www.creative-tim.com/product/material-kit?ref=github-mda-free) - For Front End Development
