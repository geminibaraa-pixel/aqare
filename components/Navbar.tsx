import Link from "next/link";
import { Home as HomeIcon, Menu } from "lucide-react";

export default function Navbar({ transparent = false }: { transparent?: boolean }) {
    return (
        <nav className={`sticky top-0 z-50 border-b ${transparent ? 'glass border-white/20' : 'bg-white border-slate-200'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-primary text-white p-2 rounded-xl shadow-lg shadow-primary/30 group-hover:scale-105 transition-transform">
                        <HomeIcon size={24} />
                    </div>
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-light">
                        عقار
                    </span>
                </Link>
                <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
                    <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
                    <Link href="/buyer" className="hover:text-primary transition-colors">تصفح العقارات</Link>
                    <Link href="/seller" className="hover:text-primary transition-colors">أضف عقارك</Link>
                    <Link href="#" className="hover:text-primary transition-colors">من نحن</Link>
                </div>
                <button className="md:hidden text-slate-600">
                    <Menu size={24} />
                </button>
            </div>
        </nav>
    );
}
