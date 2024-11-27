import { Component, ElementRef, Inject, Input, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { Curso } from '../interfaces/cursos';
import { isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import { EjemploService } from '../services/ejemplo.service';

@Component({
  selector: 'app-modal-edit',
  standalone: true,
  imports: [NgIf],
  templateUrl: './modal-edit.component.html',
  styleUrl: './modal-edit.component.css'
})
export class ModalEditComponent  implements OnInit{
  @Input() curso: Curso = {
    _id: '',
    nombre: '',
    duracionHoras: 0,
    nivel: '',
    precio: 0
  };

  ngOnInit(): void {
      
  }

  private bootstrapmodal:any
  @ViewChild('modalElement') public modal!:ElementRef
  constructor(@Inject(PLATFORM_ID) private plataformId: object,
  private _srvCurso:EjemploService){}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.plataformId)) {
      this.inicializarModal();
    }
    if (this.modal) {
      console.log('Modal inicializado:', this.modal);
    }
  }

  inicializarModal() {
    import('bootstrap').then((boostrap) => {
      this.bootstrapmodal = new boostrap.Modal(this.modal.nativeElement);
    });
  }

  open(cursos: Curso) {
    this.curso = cursos;
    if (isPlatformBrowser(this.plataformId)) {
      if (this.bootstrapmodal) {
        this.bootstrapmodal.show();
      } else {
        this.inicializarModal();
        setTimeout(() => {
          this.bootstrapmodal.show();
        }, 0);
      }
    }
  }

  closeModal() {
    if (isPlatformBrowser(this.plataformId)) {
      if (this.bootstrapmodal) {
        this.bootstrapmodal.hide();
      } else {
        console.error('El modal no está inicializado.');
      }
    }
  }

  editarCurso(
    nombre: string,
    duracionHoras: string,
    nivel: string,
    precio: string,
    id: string
  ) {
    // Validar campos vacíos
    if (
      !nombre.trim() ||
      !duracionHoras.trim() ||
      !nivel.trim() ||
      !precio.trim()
    ) {
      console.error('Todos los campos son obligatorios');
      alert('Por favor, complete todos los campos antes de guardar los cambios.');
      return;
    }
  
    // Validar que los campos numéricos sean números válidos
    if (isNaN(Number(duracionHoras)) || isNaN(Number(precio))) {
      console.error('Duración y Precio deben ser números válidos');
      alert('Por favor, ingrese valores numéricos en los campos correspondientes.');
      return;
    }
  
    // Crear el objeto para actualizar
    const newCurso = {
      _id: id,
      nombre: nombre.trim(),
      duracionHoras: Number(duracionHoras),
      nivel: nivel.trim(),
      precio: Number(precio),
    };
  
    // Llamar al servicio para actualizar el curso
    this._srvCurso.putCurso(id, newCurso).subscribe({
      next: (res) => {
        console.log('Curso editado con éxito');
        this.closeModal(); // Cerrar el modal
        window.location.reload(); // Recargar la página para reflejar los cambios
      },
      error: (error) => {
        console.error(`Error al intentar actualizar el curso: ${error.message}`);
        console.log('Respuesta del servidor:', error);
      }
    });
  }
}
