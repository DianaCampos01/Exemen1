import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { EjemploService } from '../services/ejemplo.service';
import { isPlatformBrowser } from '@angular/common';
import { Tcomputadora } from '../interfaces/ejemplo';

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

  Agregar(nombre:String, apellido:String, 
    edad:String, tmemoria:String, 
    cmemo:String, procesador:String, tarjetaG:String, numero:String ){
    const newEjemplo:Tcomputadora = {
      marca: String(nombre),
      tRam: String(apellido),
      ramC: Number(edad),
      tMemoria: String(tmemoria),
      cMemoria: Number(cmemo),
      procesador: String(procesador),
      tarjetaDrafica: String(tarjetaG),
      precio: Number(numero)
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
