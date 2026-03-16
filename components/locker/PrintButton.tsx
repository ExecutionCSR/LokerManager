'use client';

export function PrintButton() {
    return (
        <button
            onClick={() => window.print()}
            className="rounded-2xl bg-[#0b3a6f] px-5 py-3 text-sm font-semibold text-white"
        >
            Imprimir
        </button>
    );
}