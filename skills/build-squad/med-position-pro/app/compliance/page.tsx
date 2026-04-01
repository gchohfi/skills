'use client';
import { useState } from 'react';
import { useDoctor } from '@/context/DoctorContext';
import { useStreamingResponse } from '@/hooks/useStreamingResponse';
import ModuleHeader from '@/components/layout/ModuleHeader';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import StreamingText from '@/components/ui/StreamingText';

export default function CompliancePage() {
  const { doctor } = useDoctor();
  const { response, isLoading, error, trigger } = useStreamingResponse();
  const [conteudo, setConteudo] = useState('');

  function run() {
    if (!doctor || !conteudo.trim()) return;
    trigger('/api/compliance', { doctor, conteudo });
  }

  return (
    <div className="space-y-6">
      <ModuleHeader title="Compliance CFM" description="Revise qualquer conteudo para conformidade com a Resolucao CFM 2.336/2023." icon="🛡️" />
      {!doctor && <Card><p className="text-sm text-amber-600">Configure o perfil da medica primeiro.</p></Card>}
      {doctor && (
        <>
          <Card>
            <label className="block text-xs font-medium text-gray-600 mb-1">Cole o conteudo para revisao</label>
            <textarea className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#e2c799] focus:outline-none h-40" value={conteudo} onChange={e => setConteudo(e.target.value)} placeholder="Cole aqui o texto da legenda, carrossel, script de reels ou qualquer conteudo que deseja revisar..." />
            <div className="mt-3"><Button onClick={run} loading={isLoading} disabled={!conteudo.trim()}>Revisar Conformidade</Button></div>
          </Card>
          {error && <Card><p className="text-sm text-red-600">{error}</p></Card>}
          {response && <Card><div className="prose prose-sm max-w-none"><StreamingText text={response} isLoading={isLoading} /></div></Card>}
        </>
      )}
    </div>
  );
}
