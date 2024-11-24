import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EjemploAll } from '../interfaces/ejemplo';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EjemploService {
  urlEjemplo:String = 'http://localhost:3000/api/v1/ejemplo'
  constructor(
    private http:HttpClient
  ) { }

  getAllEjemplo(): Observable<EjemploAll>{
    return this.http.get<EjemploAll>(`${this.urlEjemplo}`)
  }

  deleteEjemplo(id:String){
    return this.http.delete(`${this.urlEjemplo}/${id}`)
  }
}
