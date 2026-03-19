export interface Showing {
  id: string;
  nomeComprador: string;
  telefone: string;
  email: string;
  data: string;
  horario: string;
  notas: string;
  status: 'confirmado' | 'pendente' | 'cancelado' | 'realizado';
}
