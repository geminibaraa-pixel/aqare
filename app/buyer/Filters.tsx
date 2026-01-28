'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Search } from 'lucide-react';

export default function Filters() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const [filters, setFilters] = useState({
        type: searchParams.get('type') || '',
        listingType: searchParams.get('listingType') || '',
        maxPrice: searchParams.get('maxPrice') || '',
        minArea: searchParams.get('minArea') || '',
        district: searchParams.get('district') || '',
    });

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (filters.type) params.set('type', filters.type);
        if (filters.listingType) params.set('listingType', filters.listingType);
        if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
        if (filters.minArea) params.set('minArea', filters.minArea);
        if (filters.district) params.set('district', filters.district);

        startTransition(() => {
            router.push(`/buyer?${params.toString()}`);
        });
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-end">

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-slate-700">نوع العقار</label>
                    <select
                        value={filters.type}
                        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                        className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50"
                    >
                        <option value="">الكل</option>
                        <option value="APARTMENT">شقة</option>
                        <option value="LAND">أرض</option>
                        <option value="SHOP">محل</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-slate-700">نوع العرض</label>
                    <select
                        value={filters.listingType}
                        onChange={(e) => setFilters({ ...filters, listingType: e.target.value })}
                        className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50"
                    >
                        <option value="">الكل</option>
                        <option value="SALE">بيع</option>
                        <option value="RENT">إيجار</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-slate-700">السعر (حد أقصى)</label>
                    <input
                        type="number"
                        placeholder="مثلاً 500000"
                        value={filters.maxPrice}
                        onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                        className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-slate-700">المساحة (حد أدنى)</label>
                    <input
                        type="number"
                        placeholder="م²"
                        value={filters.minArea}
                        onChange={(e) => setFilters({ ...filters, minArea: e.target.value })}
                        className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-slate-700">الحي</label>
                    <input
                        type="text"
                        placeholder="اسم الحي"
                        value={filters.district}
                        onChange={(e) => setFilters({ ...filters, district: e.target.value })}
                        className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50"
                    />
                </div>

                <button
                    onClick={handleSearch}
                    disabled={isPending}
                    className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2 font-medium"
                >
                    <Search size={20} />
                    {isPending ? 'جاري البحث...' : 'بحث'}
                </button>

            </div>
        </div>
    );
}
