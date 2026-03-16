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

interface ILocker {
    id: number;
    numero: string;
    status: 'LIVRE' | 'OCUPADO';
    employeeId?: number | null;
    employee?: IEmployee | null;
}

export default function ArmariosPage() {
    const [lockers, setLockers] = useState<ILocker[]>([]);
    const [employees, setEmployees] = useState<IEmployee[]>([]);
    const [numero, setNumero] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    async function loadLockers() {
        const response = await fetch('/api/armarios', { cache: 'no-store' });
        const data = await response.json();
        setLockers(data);
    }

    async function loadEmployees() {
        const response = await fetch('/api/funcionarios', { cache: 'no-store' });
        const data = await response.json();
        setEmployees(data);
    }

    useEffect(() => {
        loadLockers();
        loadEmployees();
    }, []);

    function resetForm() {
        setNumero('');
        setEmployeeId('');
        setEditingId(null);
    }

    function handleEdit(locker: ILocker) {
        setEditingId(locker.id);
        setNumero(locker.numero);
        setEmployeeId(locker.employeeId ? String(locker.employeeId) : '');
    }

    async function handleDelete(locker: ILocker) {
        const confirmed = window.confirm(
            `Deseja realmente excluir o armário #${locker.numero}?`
        );

        if (!confirmed) return;

        const response = await fetch(`/api/armarios/${locker.id}`, {
            method: 'DELETE',
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.error || 'Erro ao excluir armário.');
            return;
        }

        loadLockers();
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!numero.trim()) return;

        setLoading(true);

        const url =
            editingId !== null ? `/api/armarios/${editingId}` : '/api/armarios';

        const method = editingId !== null ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                numero,
                employeeId: employeeId || null,
            }),
        });

        const data = await response.json();
        setLoading(false);

        if (!response.ok) {
            alert(data.error || 'Erro ao salvar armário.');
            return;
        }

        resetForm();
        loadLockers();
    }

    return (
        <main className="min-h-screen bg-[#f6f8fb] text-slate-900">
            <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[220px_1fr]">
                <Sidebar />

                <section className="p-6">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h1 className="text-3xl font-black tracking-tight text-slate-900">
                            Cadastro de Armários
                        </h1>

                        <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
                            <input
                                value={numero}
                                onChange={(e) => setNumero(e.target.value)}
                                placeholder="Número do armário"
                                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                            />

                            <select
                                value={employeeId}
                                onChange={(e) => setEmployeeId(e.target.value)}
                                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                            >
                                <option value="">Nenhum funcionário vinculado</option>
                                {employees.map((employee) => (
                                    <option key={employee.id} value={employee.id}>
                                        {employee.nome} - {employee.setor}
                                    </option>
                                ))}
                            </select>

                            <div className="md:col-span-2 flex gap-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="rounded-2xl bg-[#0b3a6f] px-5 py-3 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-50"
                                >
                                    {loading
                                        ? 'Salvando...'
                                        : editingId !== null
                                            ? 'Atualizar Armário'
                                            : 'Cadastrar Armário'}
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
                        <h2 className="text-xl font-bold text-slate-900">Armários cadastrados</h2>

                        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
                            <table className="min-w-full divide-y divide-slate-200 text-sm">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-semibold text-slate-600">Número</th>
                                        <th className="px-4 py-3 text-left font-semibold text-slate-600">Status</th>
                                        <th className="px-4 py-3 text-left font-semibold text-slate-600">Foto</th>
                                        <th className="px-4 py-3 text-left font-semibold text-slate-600">Funcionário</th>
                                        <th className="px-4 py-3 text-left font-semibold text-slate-600">E-mail</th>
                                        <th className="px-4 py-3 text-left font-semibold text-slate-600">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                    {lockers.map((locker) => (
                                        <tr key={locker.id}>
                                            <td className="px-4 py-4 font-medium text-slate-900">#{locker.numero}</td>
                                            <td className="px-4 py-4 text-slate-600">{locker.status}</td>
                                            <td className="px-4 py-4">
                                                {locker.employee?.avatar ? (
                                                    <img
                                                        src={locker.employee.avatar}
                                                        alt={locker.employee.nome}
                                                        className="h-10 w-10 rounded-full border border-slate-200 object-cover"
                                                    />
                                                ) : (
                                                    <div className="h-10 w-10 rounded-full border border-slate-200 bg-slate-50" />
                                                )}
                                            </td>
                                            <td className="px-4 py-4 text-slate-600">
                                                {locker.employee?.nome || 'Não associado'}
                                            </td>
                                            <td className="px-4 py-4 text-slate-600">
                                                {locker.employee?.email || '-'}
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEdit(locker)}
                                                        className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                                                    >
                                                        Editar
                                                    </button>

                                                    <button
                                                        onClick={() => handleDelete(locker)}
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