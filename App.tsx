
import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, ChevronRight, Facebook, MapPin, Info, ArrowRight, ExternalLink, Leaf } from 'lucide-react';
import { EVENT_DATA, HIGHLIGHTS, INFO_ITEMS } from './constants';

// Fix: Augment the global Window interface to include the 'gtag' function.
declare global {
  interface Window {
    gtag?: (command: string, action: string, params?: any) => void;
  }
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showMobileCta, setShowMobileCta] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  const targetDate = new Date("2025-12-27T13:30:00+08:00").getTime();

  const calculateTimeLeft = useCallback(() => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return null;
  }, [targetDate]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);
      setShowMobileCta(scrollY > 400);
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, [calculateTimeLeft]);

  const handleRegister = () => {
    window.gtag?.('event', 'conversion', {
      'event_category': 'Registration',
      'event_label': 'Tea_Tasting_20251227',
      'value': EVENT_DATA.price
    });
    window.open(EVENT_DATA.registrationUrl, '_blank');
  };

  return (
    <div className="relative min-h-screen bg-stone-50 selection:bg-amber-100 selection:text-amber-950 text-stone-900 font-sans">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="font-serif-tc font-bold text-2xl tracking-tight text-stone-900 flex items-center gap-2">
            <span className="w-8 h-8 bg-amber-900 rounded-lg flex items-center justify-center text-white text-lg shadow-sm">M</span>
            慕耕活 <span className="text-amber-900 font-normal">Morgan Hope</span>
          </div>
          <div className="hidden md:flex items-center space-x-10">
            <a href="#highlights" className="font-bold text-sm tracking-widest text-stone-800 hover:text-amber-900 transition-colors uppercase">活動亮點</a>
            <a href="#details" className="font-bold text-sm tracking-widest text-stone-800 hover:text-amber-900 transition-colors uppercase">詳情資訊</a>
            <a href="#location" className="font-bold text-sm tracking-widest text-stone-800 hover:text-amber-900 transition-colors uppercase">地點資訊</a>
            <button 
              onClick={handleRegister}
              className="px-7 py-2.5 rounded-full text-sm font-bold tracking-widest transition-all shadow-md bg-stone-900 text-white hover:bg-black hover:shadow-xl active:scale-95"
            >
              立即報名
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544787210-2211d44b1368?auto=format&fit=crop&q=80&w=2000" 
            alt="品茶背景"
            className="w-full h-full object-cover opacity-25 grayscale-[10%]"
            onLoad={(e) => (e.currentTarget.style.opacity = '0.25')}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-50/0 via-stone-50/80 to-stone-50"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="inline-block px-4 py-1.5 bg-amber-900/10 text-amber-900 rounded-full text-sm font-bold tracking-widest mb-4 animate-fade-in-up uppercase">
              Exclusive Tea Workshop
            </div>
            <h1 className="font-serif-tc text-5xl md:text-7xl lg:text-8xl font-bold leading-tight animate-fade-in-up text-stone-900">
              {EVENT_DATA.title}
            </h1>
            <p className="text-xl md:text-2xl text-stone-700 font-medium max-w-2xl mx-auto animate-fade-in-up delay-200 leading-relaxed">
              {EVENT_DATA.subtitle}
            </p>

            {/* Countdown */}
            {timeLeft && (
              <div className="flex justify-center gap-4 md:gap-8 py-6 animate-fade-in-up delay-300">
                {[
                  { label: '天', value: timeLeft.days },
                  { label: '時', value: timeLeft.hours },
                  { label: '分', value: timeLeft.minutes },
                  { label: '秒', value: timeLeft.seconds },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className="bg-white/90 backdrop-blur-sm border border-stone-200 rounded-2xl w-20 h-20 md:w-24 md:h-24 flex items-center justify-center shadow-sm mb-3 group transition-all hover:border-amber-900/40">
                      <span className="text-3xl md:text-4xl font-bold font-serif-tc text-stone-900">
                        {String(item.value).padStart(2, '0')}
                      </span>
                    </div>
                    <span className="text-[10px] tracking-[0.3em] font-bold text-stone-500 uppercase">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm md:text-base animate-fade-in-up delay-400">
              <span className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-xl border border-stone-200 flex items-center gap-3 shadow-sm transition-all hover:bg-white">
                <Calendar size={18} className="text-amber-900" /> 
                <span className="font-bold text-stone-800">{EVENT_DATA.date}</span>
              </span>
              <span className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-xl border border-stone-200 flex items-center gap-3 shadow-sm transition-all hover:bg-white">
                <MapPin size={18} className="text-amber-900" /> 
                <span className="font-bold text-stone-800">{EVENT_DATA.location}</span>
              </span>
            </div>

            <div className="pt-8 animate-fade-in-up delay-500">
              <button 
                onClick={handleRegister}
                className="group inline-flex items-center gap-3 bg-stone-900 hover:bg-black text-white px-10 py-5 rounded-full text-lg font-bold shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                立即報名預約 <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section id="highlights" className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24 space-y-4">
            <h2 className="font-serif-tc text-4xl md:text-5xl font-bold text-stone-900">活動三大亮點</h2>
            <div className="w-12 h-1 bg-amber-900 mx-auto rounded-full"></div>
            <p className="text-stone-500 max-w-xl mx-auto text-lg pt-4">不只是喝茶，這是一場關於感官與文化的深度對話</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {HIGHLIGHTS.map((item, idx) => (
              <div key={idx} className="group flex flex-col bg-stone-50 rounded-[2.5rem] overflow-hidden transition-all duration-500 border border-stone-100 hover:bg-white hover:shadow-2xl hover:-translate-y-2">
                <div className="h-80 overflow-hidden relative bg-stone-200 flex items-center justify-center">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 relative z-0" 
                    loading="eager"
                    onError={(e) => {
                      // 若載入失敗，優先切換到已經被驗證過可顯示的第二張圖片作為備援
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=1000&q=80';
                    }}
                  />
                  {/* Subtle clean bottom gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none"></div>
                </div>
                <div className="p-10 space-y-5 flex-1 flex flex-col justify-start">
                  <div className="w-16 h-16 bg-stone-900 text-white rounded-2xl shadow-lg flex items-center justify-center -mt-20 relative z-20 border-4 border-white group-hover:bg-amber-900 transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="font-serif-tc text-2xl font-bold text-stone-900 group-hover:text-amber-900 transition-colors">{item.title}</h3>
                  <p className="text-stone-600 leading-relaxed text-lg">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Details Section */}
      <section id="details" className="py-32 bg-stone-50">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-[3rem] shadow-sm overflow-hidden flex flex-col lg:flex-row border border-stone-200">
            <div className="lg:w-1/2 p-10 md:p-20 space-y-12">
              <div className="space-y-4">
                <h2 className="font-serif-tc text-4xl font-bold text-stone-900">活動細節與流程</h2>
                <p className="text-amber-900 font-bold tracking-widest uppercase text-sm">Professional Journey</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {INFO_ITEMS.map((item, idx) => (
                  <div key={idx} className="flex gap-5 items-start">
                    <div className="p-3 bg-stone-50 text-stone-900 rounded-xl border border-stone-100">
                      {React.cloneElement(item.icon as React.ReactElement<any>, { size: 20 })}
                    </div>
                    <div>
                      <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mb-1">{item.label}</p>
                      <p className="text-stone-900 font-bold">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-10 border-t border-stone-100 space-y-6">
                <button 
                  onClick={handleRegister}
                  className="w-full bg-stone-900 hover:bg-black text-white py-5 px-10 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-2xl"
                >
                  立即報名領取風味雷達 <ChevronRight size={20} />
                </button>
                <a 
                  href={EVENT_DATA.calendarUrl}
                  target="_blank"
                  className="w-full bg-stone-50 hover:bg-stone-100 text-stone-800 py-4 px-6 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all border border-stone-200"
                >
                  加到日曆提醒
                </a>
              </div>
            </div>
            
            <div className="lg:w-1/2 bg-stone-900 p-10 md:p-20 text-white flex flex-col justify-center">
              <div className="space-y-10">
                <h3 className="font-serif-tc text-2xl font-bold flex items-center gap-4">
                  <span className="w-10 h-0.5 bg-amber-900"></span> 活動日程表
                </h3>
                <div className="space-y-10">
                  {[
                    { time: '13:30 - 13:45', title: '茶席開展', desc: '入座、簡報領取與茶具介紹' },
                    { time: '13:45 - 14:45', title: '盲飲挑戰', desc: '8 版高品質茶款盲飲與感官評鑑' },
                    { time: '14:45 - 15:15', title: '揭曉與解密', desc: '江老師親自解碼 8 維度風味雷達' },
                    { time: '15:15 - 15:30', title: '交流結語', desc: '自由 QA 與學員限定優惠選購' }
                  ].map((step, idx) => (
                    <div key={idx} className="flex gap-6 relative">
                      {idx !== 3 && <div className="absolute left-[20px] top-10 w-[1px] h-10 bg-stone-700"></div>}
                      <div className="w-10 h-10 bg-amber-900 text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 relative z-10">
                        {idx + 1}
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold flex items-center gap-3">
                          <span className="text-stone-400 font-mono text-sm">{step.time}</span>
                          <span className="text-lg">{step.title}</span>
                        </p>
                        <p className="text-stone-400 text-sm">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 space-y-10">
              <div className="space-y-6">
                <h2 className="font-serif-tc text-4xl md:text-5xl font-bold text-stone-900">地點與交通</h2>
                <div className="space-y-4">
                  <p className="text-2xl font-bold text-stone-900">{EVENT_DATA.location}</p>
                  <p className="text-stone-500 text-lg flex items-start gap-3">
                    <MapPin className="shrink-0 mt-1 text-amber-900" size={24} />
                    {EVENT_DATA.address}
                  </p>
                </div>
              </div>
              
              <div className="p-8 bg-stone-50 rounded-[2rem] space-y-6 border border-stone-100">
                <h4 className="font-bold text-stone-900 tracking-widest uppercase text-sm">交通導引</h4>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xs uppercase">MRT</div>
                    <p className="text-stone-700 font-medium">北門站 3 號出口：步行約 10 分鐘</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold text-xs uppercase">MRT</div>
                    <p className="text-stone-700 font-medium">大橋頭站 1 號出口：步行約 15 分鐘</p>
                  </div>
                </div>
                <div className="pt-4">
                  <a 
                    href="https://maps.app.goo.gl/Yp6vM9vH9S8r6v9z6" 
                    target="_blank"
                    className="inline-flex items-center gap-2 text-stone-900 font-bold border-b-2 border-stone-900 pb-1 hover:text-amber-900 hover:border-amber-900 transition-all"
                  >
                    Google 地圖導航 <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 w-full h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-stone-50 relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.475453673752!2d121.50974797615636!3d25.051934937572763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a969f6e594df%3A0xe5a3c9a495764d0!2z6Ie65YyX5biC5aSn5ZCM5Y2A6L-q5YyW6KGX5LiA5q61NDblt7czMOmZnw!5e0!3m2!1szh-TW!2stw!4v1714545234567!5m2!1szh-TW!2stw" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                title="Google 地圖導覽"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-50 text-stone-600 py-24 border-t border-stone-200">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-20">
            <div className="space-y-8 max-w-sm">
              <h3 className="font-serif-tc text-3xl font-bold text-stone-900 tracking-wider">慕耕活 Morgan Hope</h3>
              <p className="text-stone-500 leading-relaxed font-medium">
                將大稻埕百年茶香與現代生活美學結合，透過盲飲挑戰，帶領每一位茶友找回最純粹的味覺感動。
              </p>
              <div className="flex gap-4">
                <a 
                  href="https://www.facebook.com/morganhope.tw/" 
                  target="_blank" 
                  className="w-12 h-12 bg-white border border-stone-200 rounded-full flex items-center justify-center hover:bg-stone-900 hover:text-white transition-all shadow-sm"
                >
                  <Facebook size={20} />
                </a>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-16 md:gap-24">
              <div className="space-y-6">
                <h4 className="font-bold uppercase text-[10px] tracking-widest text-stone-400">導航</h4>
                <ul className="space-y-4 text-stone-900 font-bold">
                  <li><a href="#hero" className="hover:text-amber-900 transition-colors">首頁</a></li>
                  <li><a href="#highlights" className="hover:text-amber-900 transition-colors">亮點</a></li>
                  <li><a href="#details" className="hover:text-amber-900 transition-colors">詳情</a></li>
                </ul>
              </div>
              <div className="space-y-6">
                <h4 className="font-bold uppercase text-[10px] tracking-widest text-stone-400">聯絡</h4>
                <ul className="space-y-4 text-stone-900 font-bold">
                  <li><a href="#" className="hover:text-amber-900 transition-colors">官方網站</a></li>
                  <li><a href="#" className="hover:text-amber-900 transition-colors">聯絡我們</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="pt-10 border-t border-stone-200 flex flex-col md:flex-row justify-between gap-6 text-xs text-stone-400 font-bold tracking-widest uppercase">
            <p>© 2025 Morgan Hope. Design for Tea Culture.</p>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      <div className={`fixed bottom-0 left-0 right-0 z-[60] p-4 bg-white/90 backdrop-blur-xl border-t border-stone-100 transition-transform duration-500 md:hidden ${showMobileCta ? 'translate-y-0' : 'translate-y-full'}`}>
        <button 
          onClick={handleRegister}
          className="w-full bg-stone-900 text-white py-4 rounded-xl font-bold shadow-lg active:scale-95 transition-transform"
        >
          立即報名盲飲會
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.4s; }
        .delay-400 { animation-delay: 0.6s; }
        .delay-500 { animation-delay: 0.8s; }
      `}} />
    </div>
  );
};

export default App;
