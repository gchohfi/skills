import { DocumentTemplate } from '@/types/document';

const checklistDocumentos: DocumentTemplate = {
  id: 'checklist-documentos',
  nome: 'Checklist de Documentos para Venda',
  descricao:
    'Lista completa de documentos necessários para a venda de um imóvel no Brasil, personalizada com os dados do imóvel e orientações para cada etapa do processo.',
  conteudo: `CHECKLIST DE DOCUMENTOS PARA VENDA DE IMÓVEL

Imóvel: [ENDERECO_IMOVEL], [CIDADE_IMOVEL] — [UF_IMOVEL]
Vendedor(a): [NOME_COMPLETO_VENDEDOR]
Data de elaboração: [DATA_ELABORACAO]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DOCUMENTOS DO VENDEDOR (PESSOA FÍSICA)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[ ] RG e CPF (documento de identidade com foto)
[ ] Certidão de nascimento ou casamento atualizada (últimos 90 dias)
[ ] Comprovante de residência recente (últimos 3 meses)
[ ] Certidão negativa de débitos trabalhistas (CNDT)
[ ] Certidão negativa de débitos federais (Receita Federal)
[ ] Certidão negativa de ações cíveis e criminais (Fórum local e TJ)
[ ] Certidão negativa de protesto (Cartório de Protestos da cidade)
[ ] Certidão negativa de interdição e tutela (Fórum)

Caso o vendedor seja casado:
[ ] Documentos do cônjuge (RG, CPF, certidões negativas)
[ ] Certidão de casamento atualizada com regime de bens

Caso o vendedor seja pessoa jurídica:
[ ] Contrato social e alterações
[ ] CNPJ ativo
[ ] Certidão negativa de débitos da empresa (Federal, Estadual, Municipal)
[ ] Ata de autorização de venda assinada pelos sócios

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DOCUMENTOS DO IMÓVEL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[ ] Matrícula atualizada do imóvel (prazo máximo: 30 dias)
     Nº da matrícula: [NUMERO_MATRICULA]
     Cartório: [CARTORIO_REGISTRO_IMOVEIS]

[ ] Certidão de ônus reais (emitida pelo Cartório de Registro de Imóveis)
[ ] Certidão negativa de débitos de IPTU
     Inscrição municipal: [INSCRICAO_IPTU]
[ ] Carnê ou guia do IPTU do exercício corrente (pago)
[ ] Habite-se / Auto de conclusão de obra (para imóveis construídos)
[ ] Planta aprovada pela prefeitura
[ ] Averbação de construção ou demolição (se houver)

Para apartamentos e condomínios:
[ ] Declaração de quitação condominial (assinada pelo síndico ou administradora)
[ ] Convenção de condomínio e regimento interno
[ ] Ata de eleição do síndico atual

Para imóveis com financiamento quitado:
[ ] Certidão de quitação do financiamento
[ ] Baixa de hipoteca ou alienação fiduciária averbada na matrícula

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DOCUMENTOS DO COMPRADOR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[ ] RG e CPF
[ ] Certidão de nascimento ou casamento
[ ] Comprovante de residência
[ ] Comprovante de renda (holerites, declaração de IR, extratos bancários)
[ ] Certidão negativa de débitos federais
[ ] Certidão negativa de ações cíveis

Para financiamento bancário:
[ ] Extrato do FGTS (se for utilizar)
[ ] Declaração de Imposto de Renda completa (últimos 2 exercícios)
[ ] Extratos bancários (últimos 3 meses)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ETAPAS DO PROCESSO DE VENDA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Etapa 1 — Pré-venda
[ ] Reunir todos os documentos do vendedor e do imóvel
[ ] Solicitar certidões negativas atualizadas
[ ] Verificar existência de débitos ou ônus

Etapa 2 — Negociação e compromisso
[ ] Assinar instrumento particular de compra e venda
[ ] Recolher sinal acordado entre as partes
[ ] Iniciar processo de financiamento (se aplicável)

Etapa 3 — Escritura pública
[ ] Agendar cartório de notas
[ ] Recolher ITBI (alíquota: [ALIQUOTA_ITBI]% sobre o valor venal ou de transação, o maior)
[ ] Apresentar todos os documentos ao cartório

Etapa 4 — Registro
[ ] Levar escritura ao Cartório de Registro de Imóveis
[ ] Aguardar prazo de registro (em média 15 a 30 dias úteis)
[ ] Retirar matrícula atualizada com novo proprietário

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OBSERVAÇÕES IMPORTANTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• A transferência legal do imóvel somente se concretiza com o registro da escritura no Cartório de Registro de Imóveis competente.
• Certidões negativas possuem validade limitada; verifique os prazos antes da escritura.
• O ITBI (Imposto sobre Transmissão de Bens Imóveis) é de responsabilidade do comprador, salvo acordo em contrário.
• Recomenda-se a assistência de advogado especializado em direito imobiliário em todas as etapas.

[OBSERVACOES_ADICIONAIS]
`,
};

export default checklistDocumentos;
