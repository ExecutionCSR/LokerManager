interface ModalProps {
    open: boolean;
    title: string;
    children: React.ReactNode;
    onClose: () => void;
}

export function Modal({ open, title, children, onClose }: ModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
            <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-900">{title}</h2>
                    <button
                        onClick={onClose}
                        className="rounded-xl px-3 py-1 text-slate-500 hover:bg-slate-100"
                    >
                        ×
                    </button>
                </div>

                <div className="mt-5">{children}</div>
            </div>
        </div>
    );
}