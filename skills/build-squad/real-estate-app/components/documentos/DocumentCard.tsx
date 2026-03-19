import { DocumentTemplate } from '@/types/document';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface DocumentCardProps {
  template: DocumentTemplate;
  onGenerate: (template: DocumentTemplate) => void;
}

export default function DocumentCard({ template, onGenerate }: DocumentCardProps) {
  return (
    <Card className="flex flex-col justify-between gap-4">
      <div>
        <h3 className="text-base font-semibold text-gray-900">{template.nome}</h3>
        <p className="mt-1 text-sm text-gray-500 leading-relaxed">{template.descricao}</p>
      </div>
      <div className="flex justify-end">
        <Button onClick={() => onGenerate(template)}>
          Preencher com IA
        </Button>
      </div>
    </Card>
  );
}
