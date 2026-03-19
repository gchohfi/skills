'use client';

import { useState } from 'react';
import StreamingText from '@/components/ui/StreamingText';
import Button from '@/components/ui/Button';

interface DocumentViewerProps {
  text: string;
  isLoading: boolean;
  templateNome: string;
}

export default function DocumentViewer({ text, isLoading, templateNome }: DocumentViewerProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-lg border border-gray-100 bg-white shadow-md">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
        <h2 className="text-base font-semibold text-gray-800">
          📄 {templateNome}
        </h2>
        {text && !isLoading && (
          <Button variant="secondary" size="sm" onClick={handleCopy}>
            {copied ? '✓ Copiado!' : 'Copiar Documento'}
          </Button>
        )}
      </div>

      <div className="px-6 py-4">
        <div className="mb-4 flex items-start gap-2 rounded-lg border border-yellow-300 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
          <span className="shrink-0">⚠️</span>
          <span>
            <strong>ATENÇÃO:</strong> Este documento foi gerado por IA e deve ser revisado por
            um advogado antes de ser utilizado. Recomendamos o registro em cartório de notas.
          </span>
        </div>

        {(text || isLoading) ? (
          <div className="min-h-[200px] rounded-lg bg-gray-50 p-4 font-mono text-sm text-gray-800">
            <StreamingText text={text} isLoading={isLoading} />
          </div>
        ) : (
          <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 text-sm text-gray-400">
            Selecione um modelo de documento e clique em "Preencher com IA" para gerar.
          </div>
        )}
      </div>
    </div>
  );
}
