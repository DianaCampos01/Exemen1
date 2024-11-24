import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ejemplo, EjemploAll } from '../interfaces/ejemplo';
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

  postEjemplo(nuevoEjemplo:Ejemplo):Observable<Ejemplo>{
    return this.http.post<Ejemplo>(`${this.urlEjemplo}`, nuevoEjemplo)
  }

  putEjemplo(id:String, ejemplo:Ejemplo): Observable<Ejemplo>{
    return this.http.put<Ejemplo>(`${this.urlEjemplo}/${id}`, ejemplo)
  }

  deleteEjemplo(id:String){
    return this.http.delete(`${this.urlEjemplo}/${id}`)
  }
}
