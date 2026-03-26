export interface Turma {
  id: number;
  nome: string;
  tipoDias: string;
  horario: string;
  capacidade?: number;
  ativo: boolean;
  unidadeId: number;
  unidadeNome?: string;
}