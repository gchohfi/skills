'use client';
import { useState, useCallback } from 'react';

export function useStreamingResponse() {
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const trigger = useCallback(async (url: string, body: Record<string, unknown>) => {
    setIsLoading(true); setError(null); setResponse('');
    try {
      const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (!res.ok) { const d = await res.json().catch(() => ({})); throw new Error(d.error || `Erro ${res.status}`); }
      const reader = res.body?.getReader();
      if (!reader) throw new Error('Stream indisponivel');
      const decoder = new TextDecoder();
      let acc = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        for (const line of decoder.decode(value, { stream: true }).split('\n')) {
          if (line.startsWith('data: ')) { acc += line.slice(6); setResponse(acc); }
        }
      }
    } catch (err) { setError(err instanceof Error ? err.message : 'Erro desconhecido'); }
    finally { setIsLoading(false); }
  }, []);

  return { response, isLoading, error, trigger };
}
