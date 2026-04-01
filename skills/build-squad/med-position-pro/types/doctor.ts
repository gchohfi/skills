export type Especialidade =
  | 'dermatologia'
  | 'cirurgia plastica'
  | 'medicina estetica'
  | 'ginecologia'
  | 'pediatria'
  | 'cardiologia'
  | 'ortopedia'
  | 'neurologia'
  | 'psiquiatria'
  | 'oftalmologia'
  | 'odontologia'
  | 'nutrição'
  | 'endocrinologia'
  | 'urologia'
  | 'outra';

export type Tom = 'educativo' | 'acessivel' | 'tecnico' | 'humanizado' | 'sofisticado' | 'descontraido';

export interface DoctorProfile {
  nome: string;
  crm: string;
  especialidade: Especialidade;
  subespecialidades: string[];
  cidade: string;
  estado: string;
  clinica: string;
  publicoAlvo: string;
  diferenciais: string[];
  tom: Tom;
  instagramHandle: string;
  seguidores: number;
  mediaLikes: number;
  mediaSaves: number;
  mediaComments: number;
  bio: string;
  destaques: string[];
  metodoPropio: string;
  referencias: string[];
  concorrentes: string[];
  objetivoPrincipal: string;
}

export interface ProfileScore {
  clareza: number;       // 0-10
  autoridade: number;    // 0-10
  coerencia: number;     // 0-10
  conversao: number;     // 0-10
}
