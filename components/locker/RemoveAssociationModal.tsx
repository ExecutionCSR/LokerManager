'use client';

import { Modal } from '@/components/ui/Modal';
import { ILocker } from '@/types/locker';

interface RemoveAssociationModalProps {
    open: boolean;
    locker: ILocker | null;
    onClose: () => void;
    onConfirm: () => void;
}

export function RemoveAssociationModal({
    open,
    locker,
    onClose,
    onConfirm,
}: RemoveAssociationModalProps) {
    return (
        <Modal open={open} title="Remover associação" onClose={onClose}>
            <div className="space-y-4">
                <p className="text-sm text-slate-600">
                    Você está prestes a remover o funcionário do armário{' '}
                    <span className="font-semibold text-slate-900">
                        {locker ? `#${locker.numero}` : ''}
                    </span>
                    .
                </p>

                <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Funcionário atual</p>
                    <p className="mt-1 font-semibold text-slate-900">
                        {locker?.funcionario || 'Não informado'}
                    </p>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="rounded-2xl bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:opacity-95"
                    >
                        Remover
                    </button>
                </div>
            </div>
        </Modal>
    );
}