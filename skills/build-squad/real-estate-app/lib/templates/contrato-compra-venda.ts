import { DocumentTemplate } from "@/types/document";

const contratoCompraVenda: DocumentTemplate = {
  id: "contrato-compra-venda",
  nome: "Contrato de Compra e Venda",
  descricao:
    "Contrato Particular de Compra e Venda de Imóvel com todas as cláusulas essenciais exigidas pela legislação brasileira, incluindo identificação das partes, descrição do imóvel, preço, forma de pagamento e condições gerais.",
  conteudo: `CONTRATO PARTICULAR DE COMPRA E VENDA DE IMÓVEL

Pelo presente instrumento particular, as partes abaixo qualificadas têm entre si, justo e contratado, o presente Contrato Particular de Compra e Venda de Imóvel, que se regerá pelas cláusulas e condições seguintes:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IDENTIFICAÇÃO DAS PARTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

VENDEDOR(A):
Nome completo: [NOME_COMPLETO_VENDEDOR]
Nacionalidade: [NACIONALIDADE_VENDEDOR]
Estado civil: [ESTADO_CIVIL_VENDEDOR]
Profissão: [PROFISSAO_VENDEDOR]
CPF: [CPF_VENDEDOR]
RG: [RG_VENDEDOR] — Órgão expedidor: [ORGAO_EXPEDIDOR_VENDEDOR]
Endereço residencial: [ENDERECO_VENDEDOR], n.º [NUMERO_VENDEDOR], [COMPLEMENTO_VENDEDOR]
Bairro: [BAIRRO_VENDEDOR] — Cidade: [CIDADE_VENDEDOR] — Estado: [UF_VENDEDOR]
CEP: [CEP_VENDEDOR]
Telefone: [TELEFONE_VENDEDOR]
E-mail: [EMAIL_VENDEDOR]

Quando o vendedor for casado, identificar também o cônjuge:
Nome do cônjuge: [NOME_CONJUGE_VENDEDOR]
CPF do cônjuge: [CPF_CONJUGE_VENDEDOR]
RG do cônjuge: [RG_CONJUGE_VENDEDOR]

Doravante denominado(a) simplesmente VENDEDOR(A).

COMPRADOR(A):
Nome completo: [NOME_COMPLETO_COMPRADOR]
Nacionalidade: [NACIONALIDADE_COMPRADOR]
Estado civil: [ESTADO_CIVIL_COMPRADOR]
Profissão: [PROFISSAO_COMPRADOR]
CPF: [CPF_COMPRADOR]
RG: [RG_COMPRADOR] — Órgão expedidor: [ORGAO_EXPEDIDOR_COMPRADOR]
Endereço residencial: [ENDERECO_COMPRADOR], n.º [NUMERO_COMPRADOR], [COMPLEMENTO_COMPRADOR]
Bairro: [BAIRRO_COMPRADOR] — Cidade: [CIDADE_COMPRADOR] — Estado: [UF_COMPRADOR]
CEP: [CEP_COMPRADOR]
Telefone: [TELEFONE_COMPRADOR]
E-mail: [EMAIL_COMPRADOR]

Quando o comprador for casado, identificar também o cônjuge:
Nome do cônjuge: [NOME_CONJUGE_COMPRADOR]
CPF do cônjuge: [CPF_CONJUGE_COMPRADOR]
RG do cônjuge: [RG_CONJUGE_COMPRADOR]

Doravante denominado(a) simplesmente COMPRADOR(A).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CLÁUSULA PRIMEIRA — DO OBJETO (DESCRIÇÃO DO IMÓVEL)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1.1. O objeto do presente contrato é o imóvel de propriedade do(a) VENDEDOR(A), descrito e caracterizado a seguir:

Tipo de imóvel: [TIPO_IMOVEL] (ex.: apartamento, casa, terreno, sala comercial)
Endereço completo: [ENDERECO_IMOVEL], n.º [NUMERO_IMOVEL], [COMPLEMENTO_IMOVEL]
Bairro: [BAIRRO_IMOVEL] — Cidade: [CIDADE_IMOVEL] — Estado: [UF_IMOVEL]
CEP: [CEP_IMOVEL]

Dados registrais:
Matrícula n.º: [NUMERO_MATRICULA]
Registrado no [CARTORIO_REGISTRO_IMOVEIS] Cartório de Registro de Imóveis de [COMARCA_CARTORIO]
Livro: [LIVRO_MATRICULA] — Folha: [FOLHA_MATRICULA]

Características do imóvel:
Área privativa/útil: [AREA_PRIVATIVA] m²
Área de uso comum (se aplicável): [AREA_COMUM] m²
Área total do terreno (se aplicável): [AREA_TERRENO] m²
Área construída (se aplicável): [AREA_CONSTRUIDA] m²
Número de quartos: [NUM_QUARTOS]
Número de vagas de garagem: [NUM_VAGAS]
Inscrição municipal (IPTU): [INSCRICAO_IPTU]

1.2. O imóvel é vendido no estado em que se encontra, conforme vistoria realizada pelo(a) COMPRADOR(A), que declara ter visitado o imóvel e estar ciente de suas condições físicas.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CLÁUSULA SEGUNDA — DO PREÇO E DA FORMA DE PAGAMENTO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

2.1. O preço total de venda do imóvel é de R$ [VALOR_TOTAL] ([VALOR_TOTAL_EXTENSO]), a ser pago pelo(a) COMPRADOR(A) ao(à) VENDEDOR(A) da seguinte forma:

a) Sinal e princípio de pagamento: R$ [VALOR_SINAL] ([VALOR_SINAL_EXTENSO]), pagos neste ato, em [FORMA_PAGAMENTO_SINAL] (ex.: dinheiro, transferência bancária, cheque), cuja quitação o(a) VENDEDOR(A) outorga ao(à) COMPRADOR(A) pelo presente instrumento.

b) Parcela intermediária (se houver): R$ [VALOR_PARCELA_INTERMEDIARIA] ([VALOR_PARCELA_INTERMEDIARIA_EXTENSO]), a ser pago até [DATA_VENCIMENTO_PARCELA], mediante [FORMA_PAGAMENTO_PARCELA].

c) Saldo final: R$ [VALOR_SALDO] ([VALOR_SALDO_EXTENSO]), a ser pago na data da assinatura da Escritura Pública Definitiva de Compra e Venda, prevista para até [DATA_LIMITE_ESCRITURA].

2.2. Os pagamentos em transferência bancária deverão ser realizados para a seguinte conta:
Banco: [BANCO_VENDEDOR]
Agência: [AGENCIA_VENDEDOR]
Conta corrente/poupança: [CONTA_VENDEDOR]
Titular: [NOME_COMPLETO_VENDEDOR]
CPF: [CPF_VENDEDOR]

2.3. O preço ora ajustado é fixo e irreajustável, exceto se as partes convencionarem diversamente por meio de aditivo contratual.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CLÁUSULA TERCEIRA — DO FINANCIAMENTO BANCÁRIO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

3.1. (Marcar a opção aplicável)

[ ] Operação sem financiamento: O preço será pago integralmente com recursos próprios do(a) COMPRADOR(A), conforme condições estabelecidas na Cláusula Segunda.

[ ] Operação com financiamento bancário: Parte do preço, no valor de R$ [VALOR_FINANCIADO] ([VALOR_FINANCIADO_EXTENSO]), será obtida pelo(a) COMPRADOR(A) por meio de financiamento junto à instituição financeira [NOME_INSTITUICAO_FINANCEIRA], modalidade [MODALIDADE_FINANCIAMENTO] (ex.: SFH, SFI, FGTS).

3.2. Em caso de financiamento, as partes comprometem-se a:

a) O(A) COMPRADOR(A) deverá dar entrada ao processo de financiamento junto à instituição financeira no prazo máximo de [PRAZO_ENTRADA_FINANCIAMENTO] dias corridos contados da assinatura deste instrumento, apresentando toda a documentação exigida.

b) O(A) VENDEDOR(A) compromete-se a cooperar com o processo de avaliação do imóvel e a fornecer todos os documentos necessários no prazo de [PRAZO_DOCUMENTOS_VENDEDOR] dias úteis após solicitação.

c) Caso o financiamento não seja aprovado por motivo alheio à vontade do(a) COMPRADOR(A), devidamente comprovado, as partes acordarão sobre a devolução dos valores pagos ou a renegociação das condições, no prazo de [PRAZO_RENEGOCIACAO] dias.

d) Caso o financiamento não seja aprovado por motivo atribuível ao(à) COMPRADOR(A) (ex.: documentação incompleta, restrições de crédito conhecidas), aplicar-se-ão as penalidades previstas na Cláusula Sexta deste instrumento.

3.3. O FGTS, quando utilizado, obedecerá às regras e limitações estabelecidas pela Caixa Econômica Federal e pela legislação em vigor.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CLÁUSULA QUARTA — DO PRAZO PARA ESCRITURA DEFINITIVA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

4.1. As partes comprometem-se a comparecer ao [CARTORIO_ESCRITURA] Cartório de Notas de [CIDADE_ESCRITURA] para a lavratura da Escritura Pública Definitiva de Compra e Venda até a data de [DATA_LIMITE_ESCRITURA], desde que cumpridas todas as condições previstas neste contrato.

4.2. A escolha do Cartório de Notas para lavratura da escritura é de responsabilidade do(a) [PARTE_ESCOLHA_CARTORIO] (ex.: comprador).

4.3. As custas cartorárias referentes à lavratura da Escritura Pública, ao Imposto sobre Transmissão de Bens Imóveis (ITBI) e ao registro da escritura no Cartório de Registro de Imóveis competente serão de responsabilidade exclusiva do(a) COMPRADOR(A), salvo convenção diversa entre as partes.

4.4. A posse do imóvel será transferida ao(à) COMPRADOR(A):
[ ] Na data da assinatura da Escritura Pública Definitiva.
[ ] Na data do pagamento integral do preço.
[ ] Em outra data acordada entre as partes: [DATA_TRANSFERENCIA_POSSE].

4.5. Em caso de atraso na lavratura da escritura por culpa exclusiva de uma das partes, a parte inadimplente pagará à outra multa diária de R$ [VALOR_MULTA_DIARIA] ([VALOR_MULTA_DIARIA_EXTENSO]), limitada ao prazo de [PRAZO_LIMITE_MULTA_DIARIA] dias, sem prejuízo das demais penalidades previstas neste instrumento.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CLÁUSULA QUINTA — DOS ÔNUS E DÉBITOS DO IMÓVEL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

5.1. O(A) VENDEDOR(A) declara, sob as penas da lei, que o imóvel objeto deste contrato:

a) Encontra-se livre e desembaraçado de quaisquer ônus reais, hipotecas, penhoras, arrestos, sequestros, servidões não mencionadas neste instrumento, usufruto, alienação fiduciária, promessas de venda ou qualquer outro gravame que impeça ou restrinja a sua livre disposição, salvo os seguintes: [DESCRICAO_ONUS_EXISTENTES ou "NENHUM"].

b) Está quite com o pagamento do Imposto Predial e Territorial Urbano (IPTU) até a data de assinatura deste contrato, comprometendo-se a apresentar certidão negativa de débitos municipais quando solicitado.

c) Está quite com as taxas condominiais até a data de assinatura deste contrato, quando aplicável, comprometendo-se a apresentar declaração de quitação emitida pelo síndico ou administradora do condomínio.

d) Não é objeto de ação judicial de qualquer natureza que possa afetar a titularidade ou a posse do imóvel, salvo as seguintes: [DESCRICAO_ACOES_JUDICIAIS ou "NENHUMA"].

5.2. Os débitos de IPTU, taxas condominiais, água, luz, gás e demais encargos incidentes sobre o imóvel:

a) Até a data da efetiva entrega das chaves: são de responsabilidade do(a) VENDEDOR(A).
b) A partir da data da efetiva entrega das chaves: são de responsabilidade do(a) COMPRADOR(A).

5.3. Caso existam débitos não declarados neste instrumento que venham a ser exigidos após a assinatura da escritura, o(a) VENDEDOR(A) obriga-se a saldá-los integralmente no prazo de [PRAZO_SALDAR_DEBITOS] dias após a notificação, sob pena de responder por perdas e danos.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CLÁUSULA SEXTA — DA MULTA E DA RESCISÃO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

6.1. O presente contrato obriga as partes e seus herdeiros e sucessores, sendo irrevogável e irretratável, salvo por mútuo consentimento expresso das partes ou nas hipóteses legalmente previstas.

6.2. Em caso de inadimplemento contratual por parte do(a) COMPRADOR(A), o(a) VENDEDOR(A) poderá, a seu critério:

a) Exigir o cumprimento forçado da obrigação, acrescida de multa compensatória equivalente a [PERCENTUAL_MULTA_COMPRADOR]% ([PERCENTUAL_MULTA_COMPRADOR_EXTENSO] por cento) sobre o valor total do contrato; ou

b) Rescindir o presente contrato, retendo [PERCENTUAL_RETENCAO]% ([PERCENTUAL_RETENCAO_EXTENSO] por cento) dos valores já recebidos a título de multa compensatória e indenização pelas despesas havidas, devolvendo o saldo remanescente ao(à) COMPRADOR(A) no prazo de [PRAZO_DEVOLUCAO] dias.

6.3. Em caso de inadimplemento contratual por parte do(a) VENDEDOR(A), o(a) COMPRADOR(A) poderá, a seu critério:

a) Exigir o cumprimento forçado da obrigação, acrescida de multa compensatória equivalente a [PERCENTUAL_MULTA_VENDEDOR]% ([PERCENTUAL_MULTA_VENDEDOR_EXTENSO] por cento) sobre o valor total do contrato; ou

b) Rescindir o presente contrato, recebendo de volta todos os valores pagos, devidamente corrigidos pelo IPCA desde a data de cada pagamento, acrescidos de multa compensatória equivalente a [PERCENTUAL_MULTA_VENDEDOR]% ([PERCENTUAL_MULTA_VENDEDOR_EXTENSO] por cento) sobre o valor total do contrato.

6.4. Considera-se inadimplemento, sem prejuízo de outras hipóteses:
a) O atraso no pagamento de qualquer parcela por prazo superior a [PRAZO_TOLERANCIA_ATRASO] dias corridos;
b) A recusa imotivada em comparecer ao cartório para lavratura da escritura;
c) O descumprimento de qualquer cláusula ou condição deste instrumento.

6.5. Sobre os valores em atraso incidirão juros moratórios de 1% (um por cento) ao mês e multa de 2% (dois por cento), além de correção monetária pelo IPCA.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CLÁUSULA SÉTIMA — DISPOSIÇÕES GERAIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

7.1. Intervenção de corretor de imóveis: A intermediação desta transação foi realizada pelo(a) corretor(a) de imóveis [NOME_CORRETOR], CRECI n.º [NUMERO_CRECI], cuja comissão, no percentual de [PERCENTUAL_COMISSAO]% ([PERCENTUAL_COMISSAO_EXTENSO] por cento) sobre o valor total do negócio, será paga pelo(a) [RESPONSAVEL_COMISSAO] (ex.: vendedor), conforme instrumento de intermediação firmado em separado.

7.2. Este contrato é celebrado em caráter de instrumento particular com força de escritura pública entre as partes, nos termos do art. 221 do Código Civil Brasileiro.

7.3. As partes elegem o Foro da Comarca de [CIDADE_FORO], Estado de [UF_FORO], com renúncia expressa a qualquer outro, por mais privilegiado que seja, para dirimir quaisquer dúvidas ou litígios decorrentes deste instrumento.

7.4. Qualquer alteração ao presente contrato somente será válida se feita por escrito e assinada por ambas as partes e duas testemunhas, mediante aditivo contratual.

7.5. Este instrumento é celebrado em [NUMERO_VIAS] ([NUMERO_VIAS_EXTENSO]) vias de igual teor e forma, destinando-se uma via a cada parte e uma via ao corretor de imóveis, se houver.

7.6. Declaram as partes que leram e compreenderam integralmente o presente instrumento, concordando com todos os seus termos e condições.

[CIDADE_ASSINATURA], [DATA_ASSINATURA_EXTENSO].

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ASSINATURAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

VENDEDOR(A):

_______________________________________________
[NOME_COMPLETO_VENDEDOR]
CPF: [CPF_VENDEDOR]

_______________________________________________
[NOME_CONJUGE_VENDEDOR] (cônjuge, se aplicável)
CPF: [CPF_CONJUGE_VENDEDOR]


COMPRADOR(A):

_______________________________________________
[NOME_COMPLETO_COMPRADOR]
CPF: [CPF_COMPRADOR]

_______________________________________________
[NOME_CONJUGE_COMPRADOR] (cônjuge, se aplicável)
CPF: [CPF_CONJUGE_COMPRADOR]


TESTEMUNHAS:

1. _______________________________________________
   Nome: [NOME_TESTEMUNHA_1]
   CPF: [CPF_TESTEMUNHA_1]
   RG: [RG_TESTEMUNHA_1]

2. _______________________________________________
   Nome: [NOME_TESTEMUNHA_2]
   CPF: [CPF_TESTEMUNHA_2]
   RG: [RG_TESTEMUNHA_2]


CORRETOR(A) DE IMÓVEIS (se aplicável):

_______________________________________________
[NOME_CORRETOR]
CRECI n.º [NUMERO_CRECI]
`,
};

export default contratoCompraVenda;
