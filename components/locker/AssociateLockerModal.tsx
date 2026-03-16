'use client';

import { useEffect, useMemo, useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { IEmployee } from '@/types/employee';
import { ILocker } from '@/types/locker';

interface AssociateLockerModalProps {
    open: boolean;
    locker: ILocker | null;
    employees: IEmployee[];
    onClose: () => void;
    onSave: (employee: IEmployee) => void;
}

export function AssociateLockerModal({
    open,
    locker,
    employees,
    onClose,
    onSave,
}: AssociateLockerModalProps) {
    const [search, setSearch] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>(null);

    useEffect(() => {
        if (!open) {
            setSearch('');
            setSelectedEmployee(null);
            return;
        }

        const currentEmployee =
            employees.find((employee) => employee.email === locker?.email) || null;

        setSelectedEmployee(currentEmployee);
        setSearch(currentEmployee?.nome || '');
    }, [open, locker, employees]);

    const filteredEmployees = useMemo(() => {
        const term = search.trim().toLowerCase();

        if (!term) return employees;

        return employees.filter((employee) => {
            return (
                employee.nome.toLowerCase().includes(term) ||
                employee.email.toLowerCase().includes(term) ||
                employee.setor.toLowerCase().includes(term)
            );
        });
    }, [employees, search]);

    function handleSelectEmployee(employee: IEmployee) {
        setSelectedEmployee(employee);
        setSearch(employee.nome);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!selectedEmployee) return;

        onSave(selectedEmployee);
        onClose();
    }

    return (
        <Modal
            open={open}
            title={locker?.status === 'OCUPADO' ? 'Alterar associação' : 'Associar funcionário'}
            onClose={onClose}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Armário
                    </label>
                    <input
                        value={locker ? `#${locker.numero}` : ''}
                        disabled
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Buscar funcionário
                    </label>

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setSelectedEmployee(null);
                        }}
                        placeholder="Digite nome, e-mail ou setor"
                        className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                    />
                </div>

                <div className="max-h-64 overflow-y-auto rounded-2xl border border-slate-200">
                    {filteredEmployees.length === 0 ? (
                        <div className="p-4 text-sm text-slate-500">
                            Nenhum funcionário encontrado.
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {filteredEmployees.map((employee) => {
                                const isSelected = selectedEmployee?.id === employee.id;

                                return (
                                    <button
                                        key={employee.id}
                                        type="button"
                                        onClick={() => handleSelectEmployee(employee)}
                                        className={`flex w-full items-center gap-3 px-4 py-3 text-left transition ${isSelected ? 'bg-blue-50' : 'hover:bg-slate-50'
                                            }`}
                                    >
                                        <img
                                            src={employee.avatar || `https://i.pravatar.cc/80?u=${employee.email}`}
                                            alt={employee.nome}
                                            className="h-10 w-10 rounded-full border border-slate-200 object-cover"
                                        />

                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-semibold text-slate-900">
                                                {employee.nome}
                                            </p>
                                            <p className="truncate text-sm text-slate-500">
                                                {employee.email}
                                            </p>
                                            <p className="text-xs text-slate-400">
                                                Setor: {employee.setor}
                                            </p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {selectedEmployee && (
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Funcionário selecionado
                        </p>
                        <p className="mt-2 text-sm font-semibold text-slate-900">
                            {selectedEmployee.nome}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                            {selectedEmployee.email}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                            Setor: {selectedEmployee.setor}
                        </p>
                    </div>
                )}

                <div className="flex justify-end gap-2 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        disabled={!selectedEmployee}
                        className="rounded-2xl bg-[#0b3a6f] px-4 py-3 text-sm font-semibold text-white hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Salvar
                    </button>
                </div>
            </form>
        </Modal>
    );
}