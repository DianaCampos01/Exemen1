import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { computadorR, Tcomputadora } from '../interfaces/ejemplo';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EjemploService {
  urlEjemplo:String = 'http://localhost:3000/api/v1/TComputador'
  constructor(
    private http:HttpClient
  ) { }

  getAllEjemplo(): Observable<computadorR>{
    return this.http.get<computadorR>(`${this.urlEjemplo}`)
  }

  postEjemplo(nuevoEjemplo:Tcomputadora):Observable<Tcomputadora>{
    return this.http.post<Tcomputadora>(`${this.urlEjemplo}`, nuevoEjemplo)
  }

  putEjemplo(id:String, ejemplo:Tcomputadora): Observable<Tcomputadora>{
    return this.http.put<Tcomputadora>(`${this.urlEjemplo}/${id}`, ejemplo)
  }

  deleteEjemplo(id:String){
    return this.http.delete(`${this.urlEjemplo}/${id}`)
  }
}
