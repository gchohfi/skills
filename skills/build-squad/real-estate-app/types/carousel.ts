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
  // capa
  eyebrow?: string;
  headline?: string;
  // timg, tonly, light
  mini_titulo?: string;
  texto?: string;
  // tonly
  zone_label?: string;
  big_text?: string;
  // stat
  stat_number?: string;
  stat_unit?: string;
  e_dai?: string;
  // turning
  turn_text?: string;
  opinion?: string;
  // final
  conclusion?: string;
  pergunta_comentario?: string;
  // imagem (indice da foto do imovel, ou URL)
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
  brandName: 'IMÓVEL IA',
  handle: '@imovel.ia',
  corFundo: '#111111',
  corDestaque: '#ffffff',
  corTexto: '#f0f0f0',
  fonteDisplay: 'Bebas Neue',
  fonteCorpo: 'Inter',
};
