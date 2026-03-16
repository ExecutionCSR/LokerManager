import { prisma } from '@/lib/prisma';

interface LockerStatusPageProps {
    params: Promise<{ id: string }>;
}

export default async function LockerStatusPage({
    params,
}: LockerStatusPageProps) {
    const { id } = await params;
    const lockerId = Number(id);

    const locker = await prisma.locker.findUnique({
        where: { id: lockerId },
        include: {
            employee: true,
        },
    });

    if (!locker) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#f6f8fb] p-6">
                <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                    <h1 className="text-2xl font-black text-slate-900">
                        Armário não encontrado
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                        O armário informado não existe ou foi removido.
                    </p>
                </div>
            </main>
        );
    }

    const employeeAvatar =
        locker.employee?.avatar ||
        (locker.employee?.email
            ? `https://i.pravatar.cc/160?u=${encodeURIComponent(locker.employee.email)}`
            : null);

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#f6f8fb] p-6">
            <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Armário
                </p>

                <h1 className="mt-2 text-4xl font-black text-slate-900">
                    #{locker.numero}
                </h1>

                <div className="mt-6 space-y-4">
                    <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Status
                        </p>
                        <p className="mt-2 text-lg font-bold text-slate-900">
                            {locker.status}
                        </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Funcionário vinculado
                        </p>

                        {locker.employee ? (
                            <div className="mt-3 flex items-center gap-3">
                                {employeeAvatar && (
                                    <img
                                        src={employeeAvatar}
                                        alt={locker.employee.nome}
                                        className="h-14 w-14 rounded-full border border-slate-200 object-cover"
                                    />
                                )}

                                <div className="min-w-0">
                                    <p className="text-lg font-bold text-slate-900">
                                        {locker.employee.nome}
                                    </p>
                                    <p className="truncate text-sm text-slate-500">
                                        {locker.employee.email}
                                    </p>
                                    <p className="mt-1 text-xs text-slate-400">
                                        Setor: {locker.employee.setor}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <p className="mt-2 text-lg font-bold text-slate-900">
                                Não associado
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}