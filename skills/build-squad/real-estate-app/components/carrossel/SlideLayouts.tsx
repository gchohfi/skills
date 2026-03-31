'use client';

import { CarouselSlide, BrandIdentity } from '@/types/carousel';

function highlightText(text: string): string {
  return (text || '').replace(/\*(.+?)\*/g, '<em>$1</em>');
}

function Dots({ current, total, brand }: { current: number; total: number; brand: BrandIdentity }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      {Array.from({ length: total }, (_, i) => {
        const isActive = i + 1 === current;
        return (
          <div
            key={i}
            style={{
              width: isActive ? 28 : 8,
              height: 8,
              borderRadius: isActive ? 4 : '50%',
              background: isActive ? brand.corDestaque : 'rgba(255,255,255,0.5)',
            }}
          />
        );
      })}
    </div>
  );
}

function Header({ brand }: { brand: BrandIdentity }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '40px 56px 0', zIndex: 10, flexShrink: 0 }}>
      <span style={{ fontFamily: `'${brand.fonteDisplay}', sans-serif`, fontSize: 28, letterSpacing: 3, color: brand.corDestaque }}>{brand.brandName}</span>
      <span style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', letterSpacing: 1 }}>{brand.handle}</span>
    </div>
  );
}

function Footer({ slide, total, brand }: { slide: CarouselSlide; total: number; brand: BrandIdentity }) {
  const num = slide.numero;
  const ftCta = num === 1 ? 'deslize \u2192' : num === total ? 'salva \uD83D\uDD16' : '';
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 56px 44px', zIndex: 10, flexShrink: 0, marginTop: 'auto' }}>
      <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', letterSpacing: 2 }}>{String(num).padStart(2, '0')}/{total}</span>
      <Dots current={num} total={total} brand={brand} />
      <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', letterSpacing: 2 }}>{ftCta}</span>
    </div>
  );
}

interface LayoutProps {
  slide: CarouselSlide;
  total: number;
  brand: BrandIdentity;
  imageSrc?: string;
}

