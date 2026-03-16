export type TArmarioStatus = 'DISPONIVEL' | 'OCUPADO' | 'MANUTENCAO';

export interface IArmario {
  id: number;
  codigo: string;
  descricao: string;
  setor: string;
  status: TArmarioStatus;
  responsavel?: string;
}