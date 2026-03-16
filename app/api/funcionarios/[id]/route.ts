import { prisma } from '@/lib/prisma';

interface RouteContext {
    params: Promise<{ id: string }>;
}

export async function PUT(request: Request, context: RouteContext) {
    try {
        const { id } = await context.params;
        const employeeId = Number(id);

        if (!employeeId) {
            return Response.json({ error: 'ID inválido.' }, { status: 400 });
        }

        const body = await request.json();
        const { nome, email, setor, avatar } = body;

        if (!nome || !email || !setor) {
            return Response.json(
                { error: 'Nome, e-mail e setor são obrigatórios.' },
                { status: 400 }
            );
        }

        const employee = await prisma.employee.update({
            where: { id: employeeId },
            data: {
                nome: String(nome).trim(),
                email: String(email).trim().toLowerCase(),
                setor: String(setor).trim(),
                avatar: avatar ? String(avatar).trim() : null,
            },
        });

        return Response.json(employee);
    } catch (error) {
        const message =
            error instanceof Error ? error.message : 'Erro ao atualizar funcionário.';

        return Response.json({ error: message }, { status: 500 });
    }
}

export async function DELETE(_: Request, context: RouteContext) {
    try {
        const { id } = await context.params;
        const employeeId = Number(id);

        if (!employeeId) {
            return Response.json({ error: 'ID inválido.' }, { status: 400 });
        }

        await prisma.locker.updateMany({
            where: { employeeId },
            data: {
                employeeId: null,
                status: 'LIVRE',
            },
        });

        await prisma.employee.delete({
            where: { id: employeeId },
        });

        return Response.json({ success: true });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : 'Erro ao excluir funcionário.';

        return Response.json({ error: message }, { status: 500 });
    }
}