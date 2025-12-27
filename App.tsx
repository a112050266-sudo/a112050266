
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Facebook, MapPin, ArrowRight, Instagram, Twitter, 
  Send, Loader2, CheckCircle2, Copy, Check, 
  Clock, Users, ChevronDown
} from 'lucide-react';
import { EVENT_DATA, HIGHLIGHTS, TAB_CONTENT } from './constants';

const TARGET_DATE = new Date("2026-01-27T13:30:00+08:00").getTime();
const FB_URL = "https://www.facebook.com/morganhope.tw/?locale=zh_TW";

const CountdownCircle: React.FC<{ value: number, label: string, max: number }> = ({ value, label, max }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  // Ensure we don't divide by zero or go negative
  const safeValue = Math.max(0, Math.min(value, max));
  const strokeDashoffset = circumference - (safeValue / max) * circumference;

  return (
    <div className="flex flex-col items-center group">
      <div className="relative w-20 h-20 md:w-32 md:h-32 flex items-center justify-center">
        {/* 背景環 */}
        <svg className="absolute w-full h-full -rotate-90">
          <circle
            cx="50%" cy="50%" r={radius}
            className="fill-none stroke-white/5 stroke-[2]"
          />
          {/* 動態環 */}
          <circle
            cx="50%" cy="50%" r={radius}
            className="fill-none stroke-[#C5A059] stroke-[3] transition-all duration-1000 ease-linear"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="text-center z-10">
          <span className="text-2xl md:text-4xl font-playfair font-bold text-white block">
            {String(value).padStart(2, '0')}
          </span>
          <span className="text-[10px] tracking-[0.3em] font-bold text-stone-500 uppercase mt-1 block">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const calculateTimeLeft = useCallback(() => {
    const now = new Date().getTime();
    const diff = TARGET_DATE - now;
    if (diff > 0) {
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }, []);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [activeTab, setActiveTab] = useState('agenda');
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Immediate update
    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      const updated = calculateTimeLeft();
      setTimeLeft(updated);
    }, 1000);
    
    const scrollHandler = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', scrollHandler);
    
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [calculateTimeLeft]);

  return (
    <div className="min-h-screen selection:bg-[#C5A059] selection:text-black">
      {/* 導覽列 */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 py-4' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border border-[#C5A059] flex items-center justify-center text-[#C5A059] font-playfair font-bold rotate-45 group hover:bg-[#C5A059] hover:text-black transition-all cursor-pointer">
              <span className="-rotate-45">M</span>
            </div>
            <h1 className="font-serif-tc text-xl font-bold tracking-[0.2em] text-white">慕耕活</h1>
          </div>
          <div className="hidden md:flex gap-10 items-center">
            {['HIGHLIGHTS', 'RITUAL', 'RESERVE'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-bold tracking-[0.4em] text-white/50 hover:text-[#C5A059] transition-colors uppercase">{item}</a>
            ))}
            <button className="bg-white/5 hover:bg-white/10 border border-white/20 text-white px-6 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] transition-all">SHOP ONLINE</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* 背景光暈動畫 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#1B2B23] rounded-full blur-[160px] opacity-30 animate-pulse"></div>
        
        <div className="relative z-10 space-y-8 animate-fade-in-up">
          <p className="text-[#C5A059] text-xs font-bold tracking-[0.6em] uppercase">Private Blind Tasting Workshop • 2026</p>
          <h2 className="text-6xl md:text-9xl font-serif-tc font-bold text-white leading-tight">
            舌尖上的<br /><span className="italic font-playfair text-[#C5A059]">Alchemy</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto font-light leading-relaxed tracking-wide">
            在光影流動的深夜，我們邀請您開啟一場感官冒險。褪去包裝，唯有風味是唯一的真實。
          </p>

          {/* 動態倒數計時 */}
          <div className="flex justify-center gap-4 md:gap-12 py-10">
            <CountdownCircle value={timeLeft.days} label="Days" max={365} />
            <CountdownCircle value={timeLeft.hours} label="Hours" max={24} />
            <CountdownCircle value={timeLeft.minutes} label="Mins" max={60} />
            <CountdownCircle value={timeLeft.seconds} label="Secs" max={60} />
          </div>

          <a href="#reserve" className="inline-flex items-center gap-4 bg-[#C5A059] text-black px-12 py-5 rounded-full font-bold text-sm tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-[#C5A059]/20">
            立即預約席位 <ArrowRight size={18} />
          </a>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-white/20" />
        </div>
      </section>

      {/* Highlights */}
      <section id="highlights" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="space-y-4">
              <h3 className="text-[#C5A059] text-xs font-bold tracking-[0.5em] uppercase">The Experience</h3>
              <h2 className="text-4xl md:text-6xl font-serif-tc font-bold text-white">盲飲之美</h2>
            </div>
            <div className="max-w-md text-white/30 text-sm leading-relaxed">
              當視覺被剝奪，味蕾將會覺醒。我們精選 8 款各具特色的茶品，在無標籤的狀態下，帶領您建立私人的風味地圖。
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {HIGHLIGHTS.map((item, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-3xl bg-white/[0.02] border border-white/5 hover:border-[#C5A059]/30 transition-all duration-700">
                <div className="h-[400px] overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F0D] via-[#0A0F0D]/40 to-transparent p-10 flex flex-col justify-end">
                  <h4 className="text-2xl font-serif-tc font-bold text-white mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">{item.title}</h4>
                  <p className="text-white/40 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ritual (Content Tabs) */}
      <section id="ritual" className="py-32 bg-[#060A08]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center gap-8 md:gap-20 mb-20">
              {[
                { id: 'agenda', label: '流程' },
                { id: 'rules', label: '須知' },
                { id: 'faq', label: '問答' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative pb-4 text-xs font-bold tracking-[0.4em] transition-colors ${activeTab === tab.id ? 'text-[#C5A059]' : 'text-white/20'}`}
                >
                  {tab.label}
                  {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C5A059] animate-expand"></div>}
                </button>
              ))}
            </div>

            <div className="min-h-[400px] bg-white/[0.02] border border-white/5 p-8 md:p-16 rounded-[40px] backdrop-blur-md">
              {activeTab === 'agenda' && (
                <div className="space-y-12 animate-fade-in">
                  {TAB_CONTENT.agenda.map((item, i) => (
                    <div key={i} className="flex gap-8 group">
                      <div className="text-[#C5A059] font-playfair text-lg opacity-50 group-hover:opacity-100 transition-opacity">{item.time}</div>
                      <div className="space-y-2">
                        <h5 className="text-xl font-serif-tc font-bold text-white">{item.title}</h5>
                        <p className="text-white/30 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'rules' && (
                <div className="grid md:grid-cols-2 gap-10 animate-fade-in">
                  <div className="space-y-6">
                    <h5 className="text-[#C5A059] font-bold text-sm tracking-widest uppercase">注意事項</h5>
                    <ul className="space-y-4 text-white/40 text-sm font-light">
                      <li>• 建議活動前兩小時禁食強烈風味食物</li>
                      <li>• 現場備有氣泡水以供清口使用</li>
                      <li>• 請勿噴灑濃烈香水參與活動</li>
                    </ul>
                  </div>
                  <div className="space-y-6">
                    <h5 className="text-[#C5A059] font-bold text-sm tracking-widest uppercase">取消政策</h5>
                    <p className="text-white/40 text-sm font-light leading-relaxed">
                      活動日前 7 天取消全額退費，3 天內取消退還 50%，當日取消恕不退費但可轉讓。
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'faq' && (
                <div className="space-y-8 animate-fade-in">
                  {TAB_CONTENT.faq.map((item, i) => (
                    <div key={i} className="space-y-2 border-b border-white/5 pb-8 last:border-0">
                      <h5 className="text-white font-bold">Q: {item.q}</h5>
                      <p className="text-white/30 text-sm font-light leading-relaxed">A: {item.a}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Reserve Form */}
      <section id="reserve" className="py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
              <h2 className="text-5xl md:text-7xl font-serif-tc font-bold text-white">啟動您的<br /><span className="text-[#C5A059]">味覺實驗</span></h2>
              <div className="grid grid-cols-2 gap-8 pt-8">
                <div>
                  <Clock className="text-[#C5A059] mb-4 mx-auto lg:mx-0" />
                  <p className="text-xs font-bold text-white/30 tracking-widest uppercase mb-1">Duration</p>
                  <p className="text-white font-bold">120 Minutes</p>
                </div>
                <div>
                  <Users className="text-[#C5A059] mb-4 mx-auto lg:mx-0" />
                  <p className="text-xs font-bold text-white/30 tracking-widest uppercase mb-1">Exclusive</p>
                  <p className="text-white font-bold">Max 10 Persons</p>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 w-full">
              <div className="bg-white/[0.03] border border-white/10 p-10 rounded-[50px] backdrop-blur-3xl">
                {formStatus === 'success' ? (
                  <div className="text-center py-20 space-y-6">
                    <div className="w-20 h-20 bg-[#C5A059]/10 text-[#C5A059] rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-2xl font-serif-tc font-bold text-white">預約已送出</h3>
                    <p className="text-white/40">我們的侍茶師將儘速與您確認席位。</p>
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setFormStatus('loading'); setTimeout(() => setFormStatus('success'), 1500); }} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em] ml-2">Guest Name</label>
                      <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#C5A059] transition-all" placeholder="請輸入姓名" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em] ml-2">Email Address</label>
                      <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#C5A059] transition-all" placeholder="example@gmail.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em] ml-2">Message</label>
                      <textarea required rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#C5A059] transition-all resize-none" placeholder="特殊飲食需求或詢問..."></textarea>
                    </div>
                    <button disabled={formStatus === 'loading'} className="w-full bg-[#C5A059] text-black py-5 rounded-2xl font-bold tracking-[0.2em] shadow-xl hover:bg-[#d4b46c] transition-all flex items-center justify-center gap-3">
                      {formStatus === 'loading' ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                      SEND RESERVATION
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10 text-center md:text-left">
          <div className="space-y-4">
            <h3 className="text-2xl font-serif-tc font-bold text-white">慕耕活 <span className="text-[#C5A059]">Morgan Hope</span></h3>
            <p className="text-white/20 text-xs tracking-widest uppercase">SINCE 2025 • TEA ETHOS • BLIND TASTING</p>
          </div>
          <div className="flex gap-8">
            <a href={FB_URL} target="_blank" rel="noopener noreferrer" className="group">
              <Facebook className="text-white/20 group-hover:text-[#C5A059] cursor-pointer transition-colors" />
            </a>
            <Instagram className="text-white/20 hover:text-[#C5A059] cursor-pointer transition-colors" />
            <Twitter className="text-white/20 hover:text-[#C5A059] cursor-pointer transition-colors" />
          </div>
          <p className="text-white/20 text-[10px] font-bold tracking-widest uppercase">© 2026 MORGAN HOPE STUDIO. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes expand {
          from { width: 0; left: 50%; }
          to { width: 100%; left: 0; }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1.2s cubic-bezier(0.2, 1, 0.3, 1) forwards;
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-expand {
          animation: expand 0.5s ease-out forwards;
        }
      `}} />
    </div>
  );
};

export default App;