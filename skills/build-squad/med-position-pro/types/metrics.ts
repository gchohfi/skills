export interface PostMetrics {
  id: string;
  data: string;
  tipo: 'carrossel' | 'reels' | 'stories' | 'post_unico';
  tema: string;
  pilar: string;
  alcance: number;
  impressoes: number;
  curtidas: number;
  comentarios: number;
  salvamentos: number;
  compartilhamentos: number;
  novosSeguidos: number;
  dmsGeradas: number;
}

export interface BrandMemoryEntry {
  id: string;
  tipo: 'golden_case' | 'frase_aprovada' | 'tema_forte' | 'tema_fraco' | 'risco' | 'referencia' | 'aprendizado';
  conteudo: string;
  data: string;
  fonte: string;
}
