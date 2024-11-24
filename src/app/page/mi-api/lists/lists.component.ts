import { Component, OnInit } from '@angular/core';
import { EjemploService } from './services/ejemplo.service';
import { EjemploAll } from './interfaces/ejemplo';
import { EjemploListComponent } from './ejemplo-list/ejemplo-list.component';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [EjemploListComponent],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css'
})
export class ListsComponent implements OnInit{
  ejemplo:EjemploAll | undefined
  constructor(
    private _srvEjemplo:EjemploService
  ){}

  ngOnInit(): void {
    this._srvEjemplo.getAllEjemplo().subscribe(ejempl => {
      this.ejemplo = ejempl
      console.log(this.ejemplo)
    })
  }
}
