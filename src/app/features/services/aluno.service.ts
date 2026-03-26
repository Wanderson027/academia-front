import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { Aluno } from '../models/aluno.model';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private readonly http = inject(HttpClient);

  listar(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(`${environment.apiUrl}/alunos`);
  }

  buscarPorId(id: number): Observable<Aluno> {
    return this.http.get<Aluno>(`${environment.apiUrl}/alunos/${id}`);
  }

  buscarPorNome(nome: string): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(`${environment.apiUrl}/alunos/buscar`, {
      params: { nome }
    });
  }

  criar(payload: Aluno): Observable<Aluno> {
    return this.http.post<Aluno>(`${environment.apiUrl}/alunos`, payload);
  }

  atualizar(id: number, payload: Aluno): Observable<Aluno> {
    return this.http.put<Aluno>(`${environment.apiUrl}/alunos/${id}`, payload);
  }
}