export function CoverSlide({ slide, total, brand, imageSrc }: LayoutProps) {
  return (
    <div style={{ width: 1080, height: 1350, position: 'relative', overflow: 'hidden', background: brand.corFundo }}>
      {imageSrc ? (
        <img src={imageSrc} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
      ) : (
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${brand.corFundo}, ${brand.corFundo}dd)` }} />
      )}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.1) 100%)' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
        <Header brand={brand} />
      </div>
      <div style={{ position: 'absolute', bottom: 100, left: 0, right: 0, padding: '0 56px', zIndex: 10 }}>
        <p style={{ fontSize: 18, letterSpacing: 4, color: brand.corDestaque, textTransform: 'uppercase', marginBottom: 24 }}>{slide.eyebrow}</p>
        <h1
          style={{ fontFamily: `'${brand.fonteDisplay}', sans-serif`, fontSize: 120, lineHeight: 0.92, color: brand.corTexto, textTransform: 'uppercase', wordBreak: 'break-word' }}
          dangerouslySetInnerHTML={{ __html: highlightText(slide.headline || '') }}
        />
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10 }}>
        <Footer slide={slide} total={total} brand={brand} />
      </div>
    </div>
  );
}

export function TextImageSlide({ slide, total, brand, imageSrc }: LayoutProps) {
  return (
    <div style={{ width: 1080, height: 1350, display: 'flex', flexDirection: 'column', background: brand.corFundo, overflow: 'hidden' }}>
      <Header brand={brand} />
      <div style={{ width: '100%', height: 520, flexShrink: 0, overflow: 'hidden', background: '#000' }}>
        {imageSrc ? (
          <img src={imageSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: '#222' }} />
        )}
      </div>
      <div style={{ flex: 1, padding: '48px 56px 0', display: 'flex', flexDirection: 'column', gap: 28 }}>
        <h2
          style={{ fontFamily: `'${brand.fonteDisplay}', sans-serif`, fontSize: 80, lineHeight: 0.97, color: brand.corTexto }}
          dangerouslySetInnerHTML={{ __html: highlightText(slide.mini_titulo || '') }}
        />
        <p
          style={{ fontSize: 40, lineHeight: 1.55, color: brand.corTexto }}
          dangerouslySetInnerHTML={{ __html: highlightText(slide.texto || '') }}
        />
      </div>
      <Footer slide={slide} total={total} brand={brand} />
    </div>
  );
}

export function TextOnlySlide({ slide, total, brand }: LayoutProps) {
  return (
    <div style={{ width: 1080, height: 1350, display: 'flex', flexDirection: 'column', background: brand.corFundo, overflow: 'hidden' }}>
      <Header brand={brand} />
      <div style={{ flex: 1, padding: '64px 56px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 32 }}>
        <span style={{ fontSize: 18, letterSpacing: 5, color: brand.corDestaque, textTransform: 'uppercase' }}>{slide.zone_label}</span>
        <div style={{ width: 64, height: 4, background: brand.corDestaque, borderRadius: 2 }} />
        <h2
          style={{ fontFamily: `'${brand.fonteDisplay}', sans-serif`, fontSize: 88, lineHeight: 0.95, color: brand.corTexto }}
          dangerouslySetInnerHTML={{ __html: highlightText(slide.big_text || '') }}
        />
        <p
          style={{ fontSize: 40, lineHeight: 1.55, color: brand.corTexto }}
          dangerouslySetInnerHTML={{ __html: highlightText(slide.texto || '') }}
        />
      </div>
      <Footer slide={slide} total={total} brand={brand} />
    </div>
  );
}

export function StatSlide({ slide, total, brand }: LayoutProps) {
  return (
    <div style={{ width: 1080, height: 1350, display: 'flex', flexDirection: 'column', background: brand.corFundo, overflow: 'hidden' }}>
      <Header brand={brand} />
      <div style={{ flex: 1, padding: '64px 56px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24 }}>
        <p style={{ fontFamily: `'${brand.fonteDisplay}', sans-serif`, fontSize: 220, lineHeight: 0.8, color: brand.corDestaque, letterSpacing: -4 }}>{slide.stat_number}</p>
        <p style={{ fontSize: 22, color: 'rgba(255,255,255,0.5)', fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase' }}>{slide.stat_unit}</p>
        <p
          style={{ fontSize: 40, lineHeight: 1.5, color: brand.corTexto }}
          dangerouslySetInnerHTML={{ __html: highlightText(slide.texto || '') }}
        />
        <p
          style={{ fontSize: 32, color: 'rgba(255,255,255,0.5)', borderLeft: `4px solid ${brand.corDestaque}`, paddingLeft: 28, lineHeight: 1.5 }}
          dangerouslySetInnerHTML={{ __html: highlightText(slide.e_dai || '') }}
        />
      </div>
      <Footer slide={slide} total={total} brand={brand} />
    </div>
  );
}

export function TurningSlide({ slide, total, brand }: LayoutProps) {
  return (
    <div style={{ width: 1080, height: 1350, display: 'flex', flexDirection: 'column', background: brand.corFundo, overflow: 'hidden' }}>
      <Header brand={brand} />
      <div style={{ width: '100%', height: 10, background: brand.corDestaque, flexShrink: 0 }} />
      <div style={{ flex: 1, padding: '64px 56px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 36 }}>
        <span style={{ fontSize: 18, letterSpacing: 5, color: brand.corDestaque, textTransform: 'uppercase' }}>minha leitura</span>
        <h2
          style={{ fontFamily: `'${brand.fonteDisplay}', sans-serif`, fontSize: 96, lineHeight: 0.93, color: brand.corTexto }}
          dangerouslySetInnerHTML={{ __html: highlightText(slide.turn_text || '') }}
        />
        <p style={{ fontSize: 44, lineHeight: 1.5, color: brand.corTexto, fontStyle: 'italic', opacity: 0.85 }}>
          &ldquo;{highlightText(slide.opinion || '')}&rdquo;
        </p>
      </div>
      <Footer slide={slide} total={total} brand={brand} />
    </div>
  );
}

export function LightSlide({ slide, total, brand, imageSrc }: LayoutProps) {
  const num = slide.numero;
  return (
    <div style={{ width: 1080, height: 1350, display: 'flex', flexDirection: 'column', background: brand.corTexto, overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '40px 56px 0', zIndex: 10, flexShrink: 0 }}>
        <span style={{ fontFamily: `'${brand.fonteDisplay}', sans-serif`, fontSize: 28, letterSpacing: 3, color: brand.corFundo }}>{brand.brandName}</span>
        <span style={{ fontSize: 18, color: 'rgba(0,0,0,0.4)', letterSpacing: 1 }}>{brand.handle}</span>
      </div>
      <div style={{ flex: 1, padding: '56px 56px 0', display: 'flex', flexDirection: 'column', gap: 28 }}>
        <h2
          style={{ fontFamily: `'${brand.fonteDisplay}', sans-serif`, fontSize: 80, lineHeight: 0.97, color: brand.corFundo }}
          dangerouslySetInnerHTML={{ __html: highlightText(slide.mini_titulo || '') }}
        />
        <p
          style={{ fontSize: 40, lineHeight: 1.55, color: brand.corFundo }}
          dangerouslySetInnerHTML={{ __html: highlightText(slide.texto || '') }}
        />
        {imageSrc && (
          <div style={{ flex: 1, overflow: 'hidden', borderRadius: 6, minHeight: 300 }}>
            <img src={imageSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 56px 44px', zIndex: 10, flexShrink: 0, marginTop: 'auto' }}>
        <span style={{ fontSize: 16, color: 'rgba(0,0,0,0.4)', letterSpacing: 2 }}>{String(num).padStart(2, '0')}/{total}</span>
        <Dots current={num} total={total} brand={brand} />
        <span style={{ fontSize: 16, color: 'rgba(0,0,0,0.4)', letterSpacing: 2 }} />
      </div>
    </div>
  );
}

export function FinalSlide({ slide, total, brand }: LayoutProps) {
  return (
    <div style={{ width: 1080, height: 1350, display: 'flex', flexDirection: 'column', background: brand.corFundo, overflow: 'hidden' }}>
      <Header brand={brand} />
      <div style={{ flex: 1, padding: '64px 56px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 40 }}>
        <h2
          style={{ fontFamily: `'${brand.fonteDisplay}', sans-serif`, fontSize: 96, lineHeight: 0.93, color: brand.corTexto }}
          dangerouslySetInnerHTML={{ __html: highlightText(slide.conclusion || '') }}
        />
        <div style={{ background: brand.corDestaque, padding: '44px 48px', borderRadius: 6 }}>
          <p style={{ fontSize: 34, fontWeight: 700, color: brand.corFundo, lineHeight: 1.4 }}>Siga para mais conteudo como esse.</p>
        </div>
        <p style={{ fontSize: 32, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: 36 }}>
          {slide.pergunta_comentario}
        </p>
      </div>
      <Footer slide={slide} total={total} brand={brand} />
    </div>
  );
}
