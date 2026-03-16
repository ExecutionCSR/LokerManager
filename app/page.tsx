'use client';

import { useEffect, useMemo, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { AssociateLockerModal } from '@/components/locker/AssociateLockerModal';
import { LockerCard } from '@/components/locker/LockerCard';
import { LockerFilters } from '@/components/locker/LockerFilters';
import { RemoveAssociationModal } from '@/components/locker/RemoveAssociationModal';

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

type TStatusFilter = 'TODOS' | 'LIVRE' | 'OCUPADO';

export default function Home() {
  const [lockers, setLockers] = useState<ILocker[]>([]);
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [selectedLocker, setSelectedLocker] = useState<ILocker | null>(null);
  const [associateModalOpen, setAssociateModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<TStatusFilter>('TODOS');

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

  async function loadDashboard() {
    setLoading(true);
    await Promise.all([loadLockers(), loadEmployees()]);
    setLoading(false);
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  const total = lockers.length;
  const ocupados = useMemo(
    () => lockers.filter((locker) => locker.status === 'OCUPADO').length,
    [lockers]
  );
  const livres = useMemo(
    () => lockers.filter((locker) => locker.status === 'LIVRE').length,
    [lockers]
  );

  const filteredLockers = useMemo(() => {
    const term = search.trim().toLowerCase();

    return lockers.filter((locker) => {
      const matchesSearch =
        !term ||
        locker.numero.toLowerCase().includes(term) ||
        locker.employee?.nome?.toLowerCase().includes(term) ||
        locker.employee?.email?.toLowerCase().includes(term);

      const matchesStatus =
        statusFilter === 'TODOS' || locker.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [lockers, search, statusFilter]);

  function handleOpenAssociate(locker: ILocker) {
    setSelectedLocker(locker);
    setAssociateModalOpen(true);
  }

  function handleOpenRemove(locker: ILocker) {
    setSelectedLocker(locker);
    setRemoveModalOpen(true);
  }

  async function handleSaveAssociation(employee: IEmployee) {
    if (!selectedLocker) return;

    const response = await fetch(`/api/armarios/${selectedLocker.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        numero: selectedLocker.numero,
        employeeId: employee.id,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || 'Erro ao associar funcionário.');
      return;
    }

    await loadLockers();
  }

  async function handleRemoveAssociation() {
    if (!selectedLocker) return;

    const response = await fetch(`/api/armarios/${selectedLocker.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        numero: selectedLocker.numero,
        employeeId: null,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || 'Erro ao remover associação.');
      return;
    }

    await loadLockers();
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f6f8fb] text-slate-900">
        <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[220px_1fr]">
          <Sidebar />
          <section className="flex items-center justify-center">
            <p className="text-sm text-slate-500">Carregando dashboard...</p>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-slate-900">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[220px_1fr]">
        <Sidebar />

        <section className="flex min-w-0 flex-col">
          <Header total={total} ocupados={ocupados} livres={livres} />

          <div className="px-6 py-5">
            <LockerFilters
              search={search}
              statusFilter={statusFilter}
              livres={livres}
              ocupados={ocupados}
              onSearchChange={setSearch}
              onStatusChange={setStatusFilter}
            />

            {filteredLockers.length === 0 ? (
              <div className="mt-5 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <p className="text-base font-semibold text-slate-700">
                  Nenhum armário encontrado
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Tente ajustar a busca ou o filtro de status.
                </p>
              </div>
            ) : (
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6">
                {filteredLockers.map((locker) => (
                  <LockerCard
                    key={locker.id}
                    locker={locker}
                    onAssociate={handleOpenAssociate}
                    onRemove={handleOpenRemove}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      <AssociateLockerModal
        open={associateModalOpen}
        locker={selectedLocker}
        employees={employees}
        onClose={() => {
          setAssociateModalOpen(false);
          setSelectedLocker(null);
        }}
        onSave={handleSaveAssociation}
      />

      <RemoveAssociationModal
        open={removeModalOpen}
        locker={selectedLocker}
        onClose={() => {
          setRemoveModalOpen(false);
          setSelectedLocker(null);
        }}
        onConfirm={handleRemoveAssociation}
      />
    </main>
  );
}