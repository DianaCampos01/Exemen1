import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Ejemplo, EjemploAll } from '../interfaces/ejemplo';
import { NgFor, NgIf } from '@angular/common';
import { EjemploService } from '../services/ejemplo.service';
import { ModalEditComponent } from '../modal-edit/modal-edit.component';

@Component({
  selector: 'app-ejemplo-list',
  standalone: true,
  imports: [NgFor, NgIf, ModalEditComponent],
  templateUrl: './ejemplo-list.component.html',
  styleUrl: './ejemplo-list.component.css'
})
export class EjemploListComponent implements OnInit{
  @Input() ejemplo:EjemploAll | undefined

  @ViewChild(ModalEditComponent) public modal!: ModalEditComponent

  constructor(
    private _srvEjemplo:EjemploService
  ){}

  ngOnInit(): void {
      
  }

  openmodal(ejemplo:Ejemplo){
    if(this.modal){
      this.modal.open(ejemplo)
    }
  }

  eliminarEjemplo(id:String){
    this._srvEjemplo.deleteEjemplo(id).subscribe(eje => {
      console.log('Ejemplo eliminado')
    })
  }
}
