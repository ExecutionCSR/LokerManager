import { IArmario } from '@/types/armario';
import { ILocker } from '@/types/locker';

export const armariosMock: IArmario[] = [
    {
        id: 1,
        codigo: 'A-01',
        descricao: 'Armário corredor A',
        setor: 'TI',
        status: 'OCUPADO',
        responsavel: 'João Silva',
    },
    {
        id: 2,
        codigo: 'A-02',
        descricao: 'Armário corredor A',
        setor: 'RH',
        status: 'DISPONIVEL',
    },
    {
        id: 3,
        codigo: 'B-01',
        descricao: 'Armário corredor B',
        setor: 'Financeiro',
        status: 'MANUTENCAO',
    },
];

export const lockersMock: ILocker[] = [
    {
        id: 1,
        numero: '001',
        status: 'OCUPADO',
        funcionario: 'Stefany',
        email: 'stefany@empresa.com',
        avatar: 'https://i.pravatar.cc/80?img=32',
    },
    { id: 2, numero: '002', status: 'LIVRE' },
    { id: 3, numero: '003', status: 'LIVRE' },
    { id: 4, numero: '004', status: 'LIVRE' },
    { id: 5, numero: '005', status: 'LIVRE' },
    { id: 6, numero: '006', status: 'LIVRE' },
    { id: 7, numero: '007', status: 'LIVRE' },
    { id: 8, numero: '008', status: 'LIVRE' },
    { id: 9, numero: '009', status: 'LIVRE' },
    { id: 10, numero: '010', status: 'LIVRE' },
    { id: 11, numero: '011', status: 'LIVRE' },
    { id: 12, numero: '012', status: 'LIVRE' },
];