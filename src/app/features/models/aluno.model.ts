export interface Aluno {
  id?: number;
  matricula: string;
  nome: string;
  cpf?: string;
  telefone?: string;
  dataNascimento?: string;
  sexo?: string;
  endereco?: string;
  status: string;
  dataCadastro: string;
  unidadeId: number;
  unidadeNome?: string;
  turmaId?: number;
  turmaNome?: string;
}