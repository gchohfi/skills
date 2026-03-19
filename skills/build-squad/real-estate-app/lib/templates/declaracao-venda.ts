import { DocumentTemplate } from "@/types/document";

const declaracaoVenda: DocumentTemplate = {
  id: "declaracao-venda",
  nome: "Declaração de Venda de Imóvel",
  descricao:
    "Declaração do vendedor sobre o estado de conservação e condições do imóvel, incluindo problemas estruturais, infiltrações, pragas, pendências legais e débitos, conforme exigido pela boa-fé objetiva nas relações contratuais.",
  conteudo: `DECLARAÇÃO DE VENDA DE IMÓVEL
(Disclosure do Vendedor)

Eu, [NOME_COMPLETO_VENDEDOR], [NACIONALIDADE_VENDEDOR], [ESTADO_CIVIL_VENDEDOR], [PROFISSAO_VENDEDOR], portador(a) do CPF n.º [CPF_VENDEDOR] e do RG n.º [RG_VENDEDOR] ([ORGAO_EXPEDIDOR_VENDEDOR]), residente e domiciliado(a) na [ENDERECO_VENDEDOR], n.º [NUMERO_VENDEDOR], [COMPLEMENTO_VENDEDOR], Bairro [BAIRRO_VENDEDOR], [CIDADE_VENDEDOR]/[UF_VENDEDOR], CEP [CEP_VENDEDOR], na qualidade de VENDEDOR(A) do imóvel abaixo identificado, declaro, para os devidos fins de direito, nos termos do art. 422 do Código Civil Brasileiro e sob as penas previstas no art. 186 do mesmo diploma legal, o seguinte:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IDENTIFICAÇÃO DO IMÓVEL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Tipo de imóvel: [TIPO_IMOVEL]
Endereço: [ENDERECO_IMOVEL], n.º [NUMERO_IMOVEL], [COMPLEMENTO_IMOVEL]
Bairro: [BAIRRO_IMOVEL] — Cidade: [CIDADE_IMOVEL] — Estado: [UF_IMOVEL]
CEP: [CEP_IMOVEL]
Matrícula n.º: [NUMERO_MATRICULA]
Cartório de Registro de Imóveis: [CARTORIO_REGISTRO_IMOVEIS] de [COMARCA_CARTORIO]
Inscrição municipal (IPTU): [INSCRICAO_IPTU]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SEÇÃO 1 — ESTADO GERAL DE CONSERVAÇÃO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1.1. Tempo em que o vendedor é proprietário do imóvel: [TEMPO_PROPRIEDADE] (ex.: 5 anos)

1.2. O imóvel está atualmente: (marcar a opção aplicável)
[ ] Ocupado pelo próprio vendedor
[ ] Ocupado por terceiros (locatários ou comodatários)
[ ] Desocupado

1.3. Estado geral de conservação do imóvel: (marcar a opção aplicável)
[ ] Ótimo — imóvel em perfeitas condições de habitabilidade, sem necessidade de reparos.
[ ] Bom — imóvel em boas condições, com pequenos reparos estéticos necessários.
[ ] Regular — imóvel com necessidade de reparos de manutenção preventiva ou corretiva.
[ ] Ruim — imóvel com avarias significativas que comprometem parcialmente a habitabilidade.

1.4. Descreva o estado geral de conservação, incluindo quaisquer informações relevantes não abrangidas pelas demais seções:
[DESCRICAO_ESTADO_GERAL ou "Nenhuma observação adicional."]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SEÇÃO 2 — PROBLEMAS ESTRUTURAIS CONHECIDOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

2.1. O imóvel possui ou já apresentou algum dos problemas estruturais listados abaixo? (responder SIM ou NÃO para cada item; em caso afirmativo, descrever)

a) Trincas, fissuras ou rachaduras nas paredes, lajes ou estrutura:
[ ] Não  [ ] Sim — Descrição e localização: [DESCRICAO_TRINCAS]
   Estado atual: [ ] Problema ativo  [ ] Problema sanado — Reparo realizado em: [DATA_REPARO_TRINCAS]

b) Recalque de fundações (afundamento diferencial do terreno ou da estrutura):
[ ] Não  [ ] Sim — Descrição: [DESCRICAO_RECALQUE]
   Estado atual: [ ] Problema ativo  [ ] Problema sanado — Reparo realizado em: [DATA_REPARO_RECALQUE]

c) Problemas na cobertura/telhado (telhas quebradas, cumeeiras danificadas, estrutura de madeira deteriorada):
[ ] Não  [ ] Sim — Descrição: [DESCRICAO_TELHADO]
   Estado atual: [ ] Problema ativo  [ ] Problema sanado — Reparo realizado em: [DATA_REPARO_TELHADO]

d) Corrosão de armaduras de concreto armado (ferragens expostas):
[ ] Não  [ ] Sim — Descrição e localização: [DESCRICAO_CORROSAO]
   Estado atual: [ ] Problema ativo  [ ] Problema sanado — Reparo realizado em: [DATA_REPARO_CORROSAO]

e) Problemas na estrutura de concreto (desagregação, carbonatação, manchas de umidade na laje):
[ ] Não  [ ] Sim — Descrição: [DESCRICAO_CONCRETO]
   Estado atual: [ ] Problema ativo  [ ] Problema sanado — Reparo realizado em: [DATA_REPARO_CONCRETO]

f) Outros problemas estruturais não listados acima:
[ ] Não  [ ] Sim — Descrição: [DESCRICAO_OUTROS_ESTRUTURAIS]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SEÇÃO 3 — INFILTRAÇÕES E VAZAMENTOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

3.1. O imóvel possui ou já apresentou infiltrações ou vazamentos? (responder SIM ou NÃO para cada item)

a) Infiltração pela cobertura ou telhado:
[ ] Não  [ ] Sim — Localização: [LOCAL_INFILTRACAO_TELHADO]
   Estado atual: [ ] Problema ativo  [ ] Problema sanado — Reparo realizado em: [DATA_REPARO_INF_TELHADO]

b) Infiltração pelas paredes externas (fachada, muros perimetrais):
[ ] Não  [ ] Sim — Localização: [LOCAL_INFILTRACAO_FACHADA]
   Estado atual: [ ] Problema ativo  [ ] Problema sanado — Reparo realizado em: [DATA_REPARO_INF_FACHADA]

c) Infiltração pelo subsolo, garagem subterrânea ou porão:
[ ] Não  [ ] Sim — Localização: [LOCAL_INFILTRACAO_SUBSOLO]
   Estado atual: [ ] Problema ativo  [ ] Problema sanado — Reparo realizado em: [DATA_REPARO_INF_SUBSOLO]

d) Infiltração proveniente de unidade vizinha (apartamento acima, ao lado ou abaixo):
[ ] Não  [ ] Sim — Descrição: [DESCRICAO_INFILTRACAO_VIZINHO]
   Estado atual: [ ] Problema ativo  [ ] Problema em negociação com vizinho  [ ] Problema sanado

e) Vazamento nas instalações hidráulicas (encanamentos, conexões, torneiras, sifões):
[ ] Não  [ ] Sim — Localização: [LOCAL_VAZAMENTO_HIDRAULICO]
   Estado atual: [ ] Problema ativo  [ ] Problema sanado — Reparo realizado em: [DATA_REPARO_VAZAMENTO]

f) Problemas no sistema de esgoto (mau cheiro, refluxo, entupimentos recorrentes):
[ ] Não  [ ] Sim — Descrição: [DESCRICAO_ESGOTO]
   Estado atual: [ ] Problema ativo  [ ] Problema sanado — Reparo realizado em: [DATA_REPARO_ESGOTO]

g) Manchas de umidade, bolor ou mofo nas paredes ou teto:
[ ] Não  [ ] Sim — Localização: [LOCAL_UMIDADE_BOLOR]
   Causa identificada: [CAUSA_UMIDADE]

3.2. Há impermeabilização nas áreas molhadas (banheiros, cozinha, área de serviço, terraço, piscina)?
[ ] Sim, todas as áreas estão impermeabilizadas e em bom estado.
[ ] Sim, parcialmente — áreas impermeabilizadas: [AREAS_IMPERMEABILIZADAS]
[ ] Não há impermeabilização conhecida.
[ ] Desconhecido.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SEÇÃO 4 — PRAGAS E INFESTAÇÕES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

4.1. O imóvel possui ou já apresentou infestação por pragas? (responder SIM ou NÃO para cada item)

a) Cupins (térmitas) na estrutura de madeira, forros, esquadrias ou pisos:
[ ] Não  [ ] Sim — Localização: [LOCAL_CUPINS]
   Estado atual: [ ] Infestação ativa  [ ] Tratamento realizado em: [DATA_TRATAMENTO_CUPINS]
   Empresa responsável pelo tratamento: [EMPRESA_TRATAMENTO_CUPINS]

b) Cupins de solo (subterrâneos):
[ ] Não  [ ] Sim — Descrição: [DESCRICAO_CUPINS_SOLO]

c) Baratas, formigas ou outros insetos em quantidade anormal:
[ ] Não  [ ] Sim — Descrição: [DESCRICAO_INSETOS]

d) Ratos, camundongos ou outros roedores:
[ ] Não  [ ] Sim — Localização: [LOCAL_ROEDORES]
   Estado atual: [ ] Problema ativo  [ ] Problema sanado em: [DATA_SANADO_ROEDORES]

e) Outros animais (pombos, morcegos, escorpiões, aranhas, etc.):
[ ] Não  [ ] Sim — Descrição: [DESCRICAO_OUTROS_ANIMAIS]

4.2. O imóvel realiza dedetização periódica?
[ ] Sim — Frequência: [FREQUENCIA_DEDETIZACAO] — Última realizada em: [DATA_ULTIMA_DEDETIZACAO]
[ ] Não

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SEÇÃO 5 — PENDÊNCIAS LEGAIS E SITUAÇÃO DOMINIAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

5.1. O imóvel é objeto de alguma ação judicial em curso?
[ ] Não
[ ] Sim — Descrever: [DESCRICAO_ACOES_JUDICIAIS]
   Número do processo: [NUMERO_PROCESSO]
   Vara/Tribunal: [VARA_TRIBUNAL]
   Natureza da ação: [NATUREZA_ACAO]

5.2. Existe alguma disputa de posse, usucapião em tramitação ou reivindicação por terceiros sobre o imóvel ou parte dele?
[ ] Não  [ ] Sim — Descrição: [DESCRICAO_DISPUTAS]

5.3. Existem ônus reais registrados na matrícula do imóvel (hipoteca, alienação fiduciária, usufruto, servidão, etc.)?
[ ] Não  [ ] Sim — Descrever: [DESCRICAO_ONUS_REAIS]

5.4. O imóvel está regularizado perante a Prefeitura Municipal?
[ ] Sim — Habite-se expedido em: [DATA_HABITE_SE]
[ ] Não — Situação irregular: [DESCRICAO_IRREGULARIDADE_MUNICIPAL]
[ ] Parcialmente regularizado — Descrição: [DESCRICAO_REGULARIZACAO_PARCIAL]

5.5. Existe algum auto de infração ou embargo municipal ou estadual sobre o imóvel?
[ ] Não  [ ] Sim — Descrição: [DESCRICAO_AUTO_INFRACAO]

5.6. O imóvel está inserido em área de preservação ambiental, faixa de domínio, área de risco ou qualquer outra restrição urbanística?
[ ] Não  [ ] Sim — Descrição: [DESCRICAO_RESTRICAO_URBANISTICA]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SEÇÃO 6 — DÍVIDAS DE CONDOMÍNIO E IPTU
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

6.1. Existem débitos de IPTU (Imposto Predial e Territorial Urbano) em aberto?
[ ] Não — O IPTU está quite até o exercício de [ANO_IPTU_QUITE].
[ ] Sim — Valor aproximado dos débitos: R$ [VALOR_DEBITO_IPTU]
   Exercícios em aberto: [EXERCICIOS_IPTU_ABERTO]

6.2. Existem débitos de taxas condominiais em aberto?
[ ] Não aplicável (imóvel não pertence a condomínio)
[ ] Não — As taxas condominiais estão quites até [DATA_QUITE_CONDOMINIO].
[ ] Sim — Valor aproximado dos débitos: R$ [VALOR_DEBITO_CONDOMINIO]
   Período em aberto: [PERIODO_DEBITO_CONDOMINIO]

6.3. Existem débitos de água, esgoto (SAAE/SABESP/Copasa ou equivalente)?
[ ] Não — Conta quite até [DATA_QUITE_AGUA].
[ ] Sim — Valor aproximado: R$ [VALOR_DEBITO_AGUA]

6.4. Existem débitos de energia elétrica?
[ ] Não — Conta quite até [DATA_QUITE_ENERGIA].
[ ] Sim — Valor aproximado: R$ [VALOR_DEBITO_ENERGIA]

6.5. Existem débitos de gás canalizado?
[ ] Não aplicável  [ ] Não — Quite até [DATA_QUITE_GAS].  [ ] Sim — Valor: R$ [VALOR_DEBITO_GAS]

6.6. Existem contribuições de melhoria, taxas de obras ou melhorias públicas lançadas sobre o imóvel?
[ ] Não  [ ] Sim — Descrição e valor: [DESCRICAO_CONTRIBUICAO_MELHORIA]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SEÇÃO 7 — REFORMAS E BENFEITORIAS REALIZADAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

7.1. Foram realizadas reformas ou benfeitorias no imóvel durante o período em que o vendedor foi proprietário?
[ ] Não
[ ] Sim — Descrever abaixo cada reforma ou benfeitoria significativa:

Reforma/Benfeitoria 1:
Descrição: [DESCRICAO_REFORMA_1]
Área afetada: [AREA_REFORMA_1]
Ano de realização: [ANO_REFORMA_1]
Responsável técnico (se houver): [RESPONSAVEL_REFORMA_1]
Possui alvará/aprovação municipal: [ ] Sim  [ ] Não  [ ] Não exigível

Reforma/Benfeitoria 2:
Descrição: [DESCRICAO_REFORMA_2]
Área afetada: [AREA_REFORMA_2]
Ano de realização: [ANO_REFORMA_2]
Responsável técnico (se houver): [RESPONSAVEL_REFORMA_2]
Possui alvará/aprovação municipal: [ ] Sim  [ ] Não  [ ] Não exigível

Reforma/Benfeitoria 3:
Descrição: [DESCRICAO_REFORMA_3]
Área afetada: [AREA_REFORMA_3]
Ano de realização: [ANO_REFORMA_3]
Responsável técnico (se houver): [RESPONSAVEL_REFORMA_3]
Possui alvará/aprovação municipal: [ ] Sim  [ ] Não  [ ] Não exigível

(Adicionar quantas linhas forem necessárias)

7.2. Foram realizadas alterações na planta original do imóvel (ampliações, demolições, mudanças de layout)?
[ ] Não
[ ] Sim — Descrição das alterações: [DESCRICAO_ALTERACOES_PLANTA]
   As alterações estão averbadas na matrícula do imóvel: [ ] Sim  [ ] Não  [ ] Em processo de averbação

7.3. A instalação elétrica foi atualizada ou reformada?
[ ] Não  [ ] Sim — Ano: [ANO_REFORMA_ELETRICA] — Padrão: [ ] Monofásico  [ ] Bifásico  [ ] Trifásico

7.4. A instalação hidráulica foi atualizada ou reformada?
[ ] Não  [ ] Sim — Ano: [ANO_REFORMA_HIDRAULICA] — Descrição: [DESCRICAO_REFORMA_HIDRAULICA]

7.5. Existem benfeitorias realizadas por terceiros (ex.: inquilinos) das quais o vendedor tem conhecimento?
[ ] Não  [ ] Sim — Descrição: [DESCRICAO_BENFEITORIAS_TERCEIROS]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DECLARAÇÃO FINAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Declaro, sob as penas da lei, que todas as informações prestadas neste documento são verdadeiras e completas, e que não omiti nenhum fato relevante de meu conhecimento que possa influenciar na decisão de compra do(a) adquirente ou no valor do imóvel.

Estou ciente de que a prestação de informações falsas ou a omissão dolosa de vícios ocultos sujeitam-me às sanções previstas nos artigos 186, 443 e 444 do Código Civil Brasileiro, bem como à responsabilidade criminal cabível.

[CIDADE_DECLARACAO], [DATA_DECLARACAO_EXTENSO].

_______________________________________________
[NOME_COMPLETO_VENDEDOR]
CPF: [CPF_VENDEDOR]
VENDEDOR(A)

_______________________________________________
[NOME_CONJUGE_VENDEDOR] (cônjuge, se aplicável)
CPF: [CPF_CONJUGE_VENDEDOR]

TESTEMUNHAS:

1. _______________________________________________
   Nome: [NOME_TESTEMUNHA_1]
   CPF: [CPF_TESTEMUNHA_1]

2. _______________________________________________
   Nome: [NOME_TESTEMUNHA_2]
   CPF: [CPF_TESTEMUNHA_2]
`,
};

export default declaracaoVenda;
