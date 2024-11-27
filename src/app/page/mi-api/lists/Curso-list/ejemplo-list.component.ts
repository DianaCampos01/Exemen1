import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { NgFor, NgIf } from '@angular/common';
import { EjemploService } from '../services/ejemplo.service';
import { ModalEditComponent } from '../modal-edit/modal-edit.component';
import {  Curso, Cursos } from '../interfaces/cursos';

@Component({
  selector: 'app-ejemplo-list',
  standalone: true,
  imports: [NgFor, NgIf, ModalEditComponent],
  templateUrl: './ejemplo-list.component.html',
  styleUrl: './ejemplo-list.component.css'
})
export class EjemploListComponent implements OnInit{
  @Input() cursos:Cursos | undefined

  @ViewChild(ModalEditComponent) public modal!: ModalEditComponent

  constructor(
    private _srvEjemplo:EjemploService
  ){}

  ngOnInit(): void {
      
  }

  openmodal(cursos:Curso){
    if(this.modal){
      this.modal.open(cursos)
    }
  }

  eliminarCurso(id:String){
    this._srvEjemplo.deleteCurso(id).subscribe(eje => {
      console.log('Curso eliminado')
      window.location.reload();
    })
  }
}
