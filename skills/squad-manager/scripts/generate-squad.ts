/**
 * Squad Generator Script
 *
 * Generates the file structure for a new squad app.
 * Usage: Provide squad config and this script outputs the file list and contents.
 *
 * This is a reference for Claude to understand the generation pattern.
 * It is NOT meant to be executed directly — Claude reads this to know
 * exactly what files to generate for each squad configuration.
 */

// ─── SQUAD CONFIG TYPE ──────────────────────────────────────────

interface SquadAgent {
  name: string;           // kebab-case: "analise-perfil"
  label: string;          // Display: "Analise de Perfil"
  icon: string;           // Emoji: "🔍"
  type: 'supervisor' | 'specialist';
  skills: string[];       // ["analise", "posicionamento", "persona"]
  apiMode: 'streaming' | 'json';  // streaming for text, json for structured output
  outputDesc: string;     // "Relatorio de posicionamento"
}

interface SquadConfig {
  appName: string;          // "medic-marketing-app"
  displayName: string;      // "Medic Marketing AI"
  entityName: string;       // "doctor" | "property" | "company"
  entityLabel: string;      // "Medico" | "Imovel" | "Empresa"
  colors: {
    sidebar: string;        // "#0a1628"
    accent: string;         // "#4ecdc4"
  };
  agents: SquadAgent[];
  compliance?: string;      // "CFM 2.336/2023" | "OAB" | null
}

// ─── FILES TO GENERATE ──────────────────────────────────────────

