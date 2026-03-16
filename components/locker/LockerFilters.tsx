interface LockerFiltersProps {
    search: string;
    statusFilter: 'TODOS' | 'LIVRE' | 'OCUPADO';
    livres: number;
    ocupados: number;
    onSearchChange: (value: string) => void;
    onStatusChange: (value: 'TODOS' | 'LIVRE' | 'OCUPADO') => void;
}

export function LockerFilters({
    search,
    statusFilter,
    livres,
    ocupados,
    onSearchChange,
    onStatusChange,
}: LockerFiltersProps) {
    return (
        <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_2px_10px_rgba(15,23,42,0.03)]">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Buscar por número, nome ou e-mail..."
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
                    />
                </div>

                <div className="inline-flex rounded-2xl bg-slate-100 p-1 text-sm font-semibold text-slate-600">
                    <button
                        onClick={() => onStatusChange('TODOS')}
                        className={`rounded-xl px-4 py-2 ${statusFilter === 'TODOS' ? 'bg-white text-slate-900 shadow-sm' : ''
                            }`}
                    >
                        Todos
                    </button>

                    <button
                        onClick={() => onStatusChange('LIVRE')}
                        className={`rounded-xl px-4 py-2 ${statusFilter === 'LIVRE' ? 'bg-white text-slate-900 shadow-sm' : ''
                            }`}
                    >
                        Livres {livres}
                    </button>

                    <button
                        onClick={() => onStatusChange('OCUPADO')}
                        className={`rounded-xl px-4 py-2 ${statusFilter === 'OCUPADO' ? 'bg-white text-slate-900 shadow-sm' : ''
                            }`}
                    >
                        Ocupados {ocupados}
                    </button>
                </div>
            </div>
        </div>
    );
}