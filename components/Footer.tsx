import Link from "next/link";
import { Home as HomeIcon } from "lucide-react";

export default function Footer() {
    return (
        <footer className="mt-auto py-12 bg-slate-900 text-slate-300 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8 mb-8">
                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center gap-2 mb-4 text-white">
                        <div className="bg-primary p-2 rounded-lg">
                            <HomeIcon size={20} />
                        </div>
                        <span className="text-2xl font-bold">عقار</span>
                    </div>
                    <p className="text-slate-400 leading-relaxed max-w-sm">
                        المنصة العقارية المتكاملة لبيع وشراء وإدارة العقارات في المملكة العربية السعودية. نجعلك أقرب لمنزلك.
                    </p>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4">روابط سريعة</h4>
                    <ul className="space-y-2">
                        <li><Link href="/buyer" className="hover:text-primary transition-colors">ابحث عن عقار</Link></li>
                        <li><Link href="/seller" className="hover:text-primary transition-colors">أضف عقارك</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">الأسئلة الشائعة</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4">تواصل معنا</h4>
                    <ul className="space-y-2 text-sm">
                        <li>الرياض، المملكة العربية السعودية</li>
                        <li>info@aqar-platform.com</li>
                        <li dir="ltr">+966 50 000 0000</li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
                جميع الحقوق محفوظة منصة عقار © {new Date().getFullYear()}
            </div>
        </footer>
    );
}