function getFilesToGenerate(config: SquadConfig): string[] {
  const agents = config.agents.filter(a => a.type === 'specialist');
  const supervisor = config.agents.find(a => a.type === 'supervisor');

  return [
    // Config
    'package.json',
    'tsconfig.json',
    'next.config.mjs',
    'tailwind.config.ts',
    'postcss.config.mjs',
    '.gitignore',
    'SQUAD.md',

    // Types
    `types/${config.entityName}.ts`,

    // Lib
    'lib/anthropic.ts',
    'lib/stream.ts',

    // Prompts (one per agent)
    ...config.agents.map(a => `lib/prompts/${a.name}.ts`),

    // API routes (one per agent)
    ...config.agents.map(a => `app/api/${a.name}/route.ts`),

    // Pages
    'app/globals.css',
    'app/layout.tsx',
    'app/page.tsx',          // Dashboard
    'app/setup/page.tsx',    // Entity setup form
    ...config.agents.map(a => `app/${a.name}/page.tsx`),

    // Components
    'components/layout/Sidebar.tsx',
    'components/layout/ModuleHeader.tsx',
    'components/supervisor/StatusDashboard.tsx',
    'components/ui/Button.tsx',
    'components/ui/Card.tsx',
    'components/ui/Spinner.tsx',
    'components/ui/StreamingText.tsx',

    // Context & Hooks
    `context/${capitalize(config.entityName)}Context.tsx`,
    'hooks/useLocalStorage.ts',
    'hooks/useStreamingResponse.ts',
  ];
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// ─── SQUAD CHARTER (SQUAD.md) ───────────────────────────────────

function generateSquadCharter(config: SquadConfig): string {
  const supervisor = config.agents.find(a => a.type === 'supervisor')!;
  const specialists = config.agents.filter(a => a.type === 'specialist');

  const rolesTable = config.agents
    .map((a, i) => `| ${i + 1} | **${a.label}** | ${a.type} | ${a.skills.join(', ')} | \`/api/${a.name}\` | ${a.outputDesc} |`)
    .join('\n');

  const skillMatrix = generateSkillMatrix(config);

  return `# Squad: ${config.displayName}

## Hierarquia

\`\`\`
${generateHierarchyAscii(config)}
\`\`\`

## Agentes

| # | Role | Tipo | Skills | API | Output |
|---|------|------|--------|-----|--------|
${rolesTable}

## Skill Matrix

\`\`\`
${skillMatrix}
\`\`\`

## Fluxo

${specialists.map((a, i) => `${i + 1}. ${a.label} → ${a.outputDesc}`).join('\n')}
${specialists.length + 1}. ${supervisor.label} → Visao consolidada

${config.compliance ? `## Compliance\n\n${config.compliance}` : ''}
`;
}

function generateHierarchyAscii(config: SquadConfig): string {
  const sup = config.agents.find(a => a.type === 'supervisor')!;
  const specs = config.agents.filter(a => a.type === 'specialist');
  const half = Math.ceil(specs.length / 2);
  const left = specs.slice(0, half).map(a => a.label).join('\n    ');
  const right = specs.slice(half).map(a => a.label).join('\n    ');

  return `         ${sup.label}
              |
    +---------+---------+
    |                   |
    ${left}
                        ${right}`;
}

function generateSkillMatrix(config: SquadConfig): string {
  const allSkills = [...new Set(config.agents.flatMap(a => a.skills))];
  const header = `${'Role'.padEnd(25)}${allSkills.map(s => s.padEnd(15)).join('')}`;
  const rows = config.agents.map(a => {
    const row = allSkills.map(s => (a.skills.includes(s) ? '★' : '-').padEnd(15)).join('');
    return `${a.label.padEnd(25)}${row}`;
  });
  return [header, '-'.repeat(header.length), ...rows].join('\n');
}

// ─── SUPERVISOR STATUS DATA ─────────────────────────────────────

function generateSupervisorTypes(config: SquadConfig): string {
  const specialists = config.agents.filter(a => a.type === 'specialist');
  const flags = specialists
    .map(a => `  tem${capitalize(a.name.replace(/-./g, x => x[1].toUpperCase()))}: boolean;`)
    .join('\n');

  return `export interface SupervisorStatusData {
  ${config.entityName}: ${capitalize(config.entityName)}Profile | null;
${flags}
}`;
}

// ─── EXAMPLE CONFIGS ─────────────────────────────────────────────

const MEDIC_MARKETING: SquadConfig = {
  appName: 'medic-marketing-app',
  displayName: 'Medic Marketing AI',
  entityName: 'doctor',
  entityLabel: 'Medico',
  colors: { sidebar: '#0a1628', accent: '#4ecdc4' },
  compliance: 'CFM Resolucao 2.336/2023 — tom educativo, sem promessas de cura, identificar CRM',
  agents: [
    { name: 'supervisor', label: 'Diretor de Marketing', icon: '👔', type: 'supervisor', skills: ['supervisao', 'alertas', 'prioridades'], apiMode: 'streaming', outputDesc: 'Analise consolidada' },
    { name: 'analise-perfil', label: 'Analista de Perfil', icon: '🔍', type: 'specialist', skills: ['analise', 'posicionamento', 'persona'], apiMode: 'streaming', outputDesc: 'Persona + pilares' },
    { name: 'concorrencia', label: 'Analista de Concorrencia', icon: '📊', type: 'specialist', skills: ['pesquisa', 'benchmarks'], apiMode: 'streaming', outputDesc: 'Benchmarks + gaps' },
    { name: 'tendencias', label: 'Analista de Tendencias', icon: '📈', type: 'specialist', skills: ['pesquisa', 'tendencias'], apiMode: 'streaming', outputDesc: 'Temas em alta' },
    { name: 'estrategia', label: 'Estrategista de Conteudo', icon: '📋', type: 'specialist', skills: ['planejamento', 'calendario'], apiMode: 'streaming', outputDesc: 'Plano editorial 30 dias' },
    { name: 'carrossel', label: 'Designer de Carrossel', icon: '🎨', type: 'specialist', skills: ['design-carrossel', 'copywriting'], apiMode: 'json', outputDesc: 'Roteiro JSON + preview' },
    { name: 'metricas', label: 'Analista de Metricas', icon: '📉', type: 'specialist', skills: ['metricas', 'KPIs', 'otimizacao'], apiMode: 'streaming', outputDesc: 'Diagnostico + recomendacoes' },
  ],
};

const REAL_ESTATE: SquadConfig = {
  appName: 'real-estate-app',
  displayName: 'Venda Seu Imovel com IA',
  entityName: 'property',
  entityLabel: 'Imovel',
  colors: { sidebar: '#0e6b6e', accent: '#0e6b6e' },
  compliance: 'CRECI — transparencia de precos, dados veridicos',
  agents: [
    { name: 'supervisor', label: 'Gerente Supervisor', icon: '👔', type: 'supervisor', skills: ['supervisao', 'alertas', 'prioridades'], apiMode: 'streaming', outputDesc: 'Analise consolidada' },
    { name: 'precificacao', label: 'Avaliador', icon: '💰', type: 'specialist', skills: ['analise', 'benchmarks'], apiMode: 'streaming', outputDesc: 'Faixa de preco + justificativa' },
    { name: 'anuncio', label: 'Copywriter', icon: '📝', type: 'specialist', skills: ['copywriting'], apiMode: 'streaming', outputDesc: 'Anuncio completo' },
    { name: 'marketing', label: 'Marqueteiro', icon: '📣', type: 'specialist', skills: ['planejamento', 'calendario'], apiMode: 'streaming', outputDesc: 'Estrategia de divulgacao' },
    { name: 'carrossel', label: 'Designer', icon: '🎨', type: 'specialist', skills: ['design-carrossel', 'copywriting'], apiMode: 'json', outputDesc: 'Carrossel Instagram' },
    { name: 'documentos', label: 'Assessor Juridico', icon: '📄', type: 'specialist', skills: ['revisao-legal', 'normas-creci'], apiMode: 'streaming', outputDesc: 'Documentos preenchidos' },
    { name: 'negociacao', label: 'Negociador', icon: '🤝', type: 'specialist', skills: ['analise', 'estrategia'], apiMode: 'streaming', outputDesc: 'Parecer de negociacao' },
  ],
};

export { SquadConfig, SquadAgent, MEDIC_MARKETING, REAL_ESTATE };
export { getFilesToGenerate, generateSquadCharter, generateSupervisorTypes, generateSkillMatrix };
