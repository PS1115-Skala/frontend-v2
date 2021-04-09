import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-laboratories-page',
  templateUrl: './list-laboratories-page.component.html',
  styleUrls: ['./list-laboratories-page.component.css']
})
export class ListLaboratoriesPageComponent implements OnInit {

  constructor() { }

  laboratorios: any[];
  ngOnInit(): void {
    this.laboratorios = [1,2,3,4,5];
    console.log(this.laboratorios);
  }

}
