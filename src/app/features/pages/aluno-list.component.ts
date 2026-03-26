import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlunoService } from '../services/aluno.service';
import { Aluno } from '../models/aluno.model';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-aluno-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule
  ],
  templateUrl: './aluno-list.component.html',
  styleUrl: './aluno-list.component.scss'
})
export class AlunoListComponent implements OnInit {
  private readonly alunoService = inject(AlunoService);
  private readonly router = inject(Router);

  alunos: Aluno[] = [];
  nomeBusca = '';

  ngOnInit(): void {
    this.carregarAlunos();
  }

  carregarAlunos(): void {
    this.alunoService.listar().subscribe({
      next: (response) => this.alunos = response
    });
  }

  buscar(): void {
    if (!this.nomeBusca.trim()) {
      this.carregarAlunos();
      return;
    }

    this.alunoService.buscarPorNome(this.nomeBusca).subscribe({
      next: (response) => this.alunos = response
    });
  }

  novoAluno(): void {
    this.router.navigate(['/alunos/novo']);
  }

  editar(id?: number): void {
    if (!id) return;
    this.router.navigate([`/alunos/${id}/editar`]);
  }
}