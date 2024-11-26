import { Component, ElementRef, Inject, Input, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { computadorR, Tcomputadora } from '../interfaces/ejemplo';
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
  @Input() ejemplo: Tcomputadora = {
    marca: '',
    tRam: '',
    ramC: 0,
    tMemoria: '',
    cMemoria: 0,
    procesador: '',
    tarjetaDrafica: '',
    precio: 0
  }

  ngOnInit(): void {
      console.log(this.ejemplo._id)
  }

  private bootstrapmodal:any
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
      this.bootstrapmodal = new boostrap.Modal(this.modal.nativeElement);
    });
  }

  open(ejemplo: Tcomputadora) {
    this.ejemplo = ejemplo;
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

  editarEjemplo(nombre:String, apellido:String, 
    edad:String, tmemoria:String, 
    cmemo:String, procesador:String, tarjetaG:String, numero:String, id:String ){
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

    console.log(this.ejemplo._id)
    this._srvEjemplo.putEjemplo(id, newEjemplo).subscribe({
      next:(respuest) => {
        console.log('Editado con exito')
        this.closeModal()
        window.location.reload();
      },

      error: (error) => {
        console.log(`Error al intentar actualizar: ${error.message}`);
        console.log('Respuesta del servidor:', error);
      }
    })
  }
}
