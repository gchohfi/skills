export interface DocumentTemplate {
  id: string;
  nome: string;
  descricao: string;
  conteudo: string;
}

export interface DocumentFill {
  templateId: string;
  conteudoPreenchido: string;
}
