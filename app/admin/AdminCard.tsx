'use client';

import { approveProperty, rejectProperty } from './actions';
import { useTransition } from 'react';

export default function AdminCard({ property }: { property: any }) {
    const [isPending, startTransition] = useTransition();

    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4">
            <div className="flex justify-between">
                <span className="font-bold">{property.type} - {property.listingType}</span>
                <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Pending</span>
            </div>
            <div>
                <p>Price: {property.price}</p>
                <p>Area: {property.area}</p>
                <p>Seller: {property.sellerPhone}</p>
                {/* Admin sees phone */}
            </div>
            <div className="flex gap-2 mt-auto">
                <button
                    onClick={() => startTransition(() => approveProperty(property.id))}
                    className="flex-1 bg-green-600 text-white py-2 rounded shadow hover:bg-green-700"
                    disabled={isPending}
                >
                    {isPending ? '...' : 'Approve'}
                </button>
                <button
                    onClick={() => startTransition(() => rejectProperty(property.id))}
                    className="flex-1 bg-red-600 text-white py-2 rounded shadow hover:bg-red-700"
                    disabled={isPending}
                >
                    {isPending ? '...' : 'Reject'}
                </button>
            </div>
        </div>
    );
}
