interface HeaderProps {
  total: number;
  ocupados: number;
  livres: number;
}

export function Header({ total, ocupados, livres }: HeaderProps) {
  return (
    <header className="flex items-start justify-between gap-4 border-b border-slate-200 bg-white px-6 py-6">
      <div>
        <h1 className="text-[34px] font-black tracking-tight text-slate-900">
          Gerenciamento de Armários
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Controle de associação de funcionários aos armários corporativos
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
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

      <button className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
        Atualizar
      </button>
    </header>
  );
}