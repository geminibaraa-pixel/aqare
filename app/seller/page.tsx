import SellerForm from './SellerForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function SellerPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            <Navbar />
            <div className="flex-grow py-12 px-4">
                <div className="max-w-4xl mx-auto mb-8 text-center">
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-2">لوحة البائع</h1>
                    <p className="text-slate-500">أضف عقارك بسهولة وسيتم مراجعته ونشره خلال 24 ساعة</p>
                </div>
                <SellerForm />
            </div>
            <Footer />
        </div>
    );
}
