'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
    const pathname = usePathname();

    function getLinkClass(href: string) {
        const isActive = pathname === href;

        return `block rounded-xl px-4 py-3 text-sm font-semibold whitespace-nowrap transition ${isActive
                ? 'bg-[#0a3c71] text-white'
                : 'text-white hover:bg-[#0a3c71]'
            }`;
    }

    return (
        <aside className="bg-[#032b57] text-white lg:min-h-screen">
            <div className="flex flex-col lg:min-h-screen lg:flex-col lg:justify-between">
                <div>
                    <div className="flex h-auto items-center justify-between border-b border-white/10 px-4 py-4 lg:h-20 lg:justify-start lg:px-6">
                        <p className="text-lg font-bold tracking-tight">LockerManager</p>
                    </div>

                    <nav className="overflow-x-auto px-2 py-2 lg:px-4 lg:py-4">
                        <div className="flex min-w-max gap-2 lg:block lg:min-w-0 lg:space-y-2">
                            <Link href="/" className={getLinkClass('/')}>
                                Dashboard
                            </Link>

                            <Link href="/funcionarios" className={getLinkClass('/funcionarios')}>
                                Funcionários
                            </Link>

                            <Link href="/armarios" className={getLinkClass('/armarios')}>
                                Armários
                            </Link>
                        </div>
                    </nav>
                </div>

                <div className="hidden border-t border-white/10 p-4 lg:block">
                    <div className="rounded-2xl bg-white/5 p-3">
                        <p className="text-sm font-semibold">Administrador</p>
                        <p className="mt-1 text-xs text-white/60">admin@empresa.com</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}