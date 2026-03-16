'use client';

import { QRCodeSVG } from 'qrcode.react';

interface LockerQrCodeProps {
    value: string;
}

export function LockerQrCode({ value }: LockerQrCodeProps) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <QRCodeSVG
                value={value}
                size={96}
                bgColor="transparent"
                fgColor="#334155"
                level="M"
                includeMargin={false}
            />
        </div>
    );
}