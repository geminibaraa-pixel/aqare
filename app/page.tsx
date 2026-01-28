import Link from "next/link";
import { MessageCircle, Search, Store, Home as HomeIcon, Menu, ArrowLeft } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col font-sans text-text-main direction-rtl">
      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-50 glass border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-white p-2 rounded-xl shadow-lg shadow-primary/30">
              <HomeIcon size={24} />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-light">
              عقار
            </span>
          </div>
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

      {/* Hero Section */}
      <section className="relative w-full h-[70vh] flex items-center justify-center bg-slate-900 text-white overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-slate-900/60 to-transparent z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center z-0 scale-105 animate-[pulse_10s_ease-in-out_infinite] transition-all duration-[10s]"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop')" }}
        />

        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
          <div className="inline-block mb-4 px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-light tracking-wide animate-fade-in-up">
            المنصة العقارية الأسرع نمواً
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-2xl leading-tight animate-fade-in-up delay-100">
            اكتشف منزل <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-200">أحلامك</span> اليوم
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-10 font-light max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
            تجربة عقارية استثنائية تجمع بين الفخامة والسهولة. بيع، اشتر، واستثمر بثقة تامة.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
            <Link href="/buyer" className="px-8 py-4 bg-primary hover:bg-blue-800 text-white rounded-full font-bold shadow-lg shadow-blue-900/20 transition-all hover:scale-105 flex items-center gap-2">
              <Search size={20} />
              ابدأ البحث
            </Link>
            <Link href="/seller" className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full font-bold transition-all hover:scale-105 flex items-center gap-2">
              <Store size={20} />
              اعرض عقارك
            </Link>
          </div>
        </div>
      </section>

      {/* Stats/Intro Section */}
      <section className="py-20 px-4 bg-white relative -mt-10 rounded-t-[3rem] z-30 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="text-4xl font-bold text-primary mb-2">+٥٠٠٠</div>
              <div className="text-slate-500">عقار متاح</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="text-4xl font-bold text-accent mb-2">+١٠K</div>
              <div className="text-slate-500">مستخدم نشط</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="text-4xl font-bold text-secondary mb-2">٢٤/٧</div>
              <div className="text-slate-500">دعم متواصل</div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-8 text-slate-800">تعرف على المنصة في دقيقة</h2>
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-slate-900 group cursor-pointer">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center text-white flex-col gap-4">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/30">
                  <div className="w-16 h-16 rounded-full bg-white text-primary flex items-center justify-center pl-1 shadow-lg">
                    <span className="font-bold text-2xl">▶</span>
                  </div>
                </div>
                <span className="font-medium tracking-wide">شاهد الفيديو التعريفي</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Action Cards Section */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-wider uppercase text-sm">ابدأ رحلتك</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">اختر مسارك العقاري</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Seller Button */}
            <Link href="/seller" className="group relative overflow-hidden rounded-[2rem] bg-white shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 p-10 border border-slate-100 text-center flex flex-col items-center gap-6 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center text-primary mb-2 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                <Store size={48} />
              </div>
              <div className="z-10">
                <h3 className="text-3xl font-bold text-slate-800 mb-2 group-hover:text-primary transition-colors">مالك عقار؟</h3>
                <p className="text-slate-500 leading-relaxed max-w-sm mx-auto">اعرض عقارك للبيع أو الإيجار ووصل لآلاف المهتمين في دقائق معدودة بأسهل الخطوات.</p>
              </div>
              <div className="mt-4 px-8 py-3 bg-white border border-slate-200 text-slate-800 rounded-full font-bold group-hover:bg-primary group-hover:text-white group-hover:border-transparent transition-all duration-300 flex items-center gap-2 shadow-sm">
                ابدأ العرض مجاناً <ArrowLeft size={18} className="rotate-180" />
              </div>
            </Link>

            {/* Buyer Button */}
            <Link href="/buyer" className="group relative overflow-hidden rounded-[2rem] bg-white shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 p-10 border border-slate-100 text-center flex flex-col items-center gap-6 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center text-secondary mb-2 group-hover:scale-110 group-hover:bg-secondary group-hover:text-white transition-all duration-500 shadow-sm">
                <Search size={48} />
              </div>
              <div className="z-10">
                <h3 className="text-3xl font-bold text-slate-800 mb-2 group-hover:text-secondary transition-colors">تبحث عن عقار؟</h3>
                <p className="text-slate-500 leading-relaxed max-w-sm mx-auto">تصفح آلاف العقارات الموثقة واعثر على منزل أحلامك بالمواصفات التي تناسبك تماماً.</p>
              </div>
              <div className="mt-4 px-8 py-3 bg-white border border-slate-200 text-slate-800 rounded-full font-bold group-hover:bg-secondary group-hover:text-white group-hover:border-transparent transition-all duration-300 flex items-center gap-2 shadow-sm">
                تصفح العقارات <ArrowLeft size={18} className="rotate-180" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/966XXXXXXXXX"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 left-8 z-50 flex items-center gap-3 bg-[#25D366] text-white px-6 py-4 rounded-full shadow-2xl hover:bg-[#20bd5a] transition-all hover:-translate-y-1 hover:shadow-green-500/30 group"
      >
        <MessageCircle size={28} className="group-hover:animate-bounce" />
        <span className="font-bold text-lg hidden md:inline">تواصل معنا</span>
      </a>

      {/* Footer */}
      <footer className="mt-auto py-12 bg-slate-900 text-slate-300 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4 text-white">
              <div className="bg-primary p-2 rounded-lg">
                <HomeIcon size={20} />
              </div>
              <span className="text-2xl font-bold">عقار</span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm">المنصة العقارية المتكاملة لبيع وشراء وإدارة العقارات في المملكة العربية السعودية. نجعلك أقرب لمنزلك.</p>
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
    </main>
  );
}
