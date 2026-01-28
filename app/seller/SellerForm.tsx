'use client';

import { useActionState } from 'react';
import dynamic from 'next/dynamic';
import { submitProperty } from './actions';
import { Store, Building, MapPin, Upload, Video, FileText } from 'lucide-react';
import { useState } from 'react';

// Dynamically import MapPicker with no SSR
const MapPicker = dynamic(() => import('@/components/MapPicker'), {
    ssr: false,
    loading: () => <div className="h-64 w-full bg-slate-100 animate-pulse rounded-lg flex items-center justify-center">Loading Map...</div>
});

const initialState = {
    success: false,
    message: '',
};

export default function SellerForm() {
    const [state, formAction, isPending] = useActionState(submitProperty, initialState);
    const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null);

    const handleLocationSelect = (lat: number, lng: number) => {
        setLocation({ lat, lng });
    };

    if (state.success) {
        return (
            <div className="max-w-2xl mx-auto p-8 bg-green-50 rounded-2xl border border-green-200 text-center animate-fade-in-up">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">✓</span>
                </div>
                <h2 className="text-3xl font-bold text-green-700 mb-4">تم الإرسال بنجاح!</h2>
                <p className="text-green-600 mb-8 max-w-sm mx-auto">تم استلام طلبك بنجاح. سيقوم فريقنا بمراجعة العقار والتواصل معك في أقرب وقت.</p>
                <button onClick={() => window.location.reload()} className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 font-bold shadow-lg hover:shadow-green-500/20 transition-all">
                    إضافة عقار آخر
                </button>
            </div>
        );
    }

    return (
        <form action={formAction} className="w-full max-w-4xl mx-auto bg-white shadow-xl rounded-[2rem] p-6 md:p-10 border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-primary-light to-secondary" />

            <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">بيانات العقار</h2>

            {/* Hidden Location Inputs */}
            <input type="hidden" name="latitude" value={location?.lat || ''} />
            <input type="hidden" name="longitude" value={location?.lng || ''} />

            <div className="grid md:grid-cols-2 gap-8">

                {/* Section 1: Type Selection */}
                <div className="space-y-6">
                    <label className="block text-slate-700 font-semibold mb-2">نوع العقار</label>
                    <div className="grid grid-cols-3 gap-3">
                        <label className="cursor-pointer group">
                            <input type="radio" name="type" value="APARTMENT" className="peer sr-only" required />
                            <div className="p-4 rounded-xl border-2 border-slate-200 peer-checked:border-primary peer-checked:bg-blue-50 hover:bg-slate-50 transition-all text-center flex flex-col items-center gap-2 group-hover:-translate-y-1">
                                <Building size={24} className="text-slate-400 peer-checked:text-primary transition-colors" />
                                <span className="text-sm font-medium peer-checked:text-primary">شقة</span>
                            </div>
                        </label>
                        <label className="cursor-pointer group">
                            <input type="radio" name="type" value="LAND" className="peer sr-only" />
                            <div className="p-4 rounded-xl border-2 border-slate-200 peer-checked:border-primary peer-checked:bg-blue-50 hover:bg-slate-50 transition-all text-center flex flex-col items-center gap-2 group-hover:-translate-y-1">
                                <MapPin size={24} className="text-slate-400 peer-checked:text-primary transition-colors" />
                                <span className="text-sm font-medium peer-checked:text-primary">أرض</span>
                            </div>
                        </label>
                        <label className="cursor-pointer group">
                            <input type="radio" name="type" value="SHOP" className="peer sr-only" />
                            <div className="p-4 rounded-xl border-2 border-slate-200 peer-checked:border-primary peer-checked:bg-blue-50 hover:bg-slate-50 transition-all text-center flex flex-col items-center gap-2 group-hover:-translate-y-1">
                                <Store size={24} className="text-slate-400 peer-checked:text-primary transition-colors" />
                                <span className="text-sm font-medium peer-checked:text-primary">محل</span>
                            </div>
                        </label>
                    </div>

                    <label className="block text-slate-700 font-semibold mb-2 mt-6">نوع العرض</label>
                    <div className="flex gap-4 p-1 bg-slate-100 rounded-lg">
                        <label className="flex-1 cursor-pointer">
                            <input type="radio" name="listingType" value="SALE" className="peer sr-only" required />
                            <div className="py-2 text-center rounded-md text-slate-500 peer-checked:bg-white peer-checked:text-primary peer-checked:shadow-sm transition-all font-medium">بيع</div>
                        </label>
                        <label className="flex-1 cursor-pointer">
                            <input type="radio" name="listingType" value="RENT" className="peer sr-only" />
                            <div className="py-2 text-center rounded-md text-slate-500 peer-checked:bg-white peer-checked:text-primary peer-checked:shadow-sm transition-all font-medium">إيجار</div>
                        </label>
                    </div>
                </div>

                {/* Section 2: Basic Info */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">المساحة (م²)</label>
                        <input type="number" name="area" className="w-full rounded-xl border-slate-200 border-2 p-3 focus:border-primary focus:ring-0 outline-none transition-colors" placeholder="0" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">السعر (ريال)</label>
                        <input type="number" name="price" className="w-full rounded-xl border-slate-200 border-2 p-3 focus:border-primary focus:ring-0 outline-none transition-colors" placeholder="0" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">اسم الحي</label>
                        <input type="text" name="district" className="w-full rounded-xl border-slate-200 border-2 p-3 focus:border-primary focus:ring-0 outline-none transition-colors" placeholder="حي الملقا" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">الدور (للشقق)</label>
                        <input type="number" name="floor" className="w-full rounded-xl border-slate-200 border-2 p-3 focus:border-primary focus:ring-0 outline-none transition-colors" placeholder="مثلاً: 1" />
                    </div>
                </div>

            </div>

            <div className="my-8">
                <label className="block text-slate-700 font-semibold mb-2">موقع العقار على الخريطة</label>
                <div className="border-2 border-slate-200 rounded-xl overflow-hidden">
                    <MapPicker onLocationSelect={handleLocationSelect} />
                </div>
                {!location && <p className="text-red-500 text-sm mt-2 flex items-center gap-1"><span>📍</span> يرجى تحديد الموقع على الخريطة</p>}
            </div>

            <div className="space-y-4 mb-8">
                <label className="block text-slate-700 font-semibold">وصف العقار</label>
                <textarea name="description" rows={4} className="w-full rounded-xl border-slate-200 border-2 p-3 focus:border-primary focus:ring-0 outline-none transition-colors" placeholder="اكتب وصفاً مفصلاً للعقار ومميزاته..."></textarea>
            </div>

            {/* Media Uploads */}
            <h3 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">الملفات والوسائط</h3>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="p-8 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 hover:bg-blue-50 hover:border-primary/50 transition-colors group cursor-pointer relative">
                    <input type="file" name="images" multiple accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    <div className="flex flex-col items-center gap-3 text-slate-500 group-hover:text-primary transition-colors">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                            <Upload size={24} />
                        </div>
                        <span className="font-medium">أضف صور للعقار</span>
                        <span className="text-xs text-slate-400">يمكنك سحب الصور هنا مباشرة</span>
                    </div>
                </div>

                <div className="p-8 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 hover:bg-blue-50 hover:border-primary/50 transition-colors group cursor-pointer relative">
                    <input type="file" name="video" accept="video/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    <div className="flex flex-col items-center gap-3 text-slate-500 group-hover:text-primary transition-colors">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                            <Video size={24} />
                        </div>
                        <span className="font-medium">أضف فيديو للعقار</span>
                        <span className="text-xs text-slate-400">MP4, MOV (Max 50MB)</span>
                    </div>
                </div>
            </div>

            {/* Seller Contact Info */}
            <div className="bg-amber-50 p-8 rounded-2xl border border-amber-100 mb-8">
                <h3 className="text-lg font-bold text-amber-800 mb-4 flex items-center gap-2">
                    <span className="text-2xl">🔒</span> بيانات التواصل وتوثيق الملكية
                </h3>
                <p className="text-amber-700/80 text-sm mb-6">هذه البيانات مشفرة وآمنة، تستخدم فقط للتحقق من ملكية العقار ولن تظهر للعامة.</p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">رقم الجوال</label>
                        <input type="tel" name="sellerPhone" className="w-full rounded-xl border-amber-200 border-2 p-3 focus:border-amber-500 focus:ring-0 outline-none bg-white" required placeholder="05xxxxxxxx" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">رقم الواتساب</label>
                        <input type="tel" name="sellerWhatsapp" className="w-full rounded-xl border-amber-200 border-2 p-3 focus:border-amber-500 focus:ring-0 outline-none bg-white" required placeholder="05xxxxxxxx" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">صورة سند الملكية (مطلوب)</label>
                    <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-amber-200">
                        <FileText className="text-amber-400" />
                        <input type="file" name="titleDeed" accept="image/*,application/pdf" className="w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200 cursor-pointer" required />
                    </div>
                </div>
            </div>

            {state.message && !state.success && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl mb-6 text-center border border-red-100 font-medium">
                    {state.message}
                </div>
            )}

            <button
                type="submit"
                disabled={isPending}
                className="w-full py-4 bg-primary hover:bg-primary-light text-white font-bold text-xl rounded-xl shadow-xl hover:shadow-2xl hover:translate-y-[-2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {isPending ? (
                    'جاري الإرسال...'
                ) : (
                    <span>إرسال للعرض والمراجعة</span>
                )}
            </button>

        </form>
    );
}
