'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import StreamingText from '@/components/ui/StreamingText';

interface ListingPreviewProps {
  text: string;
  isLoading: boolean;
}

export default function ListingPreview({ text, isLoading }: ListingPreviewProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const isEmpty = !text && !isLoading;

  return (
    <Card className="border-[#0e6b6e]/20 bg-gradient-to-br from-[#f0fafa] to-white">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0e6b6e]/10 text-xl">
            📋
          </span>
          <div>
            <h2 className="text-base font-semibold text-gray-900">Anúncio Gerado</h2>
            <p className="text-xs text-gray-500">Pronto para publicar</p>
          </div>
        </div>

        {text && !isLoading && (
          <Button variant="secondary" size="sm" onClick={handleCopy}>
            {copied ? '✅ Copiado!' : 'Copiar'}
          </Button>
        )}
      </div>

      <div className="min-h-[200px] rounded-lg border border-[#0e6b6e]/10 bg-white p-4 text-sm leading-relaxed text-gray-700">
        {isEmpty ? (
          <p className="text-gray-400 italic">
            Clique em &quot;Gerar Anúncio&quot; para criar um anúncio profissional para seu imóvel.
          </p>
        ) : (
          <StreamingText text={text} isLoading={isLoading} />
        )}
      </div>
    </Card>
  );
}
