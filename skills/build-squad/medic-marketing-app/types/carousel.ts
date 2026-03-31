export type CarouselSlideLayout =
  | 'capa'
  | 'timg'
  | 'tonly'
  | 'stat'
  | 'turning'
  | 'light'
  | 'final';

export interface CarouselSlide {
  numero: number;
  layout: CarouselSlideLayout;
  eyebrow?: string;
  headline?: string;
  mini_titulo?: string;
  texto?: string;
  zone_label?: string;
  big_text?: string;
  stat_number?: string;
  stat_unit?: string;
  e_dai?: string;
  turn_text?: string;
  opinion?: string;
  conclusion?: string;
  pergunta_comentario?: string;
  imagem?: string;
}

export interface CarouselRoteiro {
  slides: CarouselSlide[];
}

export interface BrandIdentity {
  brandName: string;
  handle: string;
  corFundo: string;
  corDestaque: string;
  corTexto: string;
  fonteDisplay: string;
  fonteCorpo: string;
}

export const DEFAULT_BRAND: BrandIdentity = {
  brandName: 'DR. NOME',
  handle: '@dr.nome',
  corFundo: '#0a1628',
  corDestaque: '#4ecdc4',
  corTexto: '#f0f0f0',
  fonteDisplay: 'Bebas Neue',
  fonteCorpo: 'Inter',
};
