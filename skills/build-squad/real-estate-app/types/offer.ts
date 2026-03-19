export interface Offer {
  id: string;
  valorOferta: number;
  formaPagamento: 'avista' | 'financiamento' | 'fgts' | 'misto';
  condicoes: string[];
  prazoEscritura: string;
  observacoes: string;
  status: 'recebida' | 'analisando' | 'aceita' | 'recusada' | 'contraproposta';
  dataCriacao: string;
}
