import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Unidade } from '../../shared/models/unidade.model';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UnidadeService {
  private readonly http = inject(HttpClient);

  listar(): Observable<Unidade[]> {
    return this.http.get<Unidade[]>(`${environment.apiUrl}/unidades`);
  }

  buscarPorId(id: number): Observable<Unidade> {
    return this.http.get<Unidade>(`${environment.apiUrl}/unidades/${id}`);
  }

  criar(payload: Omit<Unidade, 'id'>): Observable<Unidade> {
    return this.http.post<Unidade>(`${environment.apiUrl}/unidades`, payload);
  }

  atualizar(id: number, payload: Omit<Unidade, 'id'>): Observable<Unidade> {
    return this.http.put<Unidade>(`${environment.apiUrl}/unidades/${id}`, payload);
  }

  alterarStatus(id: number, ativo: boolean): Observable<void> {
    return this.http.patch<void>(`${environment.apiUrl}/unidades/${id}/status`, null, {
      params: { ativo }
    });
  }
}