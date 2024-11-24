import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { EjemploService } from '../services/ejemplo.service';
import { isPlatformBrowser } from '@angular/common';
import { Ejemplo } from '../interfaces/ejemplo';

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

  Agregar(nombre:String, apellido:String, edad:String, contacto:String){
    const newEjemplo:Ejemplo = {
      name: String(nombre),
      apellido: String(apellido),
      edad: Number(edad),
      contacto:[String(contacto)]
    }
    
    this._srvEjemplo.postEjemplo(newEjemplo).subscribe({
      next: (res) => {
        console.log('elemento agregado')
        this.closeModal()
        window.location.reload();
      },
      error: (error) => {
        console.log(`error al agregar un nuevo elemento ${error}`)
      }
    })
  }
}
