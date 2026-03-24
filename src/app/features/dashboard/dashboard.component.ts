import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardResponse, DashboardService } from './dashboard.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private readonly dashboardService = inject(DashboardService);

  indicadores?: DashboardResponse;

  ngOnInit(): void {
    this.dashboardService.buscarIndicadores().subscribe({
      next: response => {
        this.indicadores = response;
      }
    });
  }
}