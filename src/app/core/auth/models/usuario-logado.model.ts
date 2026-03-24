export interface UsuarioLogado {
  id: number;
  nome: string;
  email: string;
  login: string;
  perfil: string;
  ativo: boolean;
  unidadeId: number;
  unidadeNome: string;
}