export type Especialidade =
  | 'dermatologia'
  | 'cardiologia'
  | 'ortopedia'
  | 'pediatria'
  | 'ginecologia'
  | 'neurologia'
  | 'psiquiatria'
  | 'oftalmologia'
  | 'odontologia'
  | 'nutrição'
  | 'cirurgia plastica'
  | 'medicina estetica'
  | 'endocrinologia'
  | 'urologia'
  | 'outra';

export type Plataforma = 'instagram' | 'tiktok' | 'youtube' | 'linkedin';

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
  tom: 'educativo' | 'acessivel' | 'tecnico' | 'humanizado' | 'descontraido';
  plataformas: Plataforma[];
  instagramHandle: string;
  seguidores: number;
  mediaLikes: number;
  mediaSaves: number;
  descricao: string;
  concorrentes: string[];
}
