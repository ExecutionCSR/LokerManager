export type TLockerStatus = 'LIVRE' | 'OCUPADO';

export interface ILocker {
  id: number;
  numero: string;
  status: TLockerStatus;
  funcionario?: string;
  email?: string;
  qrCode?: string;
  avatar?: string;
}