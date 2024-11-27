import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { EjemploService } from '../services/ejemplo.service';
import { isPlatformBrowser } from '@angular/common';
import { Curso } from '../interfaces/cursos';

@Component({
  selector: 'app-modal-agregar',
  standalone: true,
  imports: [],
  templateUrl: './modal-agregar.component.html',
  styleUrl: './modal-agregar.component.css'
})
export class ModalAgregarComponent {
  private bootstrapModal: any
  @ViewChild('modalElement') public modal!:ElementRef
  constructor(@Inject(PLATFORM_ID) private plataformId: object,
  private _srvEjemplo:EjemploService){}

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
      this.bootstrapModal = new boostrap.Modal(this.modal.nativeElement);
    });
  }

  open(){
    if (isPlatformBrowser(this.plataformId)) {
      if (this.bootstrapModal) {
        this.bootstrapModal.show();
      } else {
        this.inicializarModal();
        setTimeout(() => {
          this.bootstrapModal.show();
        }, 0);
      }
    }
  }

  closeModal() {
    if (isPlatformBrowser(this.plataformId)) {
      if (this.bootstrapModal) {
        this.bootstrapModal.hide();
      } else {
        console.error('El modal no está inicializado.');
      }
    }
  }

  Agregar(nombre: string, duracionHoras: string, nivel: string, precio: string) {
    if (!nombre.trim() || !duracionHoras.trim() || !nivel.trim() || !precio.trim()) {
      console.error('Todos los campos son obligatorios');
      alert('Por favor, complete todos los campos antes de agregar el curso.');
      return;
    }
  
    if (isNaN(Number(duracionHoras)) || isNaN(Number(precio))) {
      console.error('Duración en horas y precio deben ser números válidos');
      alert('Duración en horas y precio deben ser valores numéricos.');
      return;
    }
    
    const newCurso: Curso = {
      nombre: String(nombre),
      duracionHoras: Number(duracionHoras),
      nivel: String(nivel),
      precio: Number(precio),
    };
    this._srvEjemplo.postCurso(newCurso).subscribe({
      next: (res) => {
        console.log('Curso agregado exitosamente');
        this.closeModal(); 
        window.location.reload();
      },
      error: (error) => {
        console.log(`Error al agregar el curso: ${error}`);
      },
    });
  }
  
}
