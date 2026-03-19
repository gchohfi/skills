'use client';

import { useState, useCallback } from 'react';

export function useStreamingResponse() {
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const trigger = useCallback(async (url: string, body: any) => {
    setIsLoading(true);
    setResponse('');
    setError(null);

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error(`Erro na requisição: ${res.status} ${res.statusText}`);
      }

      if (!res.body) {
        throw new Error('Resposta sem corpo de stream');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const token = line.slice('data: '.length);
            setResponse((prev) => prev + token);
          }
        }
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Ocorreu um erro desconhecido';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { response, isLoading, error, trigger };
}
