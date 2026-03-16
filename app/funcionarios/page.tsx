'use client';

import { useEffect, useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';

interface IEmployee {
    id: number;
    nome: string;
    email: string;
    setor: string;
    avatar?: string | null;
}

export default function FuncionariosPage() {
    const [employees, setEmployees] = useState<IEmployee[]>([]);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [setor, setSetor] = useState('');
    const [avatar, setAvatar] = useState('');
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    async function loadEmployees() {
        const response = await fetch('/api/funcionarios', { cache: 'no-store' });
        const data = await response.json();
        setEmployees(data);
    }

    useEffect(() => {
        loadEmployees();
    }, []);

    function resetForm() {
        setNome('');
        setEmail('');
        setSetor('');
        setAvatar('');
        setEditingId(null);
    }

    function handleEdit(employee: IEmployee) {
        setEditingId(employee.id);
        setNome(employee.nome);
        setEmail(employee.email);
        setSetor(employee.setor);
        setAvatar(employee.avatar || '');
    }

    async function handleDelete(employee: IEmployee) {
        const confirmed = window.confirm(
            `Deseja realmente excluir o funcionário ${employee.nome}?`
        );

        if (!confirmed) return;

        const response = await fetch(`/api/funcionarios/${employee.id}`, {
            method: 'DELETE',
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.error || 'Erro ao excluir funcionário.');
            return;
        }

        loadEmployees();
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!nome.trim() || !email.trim() || !setor.trim()) return;

        setLoading(true);

        const url =
            editingId !== null
                ? `/api/funcionarios/${editingId}`
                : '/api/funcionarios';

        const method = editingId !== null ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nome,
                email,
                setor,
                avatar,
            }),
        });

        const data = await response.json();
        setLoading(false);

        if (!response.ok) {
            alert(data.error || 'Erro ao salvar funcionário.');
            return;
        }

        resetForm();
        loadEmployees();
    }

    return (
        <main className="min-h-screen bg-[#f6f8fb] text-slate-900">
            <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[220px_1fr]">
                <Sidebar />

                <section className="p-6">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h1 className="text-3xl font-black tracking-tight text-slate-900">
                            Cadastro de Funcionários
                        </h1>

                        <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
                            <input
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                placeholder="Nome"
                                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                            />

                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="E-mail"
                                type="email"
                                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                            />

                            <input
                                value={setor}
                                onChange={(e) => setSetor(e.target.value)}
                                placeholder="Setor"
                                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                            />

                            <input
                                value={avatar}
                                onChange={(e) => setAvatar(e.target.value)}
                                placeholder="URL da foto"
                                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                            />

                            <div className="md:col-span-2 flex gap-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="rounded-2xl bg-[#0b3a6f] px-5 py-3 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-50"
                                >
                                    {loading
                                        ? 'Salvando...'
                                        : editingId !== null
                                            ? 'Atualizar Funcionário'
                                            : 'Cadastrar Funcionário'}
                                </button>

                                {editingId !== null && (
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                                    >
                                        Cancelar edição
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-900">Funcionários cadastrados</h2>

                        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
                            <table className="min-w-full divide-y divide-slate-200 text-sm">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-semibold text-slate-600">Foto</th>
                                        <th className="px-4 py-3 text-left font-semibold text-slate-600">Nome</th>
                                        <th className="px-4 py-3 text-left font-semibold text-slate-600">E-mail</th>
                                        <th className="px-4 py-3 text-left font-semibold text-slate-600">Setor</th>
                                        <th className="px-4 py-3 text-left font-semibold text-slate-600">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                    {employees.map((employee) => (
                                        <tr key={employee.id}>
                                            <td className="px-4 py-4">
                                                <img
                                                    src={employee.avatar || `https://i.pravatar.cc/80?u=${employee.email}`}
                                                    alt={employee.nome}
                                                    className="h-10 w-10 rounded-full border border-slate-200 object-cover"
                                                />
                                            </td>
                                            <td className="px-4 py-4 font-medium text-slate-900">{employee.nome}</td>
                                            <td className="px-4 py-4 text-slate-600">{employee.email}</td>
                                            <td className="px-4 py-4 text-slate-600">{employee.setor}</td>
                                            <td className="px-4 py-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEdit(employee)}
                                                        className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                                                    >
                                                        Editar
                                                    </button>

                                                    <button
                                                        onClick={() => handleDelete(employee)}
                                                        className="rounded-xl border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                                                    >
                                                        Excluir
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}