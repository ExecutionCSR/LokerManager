import { LockerStatus } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const lockers = await prisma.locker.findMany({
            include: {
                employee: true,
            },
            orderBy: { numero: 'asc' },
        });

        return Response.json(lockers);
    } catch {
        return Response.json(
            { error: 'Erro ao buscar armários.' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { numero, employeeId } = body;

        if (!numero) {
            return Response.json(
                { error: 'Número do armário é obrigatório.' },
                { status: 400 }
            );
        }

        const employeeIdNumber =
            employeeId && String(employeeId).trim() !== ''
                ? Number(employeeId)
                : null;

        const locker = await prisma.locker.create({
            data: {
                numero: String(numero).trim(),
                status: employeeIdNumber ? LockerStatus.OCUPADO : LockerStatus.LIVRE,
                employeeId: employeeIdNumber,
            },
            include: {
                employee: true,
            },
        });

        return Response.json(locker, { status: 201 });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : 'Erro ao cadastrar armário.';

        return Response.json({ error: message }, { status: 500 });
    }
}