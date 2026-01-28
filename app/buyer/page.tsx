import prisma from '@/lib/prisma';
import Filters from './Filters';
import Image from 'next/image';
import { MapPin, MessageCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

export default async function BuyerPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const searchParams = await props.searchParams;

    const type = typeof searchParams.type === 'string' ? searchParams.type : undefined;
    const listingType = typeof searchParams.listingType === 'string' ? searchParams.listingType : undefined;
    const maxPrice = typeof searchParams.maxPrice === 'string' ? parseFloat(searchParams.maxPrice) : undefined;
    const minArea = typeof searchParams.minArea === 'string' ? parseFloat(searchParams.minArea) : undefined;
    const district = typeof searchParams.district === 'string' ? searchParams.district : undefined;

    const where: any = {
        status: 'APPROVED',
    };

    if (type) where.type = type;
    if (listingType) where.listingType = listingType;
    if (maxPrice) where.price = { lte: maxPrice };
    if (minArea) where.area = { gte: minArea };
    if (district) where.district = { contains: district };

    const properties = await prisma.property.findMany({
        where,
        include: {
            images: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    const CDN_HOST = process.env.BUNNY_CDN_HOSTNAME || 'test.b-cdn.net';

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            <Navbar />

            <div className="flex-grow py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl font-extrabold text-slate-900">تصفح العقارات</h1>
                            <p className="text-slate-500 mt-2">اعثر على أفضل الفرص العقارية المتاحة حالياً</p>
                        </div>
                    </div>

                    <Filters />

                    {properties.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100 mt-8">
                            <div className="text-6xl mb-4 grayscale opacity-50">🏠</div>
                            <h3 className="text-xl font-bold text-slate-700 mb-2">لا توجد عقارات مطابقة للبحث</h3>
                            <p className="text-slate-500">جرب تغيير معايير البحث أو تصفح الكل لمشاهدة جميع العروض.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                            {properties.map((property: any) => (
                                <div key={property.id} className="bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 border border-slate-100 group flex flex-col">
                                    {/* Image Carousel / Hero Image */}
                                    <div className="relative h-64 bg-slate-200 overflow-hidden">
                                        {property.images && property.images.length > 0 ? (
                                            <Image
                                                src={`https://${CDN_HOST}/${property.images[0].path}`}
                                                alt="Property"
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-slate-400">
                                                <span className="text-4xl">📷</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                                            {property.listingType === 'SALE' ? 'للبيع' : 'للإيجار'}
                                        </div>
                                        <div className="absolute top-4 left-4 bg-primary px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm">
                                            {property.type === 'APARTMENT' ? 'شقة' : property.type === 'LAND' ? 'أرض' : 'محل'}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors line-clamp-1">{property.type === 'APARTMENT' ? 'شقة سكنية' : property.type}</h3>
                                                <p className="text-slate-500 text-sm flex items-center gap-1">
                                                    <MapPin size={14} className="text-primary" /> {property.district}
                                                </p>
                                            </div>
                                            <div className="text-left bg-slate-50 px-3 py-1 rounded-lg">
                                                <span className="block text-lg font-bold text-primary">{property.price.toLocaleString()} </span>
                                                <span className="text-[10px] text-slate-400 font-bold">ريال {property.listingType === 'RENT' ? '/ سنوياً' : ''}</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 text-sm text-slate-600 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                            <div className="flex items-center gap-2">
                                                <span>📏</span> <span className="text-slate-400">المساحة:</span> <span className="font-bold text-slate-800">{property.area} م²</span>
                                            </div>
                                            {property.floor && (
                                                <div className="flex items-center gap-2">
                                                    <span>🏢</span> <span className="text-slate-400">الدور:</span> <span className="font-bold text-slate-800">{property.floor}</span>
                                                </div>
                                            )}
                                        </div>

                                        <p className="text-slate-500 text-sm line-clamp-2 mb-6 h-10 leading-relaxed">
                                            {property.description}
                                        </p>

                                        {/* Contact Button */}
                                        <a
                                            href={`https://wa.me/966XXXXXXXX?text=${encodeURIComponent(`مرحباً، أنا مهتم بالعقار رقم ${property.id.slice(0, 8)}`)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-auto w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-green-500/20 active:scale-95"
                                        >
                                            <MessageCircle size={20} />
                                            <span>تواصل عبر واتساب</span>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}
