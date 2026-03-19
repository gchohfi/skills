'use client';

import { useState } from 'react';
import { useProperty } from '@/hooks/useProperty';
import { useStreamingResponse } from '@/hooks/useStreamingResponse';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import StreamingText from '@/components/ui/StreamingText';

const PLATFORMS = [
  { value: 'Instagram', label: 'Instagram', icone: '📸' },
  { value: 'Facebook', label: 'Facebook', icone: '👥' },
  { value: 'WhatsApp', label: 'WhatsApp', icone: '💬' },
  { value: 'Twitter', label: 'Twitter', icone: '🐦' },
];

export default function SocialPostPanel() {
  const { property } = useProperty();
  const { response, isLoading, error, trigger } = useStreamingResponse();
  const [platform, setPlatform] = useState('Instagram');
  const [copied, setCopied] = useState(false);

  async function handleGerar() {
    if (!property) return;
    await trigger('/api/marketing/social', { property, platform });
  }

  async function handleCopy() {
    if (!response) return;
    await navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {PLATFORMS.map((p) => (
          <button
            key={p.value}
            type="button"
            onClick={() => setPlatform(p.value)}
            className={[
              'inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors',
              platform === p.value
                ? 'border-[#0e6b6e] bg-[#0e6b6e] text-white'
                : 'border-gray-200 bg-white text-gray-600 hover:border-[#0e6b6e]/50 hover:text-[#0e6b6e]',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <span>{p.icone}</span>
            {p.label}
          </button>
        ))}
      </div>

      <Button onClick={handleGerar} loading={isLoading} disabled={!property}>
        {isLoading ? 'Gerando post...' : `Gerar Post para ${platform}`}
      </Button>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          ❌ {error}
        </div>
      )}

      {(response || isLoading) && (
        <Card className="border-[#0e6b6e]/20 bg-gradient-to-br from-[#f0fafa] to-white">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">
                {PLATFORMS.find((p) => p.value === platform)?.icone}
              </span>
              <span className="text-sm font-semibold text-gray-800">
                Post para {platform}
              </span>
            </div>
            {response && !isLoading && (
              <Button variant="secondary" size="sm" onClick={handleCopy}>
                {copied ? '✅ Copiado!' : 'Copiar'}
              </Button>
            )}
          </div>
          <div className="rounded-lg border border-[#0e6b6e]/10 bg-white p-4 text-sm leading-relaxed text-gray-700">
            <StreamingText text={response} isLoading={isLoading} />
          </div>
        </Card>
      )}
    </div>
  );
}
