import { LockerStatus } from '@prisma/client';
import { prisma } from '@/lib/prisma';

interface RouteContext {
    params: Promise<{ id: string }>;
}

export async function PUT(request: Request, context: RouteContext) {
    try {
        const { id } = await context.params;
        const lockerId = Number(id);

        if (!lockerId) {
            return Response.json({ error: 'ID inválido.' }, { status: 400 });
        }

        const body = await request.json();
        const { numero, employeeId } = body;

        if (!numero) {
            return Response.json(
                { error: 'Número do armário é obrigatório.' },
                { status: 400 }
            );
        }

        const parsedEmployeeId =
            employeeId && String(employeeId).trim() !== ''
                ? Number(employeeId)
                : null;

        const locker = await prisma.locker.update({
            where: { id: lockerId },
            data: {
                numero: String(numero).trim(),
                employeeId: parsedEmployeeId,
                status: parsedEmployeeId ? LockerStatus.OCUPADO : LockerStatus.LIVRE,
            },
            include: {
                employee: true,
            },
        });

        return Response.json(locker);
    } catch (error) {
        const message =
            error instanceof Error ? error.message : 'Erro ao atualizar armário.';

        return Response.json({ error: message }, { status: 500 });
    }
}

export async function DELETE(_: Request, context: RouteContext) {
    try {
        const { id } = await context.params;
        const lockerId = Number(id);

        if (!lockerId) {
            return Response.json({ error: 'ID inválido.' }, { status: 400 });
        }

        await prisma.locker.delete({
            where: { id: lockerId },
        });

        return Response.json({ success: true });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : 'Erro ao excluir armário.';

        return Response.json({ error: message }, { status: 500 });
    }
}