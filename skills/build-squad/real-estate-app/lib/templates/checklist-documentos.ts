import { DocumentTemplate } from "@/types/document";

const checklistDocumentos: DocumentTemplate = {
  id: "checklist-documentos",
  nome: "Checklist de Documentos para Venda",
  descricao:
    "Lista completa de documentos necessários para a venda de imóvel no Brasil, abrangendo documentos pessoais do vendedor, documentos do imóvel, certidões negativas e documentos para lavratura da escritura pública.",
  conteudo: `CHECKLIST DE DOCUMENTOS PARA VENDA DE IMÓVEL
(Legislação Brasileira — atualizado conforme práticas cartorárias vigentes)

Imóvel: [ENDERECO_IMOVEL], n.º [NUMERO_IMOVEL], [COMPLEMENTO_IMOVEL]
Bairro: [BAIRRO_IMOVEL] — Cidade: [CIDADE_IMOVEL] — Estado: [UF_IMOVEL]
Matrícula n.º: [NUMERO_MATRICULA]
Cartório de Registro de Imóveis: [CARTORIO_REGISTRO_IMOVEIS] de [COMARCA_CARTORIO]
Vendedor(a): [NOME_COMPLETO_VENDEDOR]
Data de início do checklist: [DATA_INICIO_CHECKLIST]
Previsão de escritura: [DATA_PREVISAO_ESCRITURA]

Legenda de status:
[ ] Pendente  [✓] Obtido  [N/A] Não aplicável

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BLOCO 1 — DOCUMENTOS PESSOAIS DO VENDEDOR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Observação: Todos os documentos pessoais devem estar válidos e dentro do prazo de validade exigido pelo cartório. Cópias autenticadas podem ser exigidas.

1.1. Documento de identidade (RG) — original e cópia
     [ ] Vendedor(a)
     [ ] Cônjuge ou companheiro(a) (se aplicável)
     Observação: [OBS_RG]

1.2. CPF (Cadastro de Pessoas Físicas) — original e cópia
     [ ] Vendedor(a): CPF [CPF_VENDEDOR]
     [ ] Cônjuge ou companheiro(a): CPF [CPF_CONJUGE_VENDEDOR] (se aplicável)
     Observação: verificar regularidade do CPF junto à Receita Federal.

1.3. Certidão de casamento (se aplicável)
     [ ] Certidão de casamento atualizada (emitida nos últimos 90 dias)
     Cartório de origem: [CARTORIO_CASAMENTO]
     Regime de bens: [REGIME_BENS]
     Observação: em caso de regime de comunhão universal, comunhão parcial ou separação obrigatória, verificar necessidade de outorga conjugal.

1.4. Certidão de nascimento (se solteiro, viúvo ou divorciado)
     [ ] Certidão de nascimento atualizada
     Cartório de origem: [CARTORIO_NASCIMENTO]

1.5. Certidão de óbito do cônjuge (se viúvo)
     [ ] Certidão de óbito atualizada
     Observação: verificar se o inventário foi concluído e se a partilha está averbada na matrícula do imóvel.

1.6. Sentença de divórcio/separação averbada (se divorciado)
     [ ] Certidão de casamento com averbação do divórcio ou certidão de estado civil atualizada.

1.7. Comprovante de residência atualizado (últimos 90 dias)
     [ ] Vendedor(a)
     [ ] Cônjuge ou companheiro(a) (se aplicável)
     Tipos aceitos: conta de água, energia elétrica, telefone fixo, extrato bancário, correspondência oficial.

1.8. Pacto antenupcial (se o regime não for comunhão parcial)
     [ ] Escritura do pacto antenupcial e certidão de registro no Cartório de Títulos e Documentos
     Observação: [OBS_PACTO_ANTENUPCIAL]

1.9. Documentos em caso de vendedor pessoa jurídica (empresa)
     [ ] CNPJ atualizado
     [ ] Contrato social e última alteração contratual ou Estatuto Social
     [ ] Ata de eleição dos administradores em vigor
     [ ] Certidão Simplificada da Junta Comercial (emitida nos últimos 30 dias)
     [ ] Documentos pessoais (RG e CPF) dos representantes legais que assinarão a escritura
     [ ] Balanço patrimonial do último exercício, se exigido pelo cartório

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BLOCO 2 — DOCUMENTOS DO IMÓVEL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

2.1. Certidão de Matrícula Atualizada do Imóvel
     [ ] Certidão emitida diretamente pelo Cartório de Registro de Imóveis
         Validade usual: 30 dias (confirmar com o cartório de notas)
         Número da matrícula: [NUMERO_MATRICULA]
         Cartório: [CARTORIO_REGISTRO_IMOVEIS] de [COMARCA_CARTORIO]
         Data de emissão: [DATA_EMISSAO_MATRICULA]
         Observação: a certidão deve refletir a situação dominial atual, sem ônus ou pendências não declaradas.

2.2. Certidão Negativa de Ônus Reais e Ações Reipersecutórias
     [ ] Emitida pelo Cartório de Registro de Imóveis competente
         Validade usual: 30 dias
         Data de emissão: [DATA_EMISSAO_CERT_ONUS]
         Observação: confirmar inexistência de hipotecas, penhoras, alienações fiduciárias e outras restrições.

2.3. IPTU — Carnê ou Certidão de Quitação
     [ ] Carnê de IPTU do exercício corrente: [ANO_IPTU]
     [ ] Certidão negativa de débitos de IPTU emitida pela Prefeitura Municipal de [CIDADE_IMOVEL]
         Inscrição municipal: [INSCRICAO_IPTU]
         Data de emissão: [DATA_EMISSAO_CERT_IPTU]
         Observação: apresentar comprovantes de pagamento das últimas [NUM_ANOS_IPTU] parcelas ou certidão de quitação integral.

2.4. Certidão Negativa de Débitos Condominiais (se aplicável)
     [ ] Declaração de quitação de taxas condominiais emitida pelo síndico ou pela administradora do condomínio
         Condomínio: [NOME_CONDOMINIO]
         CNPJ do condomínio: [CNPJ_CONDOMINIO]
         Administradora: [NOME_ADMINISTRADORA]
         Data de emissão: [DATA_EMISSAO_CERT_COND]
         Observação: a certidão deve abranger todas as cotas condominiais (ordinárias e extraordinárias) e o fundo de reserva.

2.5. Habite-se (Alvará de Conclusão de Obra)
     [ ] Habite-se expedido pela Prefeitura Municipal
         Data de expedição: [DATA_HABITE_SE]
         Observação: verificar se o habite-se cobre toda a área construída atual. Ampliações não regularizadas devem ser averbadas antes da escritura.

2.6. Planta do Imóvel Aprovada pela Prefeitura
     [ ] Planta aprovada pela Prefeitura Municipal de [CIDADE_IMOVEL]
         Data de aprovação: [DATA_APROVACAO_PLANTA]
         Número do processo de aprovação: [NUMERO_PROCESSO_PLANTA]
         Observação: a planta deve corresponder à configuração atual do imóvel.

2.7. Memorial Descritivo (se disponível)
     [ ] Memorial descritivo do imóvel
         Observação: [OBS_MEMORIAL_DESCRITIVO]

2.8. Escritura Pública de Aquisição anterior ou instrumento equivalente
     [ ] Escritura pública de compra e venda anterior (ou formal de partilha, carta de adjudicação, etc.)
         Data da escritura anterior: [DATA_ESCRITURA_ANTERIOR]
         Cartório: [CARTORIO_ESCRITURA_ANTERIOR]
         Observação: verificar se está devidamente registrada na matrícula.

2.9. ART/RRT de Responsabilidade Técnica (se houver obras recentes)
     [ ] ART (Anotação de Responsabilidade Técnica — CREA) ou RRT (Registro de Responsabilidade Técnica — CAU)
         Referente a: [DESCRICAO_OBRA_ART]
         Profissional responsável: [NOME_RESPONSAVEL_ART]
         Número da ART/RRT: [NUMERO_ART_RRT]

2.10. Convenção de Condomínio e Regimento Interno (para apartamentos)
      [ ] Convenção de Condomínio registrada no Cartório de Registro de Imóveis
      [ ] Regimento Interno do Condomínio
          Observação: [OBS_CONVENCAO_CONDOMINIO]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BLOCO 3 — CERTIDÕES NEGATIVAS DO VENDEDOR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Observação geral: Certidões negativas costumam ter validade de 30 a 180 dias. Confirmar com o cartório de notas a validade exigida para cada certidão.

3.1. Certidões de Débitos Federais
     [ ] Certidão Conjunta Negativa de Débitos relativos a Tributos Federais e à Dívida Ativa da União
         Emitida por: Receita Federal do Brasil / PGFN
         Site: www.receita.fazenda.gov.br
         Data de emissão: [DATA_CERTIDAO_FEDERAL]
         Observação: abrange IR, IPI, CSLL, PIS, COFINS e outros tributos federais.

     [ ] Certidão de Regularidade do FGTS (CRF)
         Emitida por: Caixa Econômica Federal
         Site: www.caixa.gov.br
         Data de emissão: [DATA_CERTIDAO_FGTS]
         Observação: exigível especialmente quando o vendedor é pessoa jurídica com empregados.

3.2. Certidões de Débitos Estaduais
     [ ] Certidão Negativa de Débitos Estaduais
         Estado: [UF_IMOVEL]
         Órgão emissor: [ORGAO_CERTIDAO_ESTADUAL]
         Site: [SITE_CERTIDAO_ESTADUAL]
         Data de emissão: [DATA_CERTIDAO_ESTADUAL]

3.3. Certidões de Débitos Municipais
     [ ] Certidão Negativa de Débitos Municipais (tributos em geral)
         Município: [CIDADE_IMOVEL]
         Órgão emissor: Secretaria Municipal de Finanças / Fazenda de [CIDADE_IMOVEL]
         Data de emissão: [DATA_CERTIDAO_MUNICIPAL]
         Observação: diferente da certidão de quitação de IPTU — esta abrange todos os débitos municipais do contribuinte.

3.4. Certidões de Ações Trabalhistas
     [ ] Certidão Negativa de Débitos Trabalhistas (CNDT)
         Emitida por: Tribunal Superior do Trabalho (TST)
         Site: www.tst.jus.br/certidao
         Data de emissão: [DATA_CERTIDAO_TRABALHISTA]
         Observação: obrigatória por força da Lei n.º 12.440/2011.

3.5. Certidões de Protestos
     [ ] Certidão Negativa de Protestos
         Emitida por: Central de Informações de Protestos de Títulos do Estado de [UF_VENDEDOR]
         Abrangência: comarca(s) onde o vendedor tem ou teve domicílio
         Data de emissão: [DATA_CERTIDAO_PROTESTOS]

3.6. Certidões de Ações Cíveis e da Fazenda Pública
     [ ] Certidão de Distribuição de Ações Cíveis — Justiça Estadual
         Tribunal: Tribunal de Justiça de [UF_VENDEDOR]
         Abrangência: [COMARCAS_CERTIDAO_CIVEL]
         Data de emissão: [DATA_CERTIDAO_CIVEL_ESTADUAL]

     [ ] Certidão de Distribuição de Ações — Justiça Federal
         Tribunal: Tribunal Regional Federal da [TRF_REGIAO] Região
         Site: www.jf.jus.br
         Data de emissão: [DATA_CERTIDAO_FEDERAL_JUDICIAL]

3.7. Certidão de Ações da Fazenda Pública Municipal
     [ ] Certidão Negativa de Executivos Fiscais Municipais
         Município: [CIDADE_IMOVEL]
         Data de emissão: [DATA_CERTIDAO_EXECUCAO_FISCAL]

3.8. Certidão do Cadastro de Inadimplentes — CADIN (se exigível)
     [ ] Certidão de regularidade no CADIN Federal
         Emitida por: Ministério da Fazenda
         Data de emissão: [DATA_CERTIDAO_CADIN]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BLOCO 4 — DOCUMENTOS PARA LAVRATURA DA ESCRITURA PÚBLICA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

4.1. ITBI — Guia de Recolhimento do Imposto
     [ ] Guia de pagamento do ITBI (Imposto sobre Transmissão de Bens Imóveis) devidamente recolhida
         Município competente: [CIDADE_IMOVEL]
         Valor do ITBI: R$ [VALOR_ITBI] (alíquota de [ALIQUOTA_ITBI]% sobre R$ [BASE_CALCULO_ITBI])
         Data de recolhimento: [DATA_RECOLHIMENTO_ITBI]
         Número da guia: [NUMERO_GUIA_ITBI]
         Observação: o ITBI é de responsabilidade do(a) comprador(a), salvo disposição contratual em contrário. A guia deve ser recolhida antes da lavratura da escritura.

4.2. Comprovante de Pagamento das Custas Cartorárias de Escritura
     [ ] Comprovante de pagamento dos emolumentos devidos ao Cartório de Notas
         Cartório de Notas: [CARTORIO_NOTAS]
         Valor: R$ [VALOR_EMOLUMENTOS_NOTAS]
         Data de pagamento: [DATA_PAGAMENTO_EMOLUMENTOS]

4.3. Comprovante de Pagamento das Custas de Registro
     [ ] Comprovante de pagamento das custas devidas ao Cartório de Registro de Imóveis
         Cartório de Registro: [CARTORIO_REGISTRO_IMOVEIS]
         Valor: R$ [VALOR_EMOLUMENTOS_REGISTRO]
         Data de pagamento: [DATA_PAGAMENTO_REGISTRO]

4.4. Laudêmio (se aplicável — imóveis em terrenos de marinha ou de enfiteuse)
     [ ] Guia de pagamento do laudêmio
         Órgão emissor: [ORGAO_LAUDEMIO] (ex.: Secretaria do Patrimônio da União — SPU)
         Valor: R$ [VALOR_LAUDEMIO]
         Data de recolhimento: [DATA_RECOLHIMENTO_LAUDEMIO]
         Observação: exigível para imóveis situados em áreas de domínio da União ou em enfiteuses municipais. Verificar com a SPU ou Prefeitura.

4.5. Certidão de Valor Venal atualizada (emitida pela Prefeitura)
     [ ] Certidão de Valor Venal do Imóvel para fins de ITBI
         Data de emissão: [DATA_CERTIDAO_VALOR_VENAL]
         Valor venal declarado: R$ [VALOR_VENAL_IMOVEL]

4.6. Declaração do IR — Comprovante de Declaração de Ganho de Capital
     [ ] Comprovante de apuração e recolhimento do ganho de capital pelo vendedor (GCAP)
         Valor do ganho de capital apurado: R$ [VALOR_GANHO_CAPITAL]
         DARF recolhida: [ ] Sim  [ ] Isento (verificar enquadramento legal)
         Data de recolhimento: [DATA_RECOLHIMENTO_GCAP]
         Observação: a apuração e o recolhimento do imposto sobre ganho de capital (IR — alíquotas de 15% a 22,5%) são obrigações do vendedor, a serem cumpridas até o último dia útil do mês seguinte ao da operação, conforme Lei n.º 13.259/2016. Verificar isenções aplicáveis (único imóvel, reinvestimento em 180 dias, etc.).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BLOCO 5 — DOCUMENTOS ADICIONAIS (CASOS ESPECÍFICOS)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

5.1. Imóvel com Financiamento em Aberto (alienação fiduciária ou hipoteca)
     [ ] Termo de Quitação e autorização para baixa do ônus junto ao Cartório de Registro
     [ ] Certidão de cancelamento de hipoteca/alienação fiduciária (após quitação)
         Instituição financeira: [NOME_INSTITUICAO]
         Número do contrato: [NUMERO_CONTRATO_FINANCIAMENTO]
         Data de quitação: [DATA_QUITACAO_FINANCIAMENTO]

5.2. Imóvel Recebido por Herança (inventário)
     [ ] Formal de partilha ou carta de adjudicação registrada na matrícula do imóvel
     [ ] Certidão de pagamento do ITCMD (Imposto de Transmissão Causa Mortis e Doação)
         Valor do ITCMD: R$ [VALOR_ITCMD]
         Data de recolhimento: [DATA_RECOLHIMENTO_ITCMD]

5.3. Imóvel Recebido por Doação
     [ ] Escritura de doação registrada na matrícula
     [ ] Certidão de pagamento do ITCMD
         Data de recolhimento: [DATA_RECOLHIMENTO_ITCMD_DOACAO]

5.4. Imóvel com Usucapião ou Regularização Fundiária
     [ ] Sentença de usucapião transitada em julgado e registrada
     [ ] Certidão emitida no âmbito da regularização fundiária (Reurb), se aplicável

5.5. Imóvel Rural ou com Fração Rural
     [ ] Certidão de Cadastro de Imóvel Rural (CCIR) — emitida pelo INCRA
         Número do CCIR: [NUMERO_CCIR]
         Data de emissão: [DATA_EMISSAO_CCIR]
     [ ] Comprovante de pagamento do ITR (Imposto sobre a Propriedade Territorial Rural) dos últimos 5 exercícios
     [ ] Certificado de Cadastro de Imóvel Rural (CAR) — Sistema Nacional de Cadastro Ambiental Rural

5.6. Imóvel Comercial ou Industrial
     [ ] Alvará de funcionamento / licença de operação (se transferido junto com o imóvel)
     [ ] Licenças ambientais, se aplicável

5.7. Procuração (se o vendedor não puder comparecer pessoalmente ao cartório)
     [ ] Procuração pública por instrumento público com poderes específicos para alienação do imóvel
         Outorgante: [NOME_OUTORGANTE]
         Outorgado(a): [NOME_OUTORGADO]
         Cartório onde lavrada: [CARTORIO_PROCURACAO]
         Data de lavratura: [DATA_PROCURACAO]
         Observação: a procuração deve estar dentro do prazo de validade exigido pelo cartório de notas. Procurações passadas no exterior devem ser apostiladas.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTROLE E RESPONSÁVEIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Responsável pelo levantamento dos documentos do vendedor: [RESPONSAVEL_DOCS_VENDEDOR]
Responsável pelo levantamento dos documentos do comprador: [RESPONSAVEL_DOCS_COMPRADOR]
Corretor(a) de imóveis responsável: [NOME_CORRETOR] — CRECI n.º [NUMERO_CRECI]
Advogado(a) responsável (se houver): [NOME_ADVOGADO] — OAB n.º [NUMERO_OAB]

Data de verificação final dos documentos: [DATA_VERIFICACAO_FINAL]
Cartório de Notas escolhido para a escritura: [CARTORIO_NOTAS] de [CIDADE_NOTAS]
Data e horário agendados para a escritura: [DATA_HORA_ESCRITURA]

Observações gerais:
[OBSERVACOES_GERAIS]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AVISO LEGAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Este checklist tem caráter orientativo e não substitui a análise jurídica por advogado especializado nem a orientação específica do Tabelião de Notas responsável pela escritura. Os documentos exigidos podem variar conforme a comarca, o cartório, as características do imóvel e a legislação municipal aplicável. Prazos de validade das certidões devem ser confirmados diretamente com o cartório de notas antes de seu requerimento.
`,
};

export default checklistDocumentos;
