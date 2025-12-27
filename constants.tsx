
import React from 'react';
import { CupSoda, Compass, Gift, Clock, MapPin, Users, CircleDollarSign, CheckCircle2, AlertCircle } from 'lucide-react';

export const EVENT_DATA = {
  title: "【品茶會】盲飲挑戰：舌尖上的風味解密",
  subtitle: "探討 8 版以上茶風味細節，挑戰你的味蕾，揭曉價格與身分的真相。",
  date: "2026/01/27 (二)",
  time: "13:30 - 15:30",
  location: "慕耕活大稻埕店",
  address: "103 臺北市大同區迪化街一段 46 巷 30 號",
  price: 850,
  limit: "6 人開班，10 人滿班",
  registrationUrl: "https://www.morganhope.com.tw/products/tea-tasting-20251227",
  calendarUrl: "https://www.google.com/calendar/render?action=TEMPLATE&text=%E3%80%90%E5%93%81%E8%8C%B6%E6%9C%83%E3%80%91%E7%9B%B2%E9%A3%B2%E6%8C%91%E6%88%B0%E8%88%87%E9%A2%A8%E5%91%B3%E6%8E%A2%E7%B4%A2&dates=20260127T133000Z/20260127T153000Z&details=%E6%B7%B1%E5%85%A5%E6%8E%A2%E8%A8%8E%E8%87%B3%E5%B0%918%E7%89%88%E8%8C%B6%E7%9A%84%E9%A2%A8%E5%91%B3%E7%B4%B0%E7%AF%80%EF%BC%8C%E6%8F%AD%E6%91%90%E8%BA%AB%E4%BB%BD%E8%88%87%E5%83%B9%E6%A0%BC%E3%80%82&location=103%E8%87%BA%E5%8C%97%E5%B8%82%E5%A4%A7%E5%90%8C%E5%8D%80%E8%BF%AA%E5%8C%96%E8%A1%97%E4%B8%80%E6%AE%B546%E5%B7%B730%E8%99%9F"
};

export const HIGHLIGHTS = [
  {
    title: "盲飲評鑑",
    description: "不看茶名、不看價格，純粹靠感官決定你的喜好，在無干擾的狀態下挖掘最真實的味覺偏好。",
    icon: <CupSoda className="w-8 h-8 text-amber-900" />,
    image: "https://images.unsplash.com/photo-1597318181409-cf44d78a5e82?w=1000&q=80"
  },
  {
    title: "茶文化介紹",
    description: "深入大稻埕迪化街的茶香歲月，由職人解析台灣茶從產地到杯中的歷史底蘊與生活美學。",
    icon: <Compass className="w-8 h-8 text-amber-900" />,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=1000&q=80"
  },
  {
    title: "學員限定",
    description: "現場茶品提供限定分裝包，參賽學員獨享專屬優惠價，親自將心儀的職人滋味帶回家中品賞。",
    icon: <Gift className="w-8 h-8 text-amber-900" />,
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=1000&q=80"
  }
];

export const INFO_ITEMS = [
  { icon: <Clock />, label: "時間", value: `${EVENT_DATA.date} ${EVENT_DATA.time}` },
  { icon: <MapPin />, label: "地點", value: EVENT_DATA.location },
  { icon: <CircleDollarSign />, label: "費用", value: `TWD ${EVENT_DATA.price} / 人` },
  { icon: <Users />, label: "人數", value: EVENT_DATA.limit },
];

export const TAB_CONTENT = {
  agenda: [
    { time: '13:30 - 13:45', title: '茶席開展', desc: '入座、簡報領取與茶具介紹' },
    { time: '13:45 - 14:45', title: '盲飲挑戰', desc: '8 版高品質茶款盲飲與感官評鑑' },
    { time: '14:45 - 15:15', title: '揭曉與解密', desc: '江老師親自解碼 8 維度風味雷達' },
    { time: '15:15 - 15:30', title: '交流結語', desc: '自由 QA 與學員限定優惠選購' }
  ],
  rules: [
    { 
      type: 'recommend', 
      title: '推薦建議', 
      items: ['活動前 1 小時請勿食用辛辣食物', '建議穿著舒適衣物，避免濃烈香水', '可攜帶個人筆記本紀錄風味'],
      icon: <CheckCircle2 className="text-green-600" size={18} />
    },
    { 
      type: 'policy', 
      title: '取消政策', 
      items: ['7 天前取消退還 90%', '3 天前取消退還 50%', '當天取消恕不退費'],
      icon: <AlertCircle className="text-amber-600" size={18} />
    }
  ],
  faq: [
    { q: '我不懂茶也可以參加嗎？', a: '絕對可以！這是設計給所有感官愛好者的遊戲。' },
    { q: '費用包含哪些內容？', a: '包含 8 款茶品、講師費、場地費與專屬手冊。' },
    { q: '現場可以買茶嗎？', a: '可以，學員享有當天限定的分裝包優惠價格。' }
  ]
};