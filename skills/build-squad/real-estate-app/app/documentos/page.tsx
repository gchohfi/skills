'use client';

import { useState } from 'react';
import { useProperty } from '@/hooks/useProperty';
import { useStreamingResponse } from '@/hooks/useStreamingResponse';
import ModuleHeader from '@/components/layout/ModuleHeader';
import DocumentCard from '@/components/documentos/DocumentCard';
import DocumentViewer from '@/components/documentos/DocumentViewer';
import contratoCompraVenda from '@/lib/templates/contrato-compra-venda';
import declaracaoVenda from '@/lib/templates/declaracao-venda';
import checklistDocumentos from '@/lib/templates/checklist-documentos';
import { DocumentTemplate } from '@/types/document';

const templates: DocumentTemplate[] = [
  contratoCompraVenda,
  declaracaoVenda,
  checklistDocumentos,
];

export default function DocumentosPage() {
  const { property } = useProperty();
  const { response, isLoading, error, trigger } = useStreamingResponse();
  const [activeTemplate, setActiveTemplate] = useState<DocumentTemplate | null>(null);

  async function handleGenerate(template: DocumentTemplate) {
    if (!property) return;
    setActiveTemplate(template);
    await trigger('/api/documentos', { template, property });
  }

  if (!property) {
    return (
      <div>
        <ModuleHeader
          title="Assistente de Documentos"
          description="Gere documentos imobiliários preenchidos pela IA com os dados do seu imóvel."
          icon="📄"
        />
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
          ⚠️ Imóvel não configurado. Acesse{' '}
          <a href="/setup" className="font-medium underline">
            Configuração
          </a>{' '}
          para cadastrar seu imóvel primeiro.
        </div>
      </div>
    );
  }

  return (
    <div>
      <ModuleHeader
        title="Assistente de Documentos"
        description="Gere documentos imobiliários preenchidos pela IA com os dados do seu imóvel."
        icon="📄"
      />

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          ❌ {error}
        </div>
      )}

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {templates.map((template) => (
            <DocumentCard
              key={template.id}
              template={template}
              onGenerate={handleGenerate}
            />
          ))}
        </div>

        {activeTemplate && (
          <DocumentViewer
            text={response}
            isLoading={isLoading}
            templateNome={activeTemplate.nome}
          />
        )}
      </div>
    </div>
  );
}
