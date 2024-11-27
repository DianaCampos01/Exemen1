import { Component, OnInit, ViewChild } from '@angular/core';
import { EjemploService } from './services/ejemplo.service';
import {  Cursos } from './interfaces/cursos';
import { EjemploListComponent } from './Curso-list/ejemplo-list.component';
import { ModalAgregarComponent } from './modal-agregar/modal-agregar.component';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [EjemploListComponent, ModalAgregarComponent],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css'
})
export class ListsComponent implements OnInit{
  cursos:Cursos | undefined

  @ViewChild(ModalAgregarComponent) public modal!:ModalAgregarComponent
  constructor(
    private _srvEjemplo:EjemploService
  ){}

  ngOnInit(): void {
    this._srvEjemplo.getAllCursos().subscribe(curso => {
      this.cursos = curso
    })
  }

  openModal(){
    if(this.modal){
      this.modal.open()
    }
  }
}
