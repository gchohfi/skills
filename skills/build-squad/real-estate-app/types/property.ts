export interface Address {
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

export interface PropertyProfile {
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  tipo: 'casa' | 'apartamento' | 'terreno' | 'comercial';
  quartos: number;
  banheiros: number;
  areaUtil: number;
  areaTotal: number;
  vagas: number;
  andarPavimento?: string;
  condominio?: number;
  iptu?: number;
  precoDesejado: number;
  caracteristicas: string[];
  descricao: string;
  fotos: string[];
}
