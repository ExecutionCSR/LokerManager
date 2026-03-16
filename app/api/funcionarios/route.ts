import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const employees = await prisma.employee.findMany({
            orderBy: { nome: 'asc' },
        });

        return Response.json(employees);
    } catch {
        return Response.json(
            { error: 'Erro ao buscar funcionários.' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { nome, email, setor, avatar } = body;

        if (!nome || !email || !setor) {
            return Response.json(
                { error: 'Nome, e-mail e setor são obrigatórios.' },
                { status: 400 }
            );
        }

        const employee = await prisma.employee.create({
            data: {
                nome: String(nome).trim(),
                email: String(email).trim().toLowerCase(),
                setor: String(setor).trim(),
                avatar: avatar ? String(avatar).trim() : null,
            },
        });

        return Response.json(employee, { status: 201 });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : 'Erro ao cadastrar funcionário.';

        return Response.json({ error: message }, { status: 500 });
    }
}