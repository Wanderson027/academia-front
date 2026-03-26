import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunoService } from '../services/aluno.service';
import { UnidadeService } from '../../../app/core/services/unidade.service';
import { TurmaService } from '../../../app/core/services/turma.service';
import { Unidade } from '../../../app/shared/models/unidade.model';
import { Turma } from '../../../app/shared/models/turma.model';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-aluno-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './aluno-form.component.html',
  styleUrl: './aluno-form.component.scss'
})
export class AlunoFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly alunoService = inject(AlunoService);
  private readonly unidadeService = inject(UnidadeService);
  private readonly turmaService = inject(TurmaService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  unidades: Unidade[] = [];
  turmas: Turma[] = [];
  alunoId?: number;
  editando = false;

  form = this.fb.group({
    matricula: ['', Validators.required],
    nome: ['', Validators.required],
    cpf: [''],
    telefone: [''],
    dataNascimento: [''],
    sexo: [''],
    endereco: [''],
    status: ['ATIVO', Validators.required],
    dataCadastro: ['', Validators.required],
    unidadeId: [null as number | null, Validators.required],
    turmaId: [null as number | null, Validators.required]
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.alunoId = id ? Number(id) : undefined;
    this.editando = !!this.alunoId;

    forkJoin({
      unidades: this.unidadeService.listar(),
      turmas: this.turmaService.listar()
    }).subscribe({
      next: ({ unidades, turmas }) => {
        this.unidades = unidades;
        this.turmas = turmas;

        if (this.editando && this.alunoId) {
          this.carregarAluno(this.alunoId);
        }
      }
    });
  }

  carregarAluno(id: number): void {
    this.alunoService.buscarPorId(id).subscribe({
      next: (aluno) => {
        this.form.patchValue({
          matricula: aluno.matricula,
          nome: aluno.nome,
          cpf: aluno.cpf ?? '',
          telefone: aluno.telefone ?? '',
          dataNascimento: aluno.dataNascimento ?? '',
          sexo: aluno.sexo ?? '',
          endereco: aluno.endereco ?? '',
          status: aluno.status,
          dataCadastro: aluno.dataCadastro,
          unidadeId: aluno.unidadeId,
          turmaId: aluno.turmaId ?? null
        });
      }
    });
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.getRawValue();

    if (this.editando && this.alunoId) {
      this.alunoService.atualizar(this.alunoId, payload as any).subscribe({
        next: () => this.router.navigate(['/alunos'])
      });
      return;
    }

    this.alunoService.criar(payload as any).subscribe({
      next: () => this.router.navigate(['/alunos'])
    });
  }
}