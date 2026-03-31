'use client';

import { CarouselSlide, BrandIdentity } from '@/types/carousel';
import {
  CoverSlide,
  TextImageSlide,
  TextOnlySlide,
  StatSlide,
  TurningSlide,
  LightSlide,
  FinalSlide,
} from './SlideLayouts';

interface SlideRendererProps {
  slide: CarouselSlide;
  total: number;
  brand: BrandIdentity;
  fotos: string[];
}

function resolveImage(imagem: string | undefined, fotos: string[]): string | undefined {
  if (!imagem) return undefined;
  const match = imagem.match(/^foto_(\d+)$/);
  if (match) {
    const idx = parseInt(match[1], 10);
    return fotos[idx] || undefined;
  }
  return imagem;
}

export default function SlideRenderer({ slide, total, brand, fotos }: SlideRendererProps) {
  const imageSrc = resolveImage(slide.imagem, fotos);
  const props = { slide, total, brand, imageSrc };

  switch (slide.layout) {
    case 'capa':
      return <CoverSlide {...props} />;
    case 'timg':
      return <TextImageSlide {...props} />;
    case 'tonly':
      return <TextOnlySlide {...props} />;
    case 'stat':
      return <StatSlide {...props} />;
    case 'turning':
      return <TurningSlide {...props} />;
    case 'light':
      return <LightSlide {...props} />;
    case 'final':
      return <FinalSlide {...props} />;
    default:
      return <TextOnlySlide {...props} />;
  }
}
