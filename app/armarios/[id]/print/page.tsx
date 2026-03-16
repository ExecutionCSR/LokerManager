import { prisma } from '@/lib/prisma';
import { getBaseUrl } from '@/lib/get-base-url';
import { QRCodeSVG } from 'qrcode.react';
import { PrintButton } from '@/components/locker/PrintButton';

interface PrintPageProps {
    params: Promise<{ id: string }>;
}

export default async function LockerPrintPage({ params }: PrintPageProps) {
    const { id } = await params;
    const lockerId = Number(id);

    const locker = await prisma.locker.findUnique({
        where: { id: lockerId },
    });

    if (!locker) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-white p-8">
                <p className="text-sm text-slate-500">Armário não encontrado.</p>
            </main>
        );
    }

    const qrUrl = `${getBaseUrl()}/armarios/${locker.id}/status`;

    return (
        <main className="flex min-h-screen items-center justify-center bg-white p-8">
            <div className="flex flex-col items-center">
                <div className="rounded-none bg-white p-0 shadow-none">
                    <QRCodeSVG value={qrUrl} size={260} />
                </div>

                <div className="mt-6 print:hidden">
                    <PrintButton />
                </div>
            </div>
        </main>
    );
}