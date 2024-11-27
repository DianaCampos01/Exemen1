import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso, Cursos } from '../interfaces/cursos';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EjemploService {
  urlEjemplo:String = 'http://localhost:3000/api/cursos'
  constructor(
    private http:HttpClient
  ) { }

  getAllCursos(): Observable<Cursos>{
    return this.http.get<Cursos>(`${this.urlEjemplo}`)
  }

  postCurso(nuevoEjemplo:Curso):Observable<Curso>{
    return this.http.post<Curso>(`${this.urlEjemplo}`, nuevoEjemplo)
  }

  putCurso(id:String, ejemplo:Curso): Observable<Curso>{
    return this.http.put<Curso>(`${this.urlEjemplo}/${id}`, ejemplo)
  }

  deleteCurso(id:String){
    return this.http.delete(`${this.urlEjemplo}/${id}`)
  }
}
