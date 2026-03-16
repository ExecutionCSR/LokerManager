import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return NextResponse.json(
                { error: 'Arquivo não enviado.' },
                { status: 400 }
            );
        }

        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: 'Formato inválido. Use JPG, PNG ou WEBP.' },
                { status: 400 }
            );
        }

        const maxSizeInBytes = 2 * 1024 * 1024;

        if (file.size > maxSizeInBytes) {
            return NextResponse.json(
                { error: 'Arquivo muito grande. Limite de 2 MB.' },
                { status: 400 }
            );
        }

        const extension = file.name.split('.').pop() || 'jpg';
        const safeName = file.name
            .replace(/\.[^/.]+$/, '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');

        const pathname = `funcionarios/${Date.now()}-${safeName}.${extension}`;

        const blob = await put(pathname, file, {
            access: 'public',
            addRandomSuffix: false,
        });

        return NextResponse.json({
            url: blob.url,
            pathname: blob.pathname,
        });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : 'Erro ao fazer upload da imagem.';

        return NextResponse.json({ error: message }, { status: 500 });
    }
}