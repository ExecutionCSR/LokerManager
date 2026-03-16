interface HeaderProps {
  total: number;
  ocupados: number;
  livres: number;
}

export function Header({ total, ocupados, livres }: HeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white px-4 py-4 md:px-6 md:py-6">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-2xl font-black tracking-tight text-slate-900 md:text-[34px]">
            Gerenciamento de Armários
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Controle de associação de funcionários aos armários corporativos
          </p>
        </div>

        <button className="shrink-0 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
          Atualizar
        </button>
      </div>

      <div className="mt-4 overflow-x-auto">
        <div className="flex min-w-max gap-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
            {total} total
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
            {ocupados} ocupados
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
            {livres} livres
          </div>
        </div>
      </div>
    </header>
  );
}