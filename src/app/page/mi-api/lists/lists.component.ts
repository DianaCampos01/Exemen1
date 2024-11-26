import { Component, OnInit, ViewChild } from '@angular/core';
import { EjemploService } from './services/ejemplo.service';
import { computadorR } from './interfaces/ejemplo';
import { EjemploListComponent } from './ejemplo-list/ejemplo-list.component';
import { ModalAgregarComponent } from './modal-agregar/modal-agregar.component';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [EjemploListComponent, ModalAgregarComponent],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css'
})
export class ListsComponent implements OnInit{
  ejemplo:computadorR | undefined

  @ViewChild(ModalAgregarComponent) public modal!:ModalAgregarComponent
  constructor(
    private _srvEjemplo:EjemploService
  ){}

  ngOnInit(): void {
    this._srvEjemplo.getAllEjemplo().subscribe(ejempl => {
      this.ejemplo = ejempl
      console.log(this.ejemplo)
    })
  }

  openModal(){
    if(this.modal){
      this.modal.open()
    }
  }
}
