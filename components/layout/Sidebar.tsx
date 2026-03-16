import Link from 'next/link';

export function Sidebar() {
    return (
        <aside className="flex min-h-screen flex-col justify-between bg-[#032b57] text-white">
            <div>
                <div className="flex h-20 items-center border-b border-white/10 px-6">
                    <p className="text-lg font-bold tracking-tight">LockerManager</p>
                </div>

                <nav className="space-y-2 p-4">
                    <Link
                        href="/"
                        className="block rounded-xl px-4 py-3 text-sm font-semibold transition hover:bg-[#0a3c71]"
                    >
                        Dashboard
                    </Link>

                    <Link
                        href="/funcionarios"
                        className="block rounded-xl px-4 py-3 text-sm font-semibold transition hover:bg-[#0a3c71]"
                    >
                        Funcionários
                    </Link>

                    <Link
                        href="/armarios"
                        className="block rounded-xl px-4 py-3 text-sm font-semibold transition hover:bg-[#0a3c71]"
                    >
                        Armários
                    </Link>
                </nav>
            </div>

            <div className="border-t border-white/10 p-4">
                <div className="rounded-2xl bg-white/5 p-3">
                    <p className="text-sm font-semibold">Administrador</p>
                    <p className="mt-1 text-xs text-white/60">admin@empresa.com</p>
                </div>
            </div>
        </aside>
    );
}