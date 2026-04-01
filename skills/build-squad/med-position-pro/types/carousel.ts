export type CarouselSlideLayout = 'capa' | 'timg' | 'tonly' | 'stat' | 'turning' | 'light' | 'final';

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
}

export interface CarouselRoteiro { slides: CarouselSlide[]; }

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
  brandName: 'DRA. NOME',
  handle: '@dra.nome',
  corFundo: '#0f172a',
  corDestaque: '#e2c799',
  corTexto: '#f8fafc',
  fonteDisplay: 'Bebas Neue',
  fonteCorpo: 'Inter',
};
