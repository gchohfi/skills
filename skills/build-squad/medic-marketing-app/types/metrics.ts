export interface PostMetrics {
  id: string;
  data: string;
  tipo: 'carrossel' | 'reels' | 'stories' | 'post_unico';
  tema: string;
  alcance: number;
  impressoes: number;
  curtidas: number;
  comentarios: number;
  salvamentos: number;
  compartilhamentos: number;
  cliquesLink: number;
  novosSeguidos: number;
}

export interface MetricsSummary {
  totalPosts: number;
  mediaAlcance: number;
  mediaCurtidas: number;
  mediaSalvamentos: number;
  taxaEngajamento: number;
  melhorPost: PostMetrics | null;
  piorPost: PostMetrics | null;
  crescimentoSeguidores: number;
}
