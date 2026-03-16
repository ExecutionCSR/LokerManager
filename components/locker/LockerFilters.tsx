interface LockerFiltersProps {
    livres: number;
    ocupados: number;
}

export function LockerFilters({ livres, ocupados }: LockerFiltersProps) {
    return (
        <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_2px_10px_rgba(15,23,42,0.03)]">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Buscar por número ou funcionário..."
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
                    />
                </div>

                <div className="inline-flex rounded-2xl bg-slate-100 p-1 text-sm font-semibold text-slate-600">
                    <button className="rounded-xl bg-white px-4 py-2 text-slate-900 shadow-sm">
                        Todos
                    </button>
                    <button className="rounded-xl px-4 py-2">Livres {livres}</button>
                    <button className="rounded-xl px-4 py-2">Ocupados {ocupados}</button>
                </div>
            </div>
        </div>
    );
}