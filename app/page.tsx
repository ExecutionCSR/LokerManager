'use client';

import { useMemo, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { AssociateLockerModal } from '@/components/locker/AssociateLockerModal';
import { LockerCard } from '@/components/locker/LockerCard';
import { LockerFilters } from '@/components/locker/LockerFilters';
import { RemoveAssociationModal } from '@/components/locker/RemoveAssociationModal';
import { lockersMock } from '@/lib/mocks';
import { ILocker } from '@/types/locker';
import { employeesMock } from '@/lib/employees';
import { IEmployee } from '@/types/employee';

export default function Home() {
  const [lockers, setLockers] = useState<ILocker[]>(lockersMock);
  const [selectedLocker, setSelectedLocker] = useState<ILocker | null>(null);
  const [associateModalOpen, setAssociateModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);

  const total = lockers.length;
  const ocupados = useMemo(
    () => lockers.filter((locker) => locker.status === 'OCUPADO').length,
    [lockers]
  );
  const livres = useMemo(
    () => lockers.filter((locker) => locker.status === 'LIVRE').length,
    [lockers]
  );

  function handleOpenAssociate(locker: ILocker) {
    setSelectedLocker(locker);
    setAssociateModalOpen(true);
  }

  function handleOpenRemove(locker: ILocker) {
    setSelectedLocker(locker);
    setRemoveModalOpen(true);
  }

  function handleSaveAssociation(employee: IEmployee) {
    if (!selectedLocker) return;

    setLockers((current) =>
      current.map((locker) =>
        locker.id === selectedLocker.id
          ? {
            ...locker,
            status: 'OCUPADO',
            funcionario: employee.nome,
            email: employee.email,
            avatar: employee.avatar,
          }
          : locker
      )
    );
  }

  function handleRemoveAssociation() {
    if (!selectedLocker) return;

    setLockers((current) =>
      current.map((locker) =>
        locker.id === selectedLocker.id
          ? {
            ...locker,
            status: 'LIVRE',
            funcionario: undefined,
            email: undefined,
            avatar: undefined,
          }
          : locker
      )
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-slate-900">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[220px_1fr]">
        <Sidebar />

        <section className="flex min-w-0 flex-col">
          <Header total={total} ocupados={ocupados} livres={livres} />

          <div className="px-6 py-5">
            <LockerFilters livres={livres} ocupados={ocupados} />

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6">
              {lockers.map((locker) => (
                <LockerCard
                  key={locker.id}
                  locker={locker}
                  onAssociate={handleOpenAssociate}
                  onRemove={handleOpenRemove}
                />
              ))}
            </div>
          </div>
        </section>
      </div>

      <AssociateLockerModal
        open={associateModalOpen}
        locker={selectedLocker}
        employees={employeesMock}
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