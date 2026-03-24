import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';

export interface DashboardResponse {
  totalAlunosAtivos: number;
  totalAlunosInativos: number;
  totalTurmasAtivas: number;
  frequenciasHoje: number;
  pagamentosPendentes: number;
  pagamentosAtrasados: number;
  pagamentosPagos: number;
  valorRecebidoNoMes: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly http = inject(HttpClient);

  buscarIndicadores(): Observable<DashboardResponse> {
    return this.http.get<DashboardResponse>(
      `${environment.apiUrl}/dashboard`
    );
  }
}