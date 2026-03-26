import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environments';
import { Turma } from '../../shared/models/turma.model';

@Injectable({
  providedIn: 'root'
})
export class TurmaService {
  private readonly http = inject(HttpClient);

  listar(): Observable<Turma[]> {
    return this.http.get<Turma[]>(`${environment.apiUrl}/turmas`);
  }
}