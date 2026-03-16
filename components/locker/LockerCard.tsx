import { LockerQrCode } from './LockerQrCode';
import Link from 'next/link';

interface IEmployee {
    id: number;
    nome: string;
    email: string;
    setor: string;
    avatar?: string | null;
}

interface ILocker {
    id: number;
    numero: string;
    status: 'LIVRE' | 'OCUPADO';
    employeeId?: number | null;
    employee?: IEmployee | null;
}

interface LockerCardProps {
    locker: ILocker;
    onAssociate: (locker: ILocker) => void;
    onRemove: (locker: ILocker) => void;
}

export function LockerCard({ locker, onAssociate, onRemove }: LockerCardProps) {
    const isLivre = locker.status === 'LIVRE';

    return (
        <div className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-[0_2px_10px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Armário
                    </p>
                    <h3 className="mt-1 text-3xl font-black tracking-tight text-slate-900">
                        #{locker.numero}
                    </h3>
                </div>

                <span
                    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${isLivre
                        ? 'border-slate-200 bg-slate-50 text-slate-500'
                        : 'border-blue-200 bg-blue-50 text-blue-700'
                        }`}
                >
                    {isLivre ? 'Livre' : 'Ocupado'}
                </span>
            </div>

            <div className="mt-4 flex justify-center">
                <LockerQrCode
                    value={`${process.env.NEXT_PUBLIC_APP_URL || ''}/armarios/${locker.id}/status`}
                />
            </div>

            <div className="mt-5 min-h-[56px] rounded-2xl border border-dashed border-slate-200 px-3 py-3">
                {isLivre ? (
                    <div className="flex items-center gap-3 text-slate-500">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-sm">
                            +
                        </div>

                        <div>
                            <p className="text-sm font-medium">Armário disponível</p>
                            <p className="text-xs text-slate-400">Aguardando associação</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <img
                            src={
                                locker.employee?.avatar ||
                                `https://i.pravatar.cc/80?u=${locker.employee?.email || locker.numero}`
                            }
                            alt={locker.employee?.nome || 'Funcionário'}
                            className="h-10 w-10 rounded-full border border-slate-200 object-cover"
                        />

                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-900">
                                {locker.employee?.nome}
                            </p>
                            <p className="truncate text-xs text-slate-500">
                                {locker.employee?.email}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-4 flex gap-2">
                {isLivre ? (
                    <button
                        onClick={() => onAssociate(locker)}
                        className="flex-1 rounded-xl bg-[#0b3a6f] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95"
                    >
                        Associar Funcionário
                    </button>
                ) : (
                    <>
                        <button
                            onClick={() => onAssociate(locker)}
                            className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                            Alterar
                        </button>

                        <button
                            onClick={() => onRemove(locker)}
                            className="rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                        >
                            ×
                        </button>
                    </>
                )}
            </div>
            <div className="mt-2">
                <Link
                    href={`/armarios/${locker.id}/print`}
                    target="_blank"
                    className="block w-full rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                    Imprimir QR
                </Link>
            </div>
        </div>
    );
}