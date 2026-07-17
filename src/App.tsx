import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Flame, 
  ShieldCheck, 
  Sparkles, 
  ChevronRight, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Menu, 
  X, 
  Check, 
  ExternalLink,
  ChevronDown,
  Package,
  Gift,
  Layers
} from "lucide-react";

// Types for components and state
interface Testimonial {
  id: number;
  stars: number;
  quote: string;
  author: string;
  role: string;
}

interface CertModalData {
  badge: string;
  title: string;
  desc: string;
  seal: string;
  date: string;
}

interface Product {
  id: number;
  name: string;
  engName: string;
  tag: string;
  category: "signature" | "gift";
  particleSize: string;
  capacity: string;
  price: string;
  features: string[];
  recommendations: string[];
  specs: { label: string; value: string }[];
  particleType: "fine" | "coarse" | "gift";
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "빛소금 시그니처 300 (고운입자)",
    engName: "Signature 300 / Fine Powder",
    tag: "Daily Wellness Ritual",
    category: "signature",
    particleSize: "0.3mm 이하 초미세 입자",
    capacity: "120g / 250g 유리 보틀",
    price: "38,000원 / 68,000원",
    features: [
      "눈처럼 부드럽고 가벼운 분말 타입",
      "미온수에 넣는 즉시 흔적 없이 빠르게 용해",
      "순수하고 깔끔한 맛으로 체내 빠른 수분 보충"
    ],
    recommendations: [
      "매일 아침 공복 미온수에 빛소금 1~2g 음용",
      "미네랄 구강 세척 및 코 세척용 리추얼",
      "천연 소금 성분 그대로 아기 이유식 밑간"
    ],
    specs: [
      { label: "제품 구분", value: "특허 가공 용융소금" },
      { label: "원산지", value: "국산 100% (신안 천일염)" },
      { label: "가공 방식", value: "1000°C 30시간 특허 용융" },
      { label: "pH 지수", value: "pH 7.4 약알칼리성" }
    ],
    particleType: "fine"
  },
  {
    id: 2,
    name: "빛소금 시그니처 1000 (굵은입자)",
    engName: "Signature 1000 / Dining Crystal",
    tag: "Luxury Fine Dining",
    category: "signature",
    particleSize: "1.0mm 내외 보석 결정",
    capacity: "120g / 250g 유리 보틀",
    price: "38,000원 / 68,000원",
    features: [
      "보석처럼 투명하고 고결하게 빛나는 천연 결정",
      "재료 고유의 맛을 완벽히 살려주는 고품격 단맛",
      "입안에서 기분 좋게 씹히는 고급스러운 텍스처"
    ],
    recommendations: [
      "최고급 한우 스테이크 및 바베큐 플레이팅 가니쉬",
      "프렌치 다이닝 샐러드 드레싱 및 무침 마감",
      "담백하고 깊은 풍미를 자아내는 맑은 탕 요리"
    ],
    specs: [
      { label: "제품 구분", value: "특허 가공 용융소금" },
      { label: "원산지", value: "국산 100% (신안 천일염)" },
      { label: "가공 방식", value: "1000°C 30시간 특허 용융" },
      { label: "pH 지수", value: "pH 7.4 약알칼리성" }
    ],
    particleType: "coarse"
  },
  {
    id: 3,
    name: "빛소금 웰니스 기프트 세트",
    engName: "Wellness Master Gift Set",
    tag: "Premium VIP Gift",
    category: "gift",
    particleSize: "시그니처 300(120g) + 1000(120g) 수납",
    capacity: "2구 품격 패키지 + 친환경 우드 스푼",
    price: "82,000원 (전용 보자기 포장 포함)",
    features: [
      "빛소금의 핵심 두 입자 타입을 모두 소장하는 품격",
      "자외선 차단 앰버 스페셜 유리용기 및 나무 디쉬 스푼",
      "수작업으로 감싼 실크 보자기와 하드케이스 패키지"
    ],
    recommendations: [
      "사랑하는 부모님과 소중한 은사님을 위한 건강 선물",
      "고급 예단, 이사/집들이 격식 있는 답례 선물",
      "기업 VIP 고객 사은 선물 및 프리미엄 비즈니스 기프트"
    ],
    specs: [
      { label: "구성품", value: "시그니처 300 120g, 시그니처 1000 120g, 나무 스푼" },
      { label: "포장 형태", value: "고급 한지 기프트 박스, 전통 보자기 매듭" },
      { label: "용기 크기", value: "65mm * 65mm * 110mm (개별)" },
      { label: "유통 기한", value: "정제 소금의 특성상 반영구적 보존 가능" }
    ],
    particleType: "gift"
  }
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");
  const [modalType, setModalType] = useState<string | null>(null);
  
  // Product showcase states
  const [productTab, setProductTab] = useState<"all" | "signature" | "gift">("all");
  const [expandedProduct, setExpandedProduct] = useState<number | null>(null);
  
  // Inquiry form state
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [inquiryType, setInquiryType] = useState("individual");
  const [userMessage, setUserMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Scroll event to handle sticky header shadow
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      stars: 5,
      quote: "매일 아침 미온수에 빛소금을 마신 지 세 달째, 몸의 가벼움이 완전히 다릅니다. 미세플라스틱 걱정이 없어 정말 안심됩니다.",
      author: "김지민",
      role: "요가 스튜디오 원장 / 웰니스 인플루언서"
    },
    {
      id: 2,
      stars: 5,
      quote: "씁쓸한 뒷맛 없이 담백하고 깊은 감칠맛을 내어 줍니다. 요리에 건강한 품격을 확실히 더해 줍니다.",
      author: "이현우",
      role: "미쉐린 컨설팅 푸드 칼럼니스트"
    },
    {
      id: 3,
      stars: 5,
      quote: "1000°C로 정제해 중금속 걱정이 전혀 없고 몸의 붓기가 눈에 띄게 줄어들었습니다. 아침이 매일 가볍고 상쾌합니다.",
      author: "박서연",
      role: "슬로우 라이프 매거진 에디터"
    }
  ];

  const modalData: Record<string, CertModalData> = {
    ktr: {
      badge: "TEST REPORT",
      title: "KTR 중금속 성분 검증서",
      desc: "시험기관: KTR (한국화학융합시험연구원)\n\n[검사 결과]\n• 납 (Pb) : 불검출 (N.D)\n• 카드뮴 (Cd) : 불검출 (N.D)\n• 비소 (As) : 불검출 (N.D)\n• 수은 (Hg) : 불검출 (N.D)\n\n* 중금속 무검출로 검증된 최상위 안전 등급 품질을 보증합니다.",
      seal: "KTR\n검인필",
      date: "2026. 05. 24"
    },
    plastic: {
      badge: "PLASTIC FREE",
      title: "나노 플라스틱 불검출 성적",
      desc: "시험분석: 첨단 나노-FTIR 분광 기술 진단\n\n[미세플라스틱 제거 검증]\n• 100μm 이상 입자 : 0개 검출 (완벽 제거)\n• 10μm ~ 100μm 입자 : 0개 검출 (완벽 제거)\n• 1μm 미만 나노입자 : 불검출 (100% 열분해)\n\n* 1000°C 초고온 정제를 통해 유해 미세플라스틱 잔존 우려를 완벽히 종식하였습니다.",
      seal: "ZERO\nPLASTIC",
      date: "2026. 06. 11"
    },
    fda: {
      badge: "FDA REGISTERED",
      title: "미국 FDA 시설 등록 인증",
      desc: "등록시설: 주식회사 빛소금 라이프 제1정밀 제조원\n\n[식품안전성 공정 평가 결과]\n• ISO 22000 (식품안전경영시스템) 인증 획득\n• HACCP 안전 규격을 만족하는 무인 포장 제어 공정\n• 세라믹 완전 밀봉 보존 기술 적용\n\n* 글로벌 최고 규격의 위생 제조 및 가공 절차 준수 공장을 인증합니다.",
      seal: "FDA\nFACILITY",
      date: "2026. 04. 19"
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate secure API Post submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1800);
  };

  const resetForm = () => {
    setUserName("");
    setUserPhone("");
    setUserEmail("");
    setInquiryType("individual");
    setUserMessage("");
    setIsSuccess(false);
  };

  const getInquiryTypeText = (val: string) => {
    switch (val) {
      case "individual": return "개인 정기구독";
      case "bulk": return "대량 선물세트 구매";
      case "partnership": return "원료 납품/도매 비즈니스";
      default: return "기타 제휴 문의";
    }
  };

  const handleSelectProductForInquiry = (productName: string, category: string) => {
    setActiveTab("inquiry");
    const inquirySec = document.getElementById("inquiry");
    if (inquirySec) {
      inquirySec.scrollIntoView({ behavior: "smooth" });
    }
    
    if (category === "gift") {
      setInquiryType("bulk");
    } else {
      setInquiryType("individual");
    }
    
    setUserMessage(`안녕하세요! 빛소금 라이프 시그니처 대표 제품인 [${productName}]에 대한 상세 상담 및 구매 문의를 신청합니다.`);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827] font-sans antialiased selection:bg-[#D97706] selection:text-white">
      {/* HEADER NAVIGATION */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#111827]/10 py-4" : "bg-[#F9FAFB]/90 backdrop-blur-sm py-6"
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <a href="#hero" className="flex flex-col select-none group" onClick={() => setActiveTab("hero")}>
            <span className="text-2xl md:text-3xl font-black tracking-tighter leading-none text-[#111827] group-hover:text-[#D97706] transition-colors duration-200">
              BIT SALT LIFE
            </span>
            <span className="text-[10px] tracking-[0.4em] font-medium text-[#D97706] mt-1 uppercase">
              빛소금 라이프
            </span>
          </a>

          {/* Navigation Links for Desktop */}
          <nav className="hidden md:flex gap-8 text-[11px] uppercase tracking-[0.2em] font-bold text-[#6B7280]">
            <a 
              href="#philosophy" 
              className={`hover:text-[#D97706] transition-colors ${activeTab === "philosophy" ? "text-[#111827]" : ""}`}
              onClick={() => setActiveTab("philosophy")}
            >
              Philosophy
            </a>
            <a 
              href="#process" 
              className={`hover:text-[#D97706] transition-colors ${activeTab === "process" ? "text-[#111827]" : ""}`}
              onClick={() => setActiveTab("process")}
            >
              The Process
            </a>
            <a 
              href="#products" 
              className={`hover:text-[#D97706] transition-colors ${activeTab === "products" ? "text-[#111827]" : ""}`}
              onClick={() => setActiveTab("products")}
            >
              Products
            </a>
            <a 
              href="#trust" 
              className={`hover:text-[#D97706] transition-colors ${activeTab === "trust" ? "text-[#111827]" : ""}`}
              onClick={() => setActiveTab("trust")}
            >
              Trust
            </a>
            <a 
              href="#inquiry" 
              className={`hover:text-[#D97706] transition-colors ${activeTab === "inquiry" ? "text-[#111827]" : ""}`}
              onClick={() => setActiveTab("inquiry")}
            >
              Inquiry
            </a>
          </nav>

          {/* Right Action Button */}
          <div className="hidden md:block">
            <a 
              href="#inquiry" 
              className="bg-[#111827] text-white px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#D97706] hover:text-white transition-all transform hover:-translate-y-0.5"
            >
              Contact Us
            </a>
          </div>

          {/* Mobile Hamburger menu */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="md:hidden p-2 text-[#111827] hover:text-[#D97706] transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 w-full bg-white border-b border-[#111827]/10 py-6 px-8 flex flex-col gap-4 shadow-lg md:hidden"
            >
              <a 
                href="#philosophy" 
                className="text-xs uppercase tracking-widest font-bold text-[#111827] py-2 border-b border-gray-100 hover:text-[#D97706]"
                onClick={() => { setMenuOpen(false); setActiveTab("philosophy"); }}
              >
                Philosophy
              </a>
              <a 
                href="#process" 
                className="text-xs uppercase tracking-widest font-bold text-[#111827] py-2 border-b border-gray-100 hover:text-[#D97706]"
                onClick={() => { setMenuOpen(false); setActiveTab("process"); }}
              >
                The Process
              </a>
              <a 
                href="#products" 
                className="text-xs uppercase tracking-widest font-bold text-[#111827] py-2 border-b border-gray-100 hover:text-[#D97706]"
                onClick={() => { setMenuOpen(false); setActiveTab("products"); }}
              >
                Products
              </a>
              <a 
                href="#trust" 
                className="text-xs uppercase tracking-widest font-bold text-[#111827] py-2 border-b border-gray-100 hover:text-[#D97706]"
                onClick={() => { setMenuOpen(false); setActiveTab("trust"); }}
              >
                Trust
              </a>
              <a 
                href="#inquiry" 
                className="text-xs uppercase tracking-widest font-bold text-[#111827] py-2 hover:text-[#D97706]"
                onClick={() => { setMenuOpen(false); setActiveTab("inquiry"); }}
              >
                Inquiry
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="relative pt-32 pb-24 md:pt-48 md:pb-36 overflow-hidden">
        {/* Subtle Decorative Geometric Lines for Bold Typography Theme */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.02] pointer-events-none hidden lg:block">
          <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none">
            <line x1="100" y1="0" x2="100" y2="400" stroke="#111827" strokeWidth="1" />
            <line x1="300" y1="0" x2="300" y2="400" stroke="#111827" strokeWidth="1" />
            <circle cx="200" cy="200" r="100" stroke="#111827" strokeWidth="1" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Main Banner (8 Columns) */}
            <div className="lg:col-span-8 flex flex-col justify-between h-full">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-[1px] w-12 bg-[#D97706]"></div>
                  <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#D97706]">
                    PREMIUM MOLTEN SALT
                  </span>
                </div>

                {/* Dramatic Display Heading aligned to Bold Typography instruction */}
                <h1 className="text-[52px] sm:text-[76px] lg:text-[110px] font-serif leading-[0.85] tracking-tight text-[#111827] italic mb-8 select-none">
                  1000°C<br />Pure Essence
                </h1>

                <p className="text-lg md:text-xl text-[#6B7280] max-w-xl leading-relaxed font-light mb-10">
                  미세플라스틱과 중금속 걱정 없는 깨끗한 1000°C 용융소금.<br />
                  <span className="text-[#111827] font-medium">하루 한 잔으로 더하는 순수 웰니스 리추얼.</span>
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="#inquiry" 
                    className="bg-[#111827] text-white text-center px-10 py-5 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#D97706] hover:text-white transition-all transform hover:-translate-y-0.5 shadow-md"
                  >
                    Shop The Collection
                  </a>
                  <a 
                    href="#trust" 
                    className="border border-[#111827] text-center text-[#111827] px-10 py-5 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#111827] hover:text-white transition-all"
                  >
                    View Test Reports
                  </a>
                </div>
              </motion.div>

              {/* Stat Cards - Preserving layout as requested */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="grid grid-cols-3 gap-6 pt-16 mt-16 border-t border-[#111827]/10"
              >
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#D97706] font-bold">Purity Rate</span>
                  <div className="text-3xl md:text-4xl font-serif text-[#111827]">99.9%</div>
                  <p className="text-[11px] text-[#6B7280] leading-snug">어떠한 첨가물도 허용하지 않는 정직한 공정</p>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#D97706] font-bold">Process Temp</span>
                  <div className="text-3xl md:text-4xl font-serif text-[#111827]">1000°C</div>
                  <p className="text-[11px] text-[#6B7280] leading-snug">유해 성분을 완벽히 기화시키는 고온 용융</p>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#D97706] font-bold">Wellness</span>
                  <div className="text-3xl md:text-4xl font-serif text-[#111827]">Daily</div>
                  <p className="text-[11px] text-[#6B7280] leading-snug">매일 물 한 잔에 더하는 깨끗한 활력</p>
                </div>
              </motion.div>
            </div>

            {/* Right Card Sidebar (4 Columns) */}
            <div className="lg:col-span-4 flex flex-col gap-6 w-full">
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="bg-white border border-[#111827]/5 p-8 shadow-[40px_40px_80px_-40px_rgba(0,0,0,0.1)] relative overflow-hidden flex-1 rounded-sm"
              >
                {/* Decorative Subtle Ring */}
                <svg className="absolute top-0 right-0 opacity-[0.03] w-64 h-64 -mr-16 -mt-16 text-[#111827]" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="currentColor" fill="none" strokeWidth="0.5" />
                </svg>

                <h3 className="text-[11px] uppercase tracking-widest font-black mb-10 border-b border-[#D97706] pb-2 inline-block text-[#111827]">
                  Scientific Trust
                </h3>

                <div className="space-y-8 relative z-10">
                  <div className="flex items-start gap-4 group">
                    <div className="w-1 bg-[#D97706] h-12 transition-all duration-300 group-hover:h-16"></div>
                    <div>
                      <h4 className="font-bold text-sm mb-1 text-[#111827]">중금속·미세플라스틱 0%</h4>
                      <p className="text-xs text-[#6B7280] leading-relaxed">
                        엄격한 국가공인기관 검사를 마친 안전한 소금입니다.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-1 bg-[#D97706] h-12 transition-all duration-300 group-hover:h-16"></div>
                    <div>
                      <h4 className="font-bold text-sm mb-1 text-[#111827]">프리미엄 차광 세라믹 용기</h4>
                      <p className="text-xs text-[#6B7280] leading-relaxed">
                        자외선과 습기를 오롯이 차단하여 처음의 순수함을 간직합니다.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-1 bg-[#D97706] h-12 transition-all duration-300 group-hover:h-16"></div>
                    <div>
                      <h4 className="font-bold text-sm mb-1 text-[#111827]">30시간 특허 용융 공법</h4>
                      <p className="text-xs text-[#6B7280] leading-relaxed">
                        밀폐형 용융로에서 1000°C 고온으로 본질만을 정제합니다.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Compact Floating Lead CTA Box for aesthetics */}
              <div className="bg-[#111827] p-8 text-white rounded-sm relative overflow-hidden shadow-lg flex flex-col justify-between">
                <div>
                  <h3 className="text-[11px] uppercase tracking-widest font-bold text-[#D97706] mb-2">
                    Direct Channel
                  </h3>
                  <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                    빛소금 라이프의 프리미엄 혜택을 1:1 상담을 통해 만나보세요.
                  </p>
                </div>
                <a 
                  href="#inquiry" 
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#D97706] hover:text-white transition-colors duration-200"
                >
                  상담 신청하기 <ChevronRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BRAND PHILOSOPHY & CORE VALUES */}
      <section id="philosophy" className="py-24 bg-white border-t border-b border-[#111827]/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#D97706] block mb-3">
              Brand Values
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-[#111827] mb-6">
              Core Values
            </h2>
            <div className="h-[2px] w-12 bg-[#D97706] mx-auto mb-6"></div>
            <p className="text-[#6B7280] text-sm md:text-base leading-relaxed">
              조미료의 한계를 뛰어넘어, 타협 없는 안전 기준과 기술력으로 건강한 삶의 기초를 세웁니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Value 1 */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="p-8 md:p-10 border-t-2 border-[#111827] bg-[#FDFBF7] hover:bg-white transition-all duration-300 relative flex flex-col justify-between overflow-hidden shadow-xs group"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] font-mono tracking-widest text-[#D97706] font-bold">01 / TEMPERATURE</span>
                  <Flame size={18} className="text-[#D97706]" />
                </div>
                
                {/* Giant typography */}
                <div className="relative mb-6 select-none">
                  <span className="block text-6xl lg:text-7xl font-black tracking-tighter text-[#111827] leading-none font-sans group-hover:text-[#D97706] transition-colors duration-500">
                    1000°C
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-[#111827] tracking-tight">1000°C 초고온 용융</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed max-w-xs">
                  30시간 특허 가공 공정으로 미세플라스틱, 중금속, 가스 성분을 완벽히 정제 및 기화 분리합니다.
                </p>
              </div>
              <div className="mt-8 h-[1px] w-full bg-[#111827]/10 group-hover:bg-[#D97706]/30 transition-colors duration-300"></div>
            </motion.div>

            {/* Value 2 */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="p-8 md:p-10 border-t-2 border-[#111827] bg-[#FDFBF7] hover:bg-white transition-all duration-300 relative flex flex-col justify-between overflow-hidden shadow-xs group"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] font-mono tracking-widest text-[#D97706] font-bold">02 / PURITY</span>
                  <ShieldCheck size={18} className="text-[#D97706]" />
                </div>
                
                {/* Giant typography */}
                <div className="relative mb-6 select-none">
                  <span className="block text-6xl lg:text-7xl font-black tracking-tighter text-[#111827] leading-none font-sans group-hover:text-[#D97706] transition-colors duration-500">
                    99.9%
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-[#111827] tracking-tight">99.9% 순수 결정</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed max-w-xs">
                  인공 첨가제나 고결 방지제 없이, 인체에 무해한 순수하고 정직한 명품 소금을 제공합니다.
                </p>
              </div>
              <div className="mt-8 h-[1px] w-full bg-[#111827]/10 group-hover:bg-[#D97706]/30 transition-colors duration-300"></div>
            </motion.div>

            {/* Value 3 */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="p-8 md:p-10 border-t-2 border-[#111827] bg-[#FDFBF7] hover:bg-white transition-all duration-300 relative flex flex-col justify-between overflow-hidden shadow-xs group"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] font-mono tracking-widest text-[#D97706] font-bold">03 / HARMONY</span>
                  <Sparkles size={18} className="text-[#D97706]" />
                </div>
                
                {/* Giant typography */}
                <div className="relative mb-6 select-none">
                  <span className="block text-5xl lg:text-6xl font-black tracking-tighter text-[#111827] leading-none font-sans uppercase group-hover:text-[#D97706] transition-colors duration-500 py-1">
                    WELLNESS
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-[#111827] tracking-tight">웰니스 리추얼</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed max-w-xs">
                  아침 미온수 한 잔의 웰니스부터 식탁 위의 격조 높은 깊이까지, 일상의 밸런스를 이끌어냅니다.
                </p>
              </div>
              <div className="mt-8 h-[1px] w-full bg-[#111827]/10 group-hover:bg-[#D97706]/30 transition-colors duration-300"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MANUFACTURING PROCESS & SCIENTIFIC SHOWCASE */}
      <section id="process" className="py-24 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Section title */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#D97706] block mb-3">
              Craftsmanship
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-[#111827] mb-6">
              The Process
            </h2>
            <div className="h-[2px] w-12 bg-[#D97706] mx-auto mb-6"></div>
            <p className="text-[#6B7280] text-sm md:text-base leading-relaxed">
              원재료 검수부터 초고온 분광 융해까지, 격이 다른 순수함을 완성하는 최적의 공정입니다.
            </p>
          </div>

          {/* Row 1: The Purification */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-24">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-widest text-[#D97706] font-bold block">
                The Purification
              </span>
              <h3 className="text-2xl md:text-4xl font-serif text-[#111827] font-bold leading-tight">
                오염 물질을 완전히 날리는 고온 정제
              </h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                해양 오염으로 인한 미세플라스틱이나 중금속 우려를 근본적으로 해소하기 위해 1000°C 이상의 초고온 특허 용융을 선택했습니다.
              </p>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                소금의 영양과 미네랄은 온전히 유지하면서 불순물만을 날려보내는 30시간의 정성으로 맑고 정직한 소금만을 추출해 냅니다.
              </p>
            </div>

            {/* Row 1 Column 2: Purification Visual */}
            <div className="lg:col-span-6 relative flex items-center justify-center min-h-[300px] bg-[#111827] p-8 rounded-sm overflow-hidden shadow-lg">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <pattern id="grid-heat-2" width="15" height="15" patternUnits="userSpaceOnUse">
                    <rect width="15" height="15" fill="none" stroke="red" strokeWidth="0.5" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#grid-heat-2)" />
                </svg>
              </div>
              <div className="text-center z-10 space-y-4">
                <div className="relative inline-block">
                  <div className="w-24 h-24 rounded-full border border-[#D97706]/40 flex items-center justify-center animate-[spin_20s_linear_infinite]" />
                  <div className="absolute inset-2 rounded-full border border-dashed border-[#D97706]/20 flex items-center justify-center animate-[spin_10s_linear_infinite]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Flame size={32} className="text-[#D97706] animate-pulse" />
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D97706] font-bold block">PATENTED PROCESS</span>
                  <h4 className="text-white text-base font-bold font-serif">1000°C Thermal Dissolution</h4>
                  <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">
                    유해 가스, 미세 플라스틱, 아황산가스 등의 불순물을 완전히 기화시키고 순수 NaCl 성분만 결정화합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: The Particles */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-widest text-[#D97706] font-bold block">
                The Particles
              </span>
              <h3 className="text-2xl md:text-4xl font-serif text-[#111827] font-bold leading-tight">
                용도와 리추얼에 따른 입자 설계
              </h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                빛소금은 일상의 모든 순간에 녹아들 수 있도록 가장 이상적인 두 가지 입자 크기로 맞춤 설계되었습니다. 아침을 깨우는 한 잔의 소금물부터 저녁 식탁 위의 파인 다이닝까지, 완벽한 조화를 선사합니다.
              </p>

              {/* Cards Container */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                <div className="p-6 bg-white border border-[#111827]/10 rounded-sm hover:border-[#D97706] transition-colors duration-300">
                  <h4 className="font-bold text-sm text-[#111827] flex items-center justify-between mb-2">
                    <span>시그니처 300 (고운입자)</span>
                    <span className="text-xs text-[#D97706] font-serif font-light">Wellness Ritual</span>
                  </h4>
                  <p className="text-xs text-[#6B7280] leading-relaxed">
                    소금처럼 곱고 빠르게 용해됩니다. 아침 공복 소금물 섭취 및 가벼운 데일리 음용 습관에 최적화되었습니다.
                  </p>
                </div>

                <div className="p-6 bg-white border border-[#111827]/10 rounded-sm hover:border-[#D97706] transition-colors duration-300">
                  <h4 className="font-bold text-sm text-[#111827] flex items-center justify-between mb-2">
                    <span>시그니처 1000 (굵은입자)</span>
                    <span className="text-xs text-[#D97706] font-serif font-light">Fine Dining</span>
                  </h4>
                  <p className="text-xs text-[#6B7280] leading-relaxed">
                    투명한 보석 같은 결정을 자랑합니다. 최고급 스테이크 플레이팅, 고급 가니쉬 등 격조 높은 다이닝 요리에 잘 어우러집니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Premium Visual Packaging Showcase */}
            <div className="lg:col-span-6 bg-[#111827] text-white p-12 rounded-sm flex flex-col items-center justify-center relative min-h-[400px] shadow-lg overflow-hidden">
              <div className="absolute top-4 left-4 text-[#D97706] text-[9px] uppercase tracking-widest font-bold px-3 py-1.5 border border-[#D97706]/30 rounded-sm">
                Signature Packaging
              </div>

              {/* Decorative background grid */}
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <rect width="20" height="20" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* Styled Jar/Hexagon Graphic representing premium bottle */}
              <div className="relative w-48 h-60 border-2 border-[#D97706] bg-white/5 backdrop-blur-sm p-6 flex flex-col justify-between items-center z-10 shadow-2xl rounded-sm">
                <div className="text-center">
                  <span className="text-[8px] tracking-[0.3em] text-[#D97706] uppercase block mb-1">Bit Salt Life</span>
                  <div className="h-[1px] w-6 bg-[#D97706] mx-auto mb-3"></div>
                  <h5 className="font-serif italic text-lg text-white font-light tracking-wide">Signature 300</h5>
                </div>

                {/* Salt Crystal Representation */}
                <div className="my-6">
                  <svg width="60" height="60" viewBox="0 0 100 100" fill="none" className="filter drop-shadow-[0_0_15px_rgba(217,119,6,0.6)]">
                    <polygon points="50,10 85,35 85,65 50,90 15,65 15,35" stroke="#D97706" strokeWidth="2" fill="rgba(217,119,6,0.1)"/>
                    <polygon points="50,10 50,90" stroke="#D97706" strokeWidth="1" opacity="0.4"/>
                    <circle cx="50" cy="50" r="4" fill="#ffffff"/>
                  </svg>
                </div>

                <div className="text-center">
                  <span className="text-[8px] text-gray-400 block mb-1">100% PURE MOLTEN SALT</span>
                  <span className="text-[10px] font-serif text-[#D97706] font-bold">NET WT. 250G</span>
                </div>
              </div>

              <p className="text-[10px] text-gray-400 text-center mt-6 z-10 max-w-xs leading-relaxed">
                자외선을 막아 산화를 예방하는 프리미엄 암갈색 유리 보틀로 처음의 순수함 그대로 오래도록 보존됩니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LUXURY PRODUCT SHOWCASE SECTION */}
      <section id="products" className="py-24 bg-white border-t border-b border-[#111827]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Section title */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#D97706] block mb-3">
              The Collection
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-[#111827] mb-6">
              빛소금 시그니처 컬렉션
            </h2>
            <div className="h-[2px] w-12 bg-[#D97706] mx-auto mb-6"></div>
            <p className="text-[#6B7280] text-sm md:text-base leading-relaxed">
              1000°C 초고온 특허 기술로 완성된 고순도 깨끗함의 기준. 일상 속 웰니스 리추얼부터 격조 높은 파인 다이닝까지, 당신에게 최적화된 빛소금을 제안합니다.
            </p>

            {/* Product Category Filter Tabs */}
            <div className="flex justify-center items-center gap-3 mt-12">
              <button 
                onClick={() => setProductTab("all")}
                className={`px-5 py-2.5 text-[10px] uppercase tracking-widest font-bold transition-all border rounded-sm cursor-pointer ${
                  productTab === "all" 
                    ? "bg-[#111827] text-white border-[#111827]" 
                    : "bg-transparent text-[#6B7280] border-gray-200 hover:text-[#111827] hover:border-gray-400"
                }`}
              >
                전체 상품 (All)
              </button>
              <button 
                onClick={() => setProductTab("signature")}
                className={`px-5 py-2.5 text-[10px] uppercase tracking-widest font-bold transition-all border rounded-sm cursor-pointer ${
                  productTab === "signature" 
                    ? "bg-[#111827] text-white border-[#111827]" 
                    : "bg-transparent text-[#6B7280] border-gray-200 hover:text-[#111827] hover:border-gray-400"
                }`}
              >
                단품 라인 (Signature)
              </button>
              <button 
                onClick={() => setProductTab("gift")}
                className={`px-5 py-2.5 text-[10px] uppercase tracking-widest font-bold transition-all border rounded-sm cursor-pointer ${
                  productTab === "gift" 
                    ? "bg-[#111827] text-white border-[#111827]" 
                    : "bg-transparent text-[#6B7280] border-gray-200 hover:text-[#111827] hover:border-gray-400"
                }`}
              >
                선물세트 (Gift Set)
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {PRODUCTS.filter(p => productTab === "all" || p.category === productTab).map((product) => {
              const isExpanded = expandedProduct === product.id;
              
              return (
                <motion.div 
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white border border-[#111827]/10 rounded-sm hover:border-[#D97706]/40 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                >
                  {/* Visual Jar / Package Representation Container */}
                  <div className="h-64 bg-[#FDFBF7] border-b border-[#111827]/5 relative flex items-center justify-center overflow-hidden">
                    {/* Abstract Grid background */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id={`grid-p-${product.id}`} width="15" height="15" patternUnits="userSpaceOnUse">
                            <rect width="15" height="15" fill="none" stroke="#111827" strokeWidth="0.5" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill={`url(#grid-p-${product.id})`} />
                      </svg>
                    </div>

                    {/* Aura glow on hover */}
                    <div className="absolute w-44 h-44 rounded-full bg-[#D97706]/3 opacity-0 group-hover:opacity-100 group-hover:scale-125 blur-xl transition-all duration-700 pointer-events-none" />

                    {/* Premium Product Container Visual */}
                    {product.particleType === "fine" && (
                      <div className="relative w-36 h-48 border border-[#D97706]/50 bg-amber-950/5 backdrop-blur-xs p-4 flex flex-col justify-between items-center z-10 shadow-md group-hover:shadow-xl transition-all duration-300 rounded-xs">
                        <div className="text-center">
                          <span className="text-[7px] tracking-[0.3em] text-[#D97706] uppercase block font-bold">BIT SALT LIFE</span>
                          <div className="h-[0.5px] w-4 bg-[#D97706] mx-auto mt-1 mb-2"></div>
                          <span className="font-serif italic text-xs text-[#111827] font-medium leading-none block">Signature 300</span>
                        </div>
                        {/* Soft powdery aura */}
                        <div className="relative my-3 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full border border-dashed border-[#D97706]/20 animate-[spin_30s_linear_infinite]" />
                          <div className="absolute w-8 h-8 rounded-full bg-white/70 backdrop-blur-xs shadow-inner flex items-center justify-center">
                            <Sparkles size={14} className="text-[#D97706] animate-pulse" />
                          </div>
                        </div>
                        <div className="text-center">
                          <span className="text-[7px] text-gray-400 block tracking-wider mb-0.5">FINE RITUAL POWDER</span>
                          <span className="text-[9px] font-mono font-bold text-[#D97706]">250G</span>
                        </div>
                      </div>
                    )}

                    {product.particleType === "coarse" && (
                      <div className="relative w-36 h-48 border-2 border-[#111827]/10 bg-[#111827]/5 backdrop-blur-xs p-4 flex flex-col justify-between items-center z-10 shadow-md group-hover:shadow-xl transition-all duration-300 rounded-xs">
                        <div className="text-center">
                          <span className="text-[7px] tracking-[0.3em] text-[#111827] uppercase block font-bold">BIT SALT LIFE</span>
                          <div className="h-[0.5px] w-4 bg-[#111827] mx-auto mt-1 mb-2"></div>
                          <span className="font-serif italic text-xs text-[#111827] font-bold leading-none block">Signature 1000</span>
                        </div>
                        {/* Crystalline Geometry representation */}
                        <div className="relative my-3 flex items-center justify-center">
                          <div className="w-12 h-12 border border-[#111827]/10 rounded-sm rotate-45 animate-[spin_40s_linear_infinite]" />
                          <div className="absolute w-8 h-8 border border-[#D97706]/30 bg-white/90 shadow-sm flex items-center justify-center">
                            <Layers size={14} className="text-[#D97706]" />
                          </div>
                        </div>
                        <div className="text-center">
                          <span className="text-[7px] text-gray-500 block tracking-wider mb-0.5">DINING CRYSTAL SALT</span>
                          <span className="text-[9px] font-mono font-bold text-[#111827]">250G</span>
                        </div>
                      </div>
                    )}

                    {product.particleType === "gift" && (
                      <div className="relative w-48 h-40 border border-[#D97706]/40 bg-[#111827] text-white p-4 flex flex-col justify-between items-center z-10 shadow-lg group-hover:shadow-2xl transition-all duration-300 rounded-xs">
                        <div className="text-center w-full">
                          <span className="text-[7px] tracking-[0.3em] text-[#D97706] uppercase block font-bold">PREMIUM GIFT SELECTION</span>
                          <div className="h-[1px] w-full bg-[#D97706]/20 mt-1.5"></div>
                        </div>
                        {/* Box outline with dual bottles */}
                        <div className="flex gap-4 items-center justify-center my-1.5">
                          {/* Mini jar 1 */}
                          <div className="w-8 h-12 border border-dashed border-[#D97706]/40 bg-white/5 flex flex-col justify-between p-1 rounded-2xs text-[5px] text-center">
                            <span className="text-[4px] text-[#D97706]">300</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-white/20 mx-auto" />
                          </div>
                          {/* Gift Icon */}
                          <Gift size={16} className="text-[#D97706] animate-bounce" />
                          {/* Mini jar 2 */}
                          <div className="w-8 h-12 border border-dashed border-[#D97706]/40 bg-white/5 flex flex-col justify-between p-1 rounded-2xs text-[5px] text-center">
                            <span className="text-[4px] text-white">1000</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-white/20 mx-auto" />
                          </div>
                        </div>
                        <div className="text-center">
                          <span className="text-[7px] text-[#D97706] block tracking-[0.2em] font-bold">BIT SALT LIFE MASTER</span>
                        </div>
                      </div>
                    )}

                    {/* Premium badge overlay */}
                    <div className="absolute top-4 left-4 bg-[#111827] text-white text-[8px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-sm">
                      {product.tag}
                    </div>
                  </div>

                  {/* Product Metadata & Detailed specs */}
                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-[#111827] tracking-tight">{product.name}</h3>
                        <span className="text-[10px] font-bold font-mono text-[#D97706] bg-[#D97706]/5 px-2 py-0.5 rounded-xs uppercase">
                          {product.category === "gift" ? "Gift" : "Signature"}
                        </span>
                      </div>
                      <p className="text-xs font-mono text-gray-400 mb-6">{product.engName}</p>

                      {/* Highlight Specs */}
                      <div className="grid grid-cols-2 gap-4 border-b border-gray-100 pb-6 mb-6">
                        <div>
                          <span className="text-[9px] text-gray-400 uppercase font-mono block mb-1">입자 크기</span>
                          <span className="text-xs font-bold text-[#111827]">{product.particleSize}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-gray-400 uppercase font-mono block mb-1">용량 / 패키지</span>
                          <span className="text-xs font-bold text-[#111827]">{product.capacity}</span>
                        </div>
                      </div>

                      {/* Features Bullet List */}
                      <div className="space-y-3 mb-6">
                        <span className="text-[9px] text-gray-400 uppercase font-mono block mb-2">핵심 강점</span>
                        {product.features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs text-gray-600 leading-relaxed">
                            <Check size={14} className="text-[#D97706] mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Recommendations or Full Specifications Toggle */}
                      <div className="border-t border-gray-100 pt-5 mt-4">
                        <button 
                          onClick={() => setExpandedProduct(isExpanded ? null : product.id)}
                          className="w-full flex justify-between items-center text-[10px] uppercase tracking-widest font-bold text-[#111827] hover:text-[#D97706] transition-colors focus:outline-none"
                        >
                          <span>{isExpanded ? "상세 정보 접기" : "정밀 스펙 및 권장 용도 보기"}</span>
                          <ChevronDown size={14} className={`transform transition-transform ${isExpanded ? "rotate-180 text-[#D97706]" : ""}`} />
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden mt-4 pt-4 border-t border-dashed border-gray-100 space-y-4"
                            >
                              {/* Recommendations */}
                              <div>
                                <span className="text-[9px] text-[#D97706] uppercase font-mono font-bold block mb-2">RECOMMENDED USES</span>
                                <ul className="space-y-2">
                                  {product.recommendations.map((rec, i) => (
                                    <li key={i} className="text-[11px] text-gray-600 leading-relaxed list-disc list-inside">
                                      {rec}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Spec Table */}
                              <div className="bg-[#FDFBF7] p-4 rounded-sm border border-[#111827]/5">
                                <span className="text-[9px] text-gray-400 uppercase font-mono block mb-2">TECHNICAL DATA</span>
                                <div className="space-y-2">
                                  {product.specs.map((spec, i) => (
                                    <div key={i} className="flex justify-between items-center text-[11px] border-b border-gray-100/50 pb-1.5 last:border-b-0 last:pb-0">
                                      <span className="text-gray-400">{spec.label}</span>
                                      <span className="font-bold text-[#111827]">{spec.value}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Price and Action Button */}
                    <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-[9px] text-gray-400 uppercase font-mono block mb-1">출시 가격 (MSRP)</span>
                        <span className="text-sm font-black text-[#111827] tracking-tight">{product.price}</span>
                      </div>
                      
                      <button 
                        onClick={() => handleSelectProductForInquiry(product.name, product.category)}
                        className="bg-[#111827] text-white hover:bg-[#D97706] text-[10px] uppercase tracking-widest font-bold px-5 py-3.5 rounded-sm transition-all text-center flex items-center justify-center gap-2 group-hover:-translate-y-0.5 cursor-pointer"
                      >
                        상담 및 구매 문의 <ChevronRight size={12} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SCIENTIFIC PACKAGING SECTION */}
      <section id="packaging" className="py-24 bg-white border-b border-[#111827]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-widest text-[#D97706] font-bold block">
                Scientific Integrity
              </span>
              <h3 className="text-2xl md:text-4xl font-serif text-[#111827] font-bold leading-tight">
                품격을 전하는 정밀 공학 설계 용기
              </h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                완벽하게 정제된 소금의 품질을 유지하기 위해 자외선 차단에 특화된 스페셜 앰버 글라스 용기를 사용합니다.
              </p>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                각 입자 크기에 최적화된 내부 공학 설계를 통해 습기에 취약한 소금의 제형을 사계절 내내 처음 상태 그대로 맑고 뽀송하게 지켜줍니다.
              </p>
            </div>

            {/* Premium Visual Packaging Showcase */}
            <div className="lg:col-span-6 bg-[#111827] text-white p-12 rounded-sm flex flex-col items-center justify-center relative min-h-[400px] shadow-lg overflow-hidden">
              <div className="absolute top-4 left-4 text-[#D97706] text-[9px] uppercase tracking-widest font-bold px-3 py-1.5 border border-[#D97706]/30 rounded-sm">
                Signature Packaging
              </div>

              {/* Decorative background grid */}
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <rect width="20" height="20" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* Styled Jar/Hexagon Graphic representing premium bottle */}
              <div className="relative w-48 h-60 border-2 border-[#D97706] bg-white/5 backdrop-blur-sm p-6 flex flex-col justify-between items-center z-10 shadow-2xl rounded-sm">
                <div className="text-center">
                  <span className="text-[8px] tracking-[0.3em] text-[#D97706] uppercase block mb-1">Bit Salt Life</span>
                  <div className="h-[1px] w-6 bg-[#D97706] mx-auto mb-3"></div>
                  <h5 className="font-serif italic text-lg text-white font-light tracking-wide">Signature 300</h5>
                </div>

                {/* Salt Crystal Representation */}
                <div className="my-6">
                  <svg width="60" height="60" viewBox="0 0 100 100" fill="none" className="filter drop-shadow-[0_0_15px_rgba(217,119,6,0.6)]">
                    <polygon points="50,10 85,35 85,65 50,90 15,65 15,35" stroke="#D97706" strokeWidth="2" fill="rgba(217,119,6,0.1)"/>
                    <polygon points="50,10 50,90" stroke="#D97706" strokeWidth="1" opacity="0.4"/>
                    <circle cx="50" cy="50" r="4" fill="#ffffff"/>
                  </svg>
                </div>

                <div className="text-center">
                  <span className="text-[8px] text-gray-400 block mb-1">100% PURE MOLTEN SALT</span>
                  <span className="text-[10px] font-serif text-[#D97706] font-bold">NET WT. 250G</span>
                </div>
              </div>

              <p className="text-[10px] text-gray-400 text-center mt-6 z-10 max-w-xs leading-relaxed">
                자외선을 막아 산화를 예방하는 프리미엄 암갈색 유리 보틀로 처음의 순수함 그대로 오래도록 보존됩니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST ELEMENTS, CERTIFICATES & MODALS */}
      <section id="trust" className="py-24 bg-white border-t border-b border-[#111827]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Section title */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#D97706] block mb-3">
              Verification & Trust
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-[#111827] mb-6">
              Scientific Trust
            </h2>
            <div className="h-[2px] w-12 bg-[#D97706] mx-auto mb-6"></div>
            <p className="text-[#6B7280] text-sm md:text-base leading-relaxed">
              공인기관의 과학적 정밀 검사 성적서와 투명한 데이터를 통해 차원 높은 신뢰를 전달합니다.
            </p>
          </div>

          {/* Certificate Cards Grid - Aligned with Scientific Trust styling instruction */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {/* Cert 1 */}
            <div 
              onClick={() => setModalType("ktr")}
              className="bg-white border border-[#111827]/10 hover:border-[#D97706] p-8 text-center rounded-sm transition-all duration-300 cursor-pointer hover:-translate-y-1 shadow-sm group"
            >
              <div className="w-16 h-16 bg-[#F9FAFB] border border-[#111827]/5 rounded-full flex items-center justify-center mx-auto mb-6 text-[#111827] group-hover:bg-[#D97706] group-hover:text-white transition-colors duration-300">
                <ShieldCheck size={28} />
              </div>
              <h4 className="font-bold text-sm text-[#111827] mb-2">KTR 중금속 불검출 시험성적</h4>
              <p className="text-xs text-[#6B7280] mb-4 leading-relaxed">납, 카드뮴, 비소, 수은 4대 유해 중금속 성분 공식 제로(0%) 완벽 판정</p>
              <span className="text-[10px] text-[#D97706] font-bold uppercase tracking-widest inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                인증서 확인하기 <ExternalLink size={12} />
              </span>
            </div>

            {/* Cert 2 */}
            <div 
              onClick={() => setModalType("plastic")}
              className="bg-white border border-[#111827]/10 hover:border-[#D97706] p-8 text-center rounded-sm transition-all duration-300 cursor-pointer hover:-translate-y-1 shadow-sm group"
            >
              <div className="w-16 h-16 bg-[#F9FAFB] border border-[#111827]/5 rounded-full flex items-center justify-center mx-auto mb-6 text-[#111827] group-hover:bg-[#D97706] group-hover:text-white transition-colors duration-300">
                <Sparkles size={28} />
              </div>
              <h4 className="font-bold text-sm text-[#111827] mb-2">나노 미세플라스틱 100% 제거</h4>
              <p className="text-xs text-[#6B7280] mb-4 leading-relaxed">100㎛ ~ 1㎛ 미세플라스틱의 기화 소멸 정밀 테스트 통과</p>
              <span className="text-[10px] text-[#D97706] font-bold uppercase tracking-widest inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                성적서 확인하기 <ExternalLink size={12} />
              </span>
            </div>

            {/* Cert 3 */}
            <div 
              onClick={() => setModalType("fda")}
              className="bg-white border border-[#111827]/10 hover:border-[#D97706] p-8 text-center rounded-sm transition-all duration-300 cursor-pointer hover:-translate-y-1 shadow-sm group"
            >
              <div className="w-16 h-16 bg-[#F9FAFB] border border-[#111827]/5 rounded-full flex items-center justify-center mx-auto mb-6 text-[#111827] group-hover:bg-[#D97706] group-hover:text-white transition-colors duration-300">
                <Flame size={28} />
              </div>
              <h4 className="font-bold text-sm text-[#111827] mb-2">미국 FDA 시설 정식 등록</h4>
              <p className="text-xs text-[#6B7280] mb-4 leading-relaxed">ISO 22000 및 국제 규격 우수 제조 공정(HACCP) 관리 적격 공장</p>
              <span className="text-[10px] text-[#D97706] font-bold uppercase tracking-widest inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                등록증 확인하기 <ExternalLink size={12} />
              </span>
            </div>
          </div>

          {/* Testimonials */}
          <div className="mt-20 border-t border-[#111827]/10 pt-16">
            <h3 className="text-center font-serif text-2xl md:text-3xl text-[#111827] mb-12">
              빛소금을 먼저 경험한 고객 리뷰
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((item) => (
                <div key={item.id} className="p-8 border-l-2 border-[#D97706] bg-[#F9FAFB] relative flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 mb-4 text-[#D97706]">
                      {[...Array(item.stars)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-xs md:text-sm text-[#111827] leading-relaxed italic mb-6">
                      "{item.quote}"
                    </p>
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-[#111827]">{item.author}</h5>
                    <p className="text-[10px] text-[#6B7280] mt-0.5">{item.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE MODAL FOR CERTIFICATES */}
      <AnimatePresence>
        {modalType && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Modal Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalType(null)}
              className="absolute inset-0 bg-[#111827]/80 backdrop-blur-sm"
            />
            
            {/* Modal Content - Designed with the beautiful certificate seal as requested */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-[#111827]/10 max-w-xl w-full p-8 md:p-12 shadow-2xl relative z-10 rounded-sm"
            >
              <button 
                onClick={() => setModalType(null)}
                className="absolute top-6 right-6 text-gray-400 hover:text-[#111827] transition-colors focus:outline-none"
                aria-label="Close Modal"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-8">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#D97706] block mb-2">
                  {modalData[modalType]?.badge}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#111827]">
                  {modalData[modalType]?.title}
                </h3>
                <div className="h-[1px] w-12 bg-[#D97706] mx-auto mt-4"></div>
              </div>

              {/* Decorative Document Frame */}
              <div className="bg-[#F9FAFB] border-2 border-double border-[#D97706]/20 p-6 md:p-8 rounded-sm relative">
                <div className="text-xs text-[#6B7280] leading-relaxed whitespace-pre-wrap font-sans">
                  {modalData[modalType]?.desc}
                </div>

                <div className="flex justify-between items-end mt-12 pt-6 border-t border-gray-100">
                  <div className="text-[11px] font-serif text-gray-400">
                    인증서 발급일자: {modalData[modalType]?.date}
                  </div>
                  
                  {/* Circular Retro-styled Seal */}
                  <div className="w-16 h-16 border-2 border-dashed border-[#D97706] rounded-full flex flex-col items-center justify-center p-2 text-center rotate-[-12deg] select-none">
                    <span className="text-[8px] font-bold text-[#D97706] leading-none whitespace-pre-line">
                      {modalData[modalType]?.seal}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <button 
                  onClick={() => setModalType(null)}
                  className="bg-[#111827] text-white text-[11px] uppercase tracking-[0.2em] font-bold px-8 py-3.5 hover:bg-[#D97706] transition-colors"
                >
                  확인 및 닫기
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* INQUIRY & CONTACT SECTION */}
      <section id="inquiry" className="py-24 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left Column: Brand Statement & Quick Contacts */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="space-y-6">
                <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#D97706] block">
                  Wellness Consultation
                </span>
                <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-[#111827] leading-tight">
                  Consultation
                </h2>
                <div className="h-[2px] w-12 bg-[#D97706] mb-8"></div>
                
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  개인 정기구독부터 사은 및 단체 선물, 기업 원료 비즈니스 제휴까지 최상의 파트너십을 전문적으로 상담해 드립니다.
                </p>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  간편한 문의 신청 양식을 작성해 주시면, 확인 후 24시간 이내에 웰니스 제안 및 견적을 성심껏 전해 드립니다.
                </p>
              </div>

              {/* Direct Info Blocks */}
              <div className="space-y-6 mt-12 pt-8 border-t border-[#111827]/10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-[#111827]/5 bg-white flex items-center justify-center rounded-sm text-[#111827]">
                    <Phone size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">전화 문의</p>
                    <p className="text-sm font-bold text-[#111827]">02-123-4567</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-[#111827]/5 bg-white flex items-center justify-center rounded-sm text-[#111827]">
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">이메일 제휴</p>
                    <p className="text-sm font-bold text-[#111827]">info@bitsalt.life</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic React Contact Form Card styled with Dark Slate */}
            <div className="lg:col-span-7">
              <div className="bg-[#111827] p-8 md:p-12 text-white shadow-xl relative overflow-hidden rounded-sm">
                <h3 className="text-lg font-serif text-[#D97706] tracking-wide mb-8 uppercase border-b border-gray-800 pb-4">
                  Request Consultation
                </h3>

                {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-[#D97706]/10 border border-[#D97706]/30 p-8 rounded-sm text-center"
                  >
                    <div className="w-16 h-16 bg-[#D97706] rounded-full flex items-center justify-center mx-auto mb-6 text-[#111827]">
                      <Check size={32} />
                    </div>
                    <h4 className="font-serif text-xl font-bold mb-3 text-white">상담 신청 접수 완료</h4>
                    <p className="text-xs text-gray-300 leading-relaxed max-w-md mx-auto mb-8">
                      감사합니다, <span className="font-bold text-white">{userName}</span> 고객님!<br />
                      신청해 주신 <span className="font-bold text-[#D97706]">{getInquiryTypeText(inquiryType)}</span> 상담 요청건이 암호화 보안망을 통해 안전하게 전송되었습니다. 24시간 내에 전문 컨설턴트가 신속히 연락해 안내해 드리겠습니다.
                    </p>
                    <button 
                      onClick={resetForm}
                      className="border border-[#D97706] text-[#D97706] px-8 py-3.5 text-xs uppercase tracking-widest font-bold hover:bg-[#D97706] hover:text-[#111827] transition-all"
                    >
                      추가 문의 작성하기
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name input */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] tracking-widest font-bold text-gray-400 uppercase">
                          성함 / 기업명 *
                        </label>
                        <input 
                          type="text" 
                          required
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          placeholder="NAME"
                          className="w-full bg-transparent border-b border-gray-700 py-2.5 text-xs text-white tracking-wider focus:outline-none focus:border-[#D97706] transition-colors"
                        />
                      </div>

                      {/* Phone input */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] tracking-widest font-bold text-gray-400 uppercase">
                          연락처 *
                        </label>
                        <input 
                          type="tel" 
                          required
                          value={userPhone}
                          onChange={(e) => setUserPhone(e.target.value)}
                          placeholder="PHONE (e.g. 010-1234-5678)"
                          className="w-full bg-transparent border-b border-gray-700 py-2.5 text-xs text-white tracking-wider focus:outline-none focus:border-[#D97706] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Email input */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] tracking-widest font-bold text-gray-400 uppercase">
                          이메일 주소 *
                        </label>
                        <input 
                          type="email" 
                          required
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          placeholder="EMAIL"
                          className="w-full bg-transparent border-b border-gray-700 py-2.5 text-xs text-white tracking-wider focus:outline-none focus:border-[#D97706] transition-colors"
                        />
                      </div>

                      {/* Inquiry Type select */}
                      <div className="flex flex-col gap-2 relative">
                        <label className="text-[10px] tracking-widest font-bold text-gray-400 uppercase">
                          상담 유형 *
                        </label>
                        <div className="relative">
                          <select 
                            value={inquiryType}
                            onChange={(e) => setInquiryType(e.target.value)}
                            className="w-full bg-transparent border-b border-gray-700 py-2.5 text-xs text-white tracking-wider focus:outline-none focus:border-[#D97706] transition-colors appearance-none cursor-pointer"
                          >
                            <option value="individual" className="bg-[#111827]">개인 정기구독 문의</option>
                            <option value="bulk" className="bg-[#111827]">대량 사은 / 단체 선물 문의</option>
                            <option value="partnership" className="bg-[#111827]">원료 납품 및 비즈니스 제휴</option>
                            <option value="etc" className="bg-[#111827]">기타 문의</option>
                          </select>
                          <ChevronDown size={14} className="absolute right-2 bottom-3 text-gray-500 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Message Textarea */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] tracking-widest font-bold text-gray-400 uppercase">
                        상세 문의 내용 *
                      </label>
                      <textarea 
                        required
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                        placeholder="MESSAGE (상담이 원활할 수 있게 구체적인 수량이나 원하시는 제안 유형을 기입해 주시면 유용합니다.)"
                        rows={4}
                        className="w-full bg-transparent border border-gray-800 focus:border-[#D97706] p-4 text-xs text-white tracking-wider focus:outline-none transition-all rounded-sm resize-none"
                      />
                    </div>

                    {/* Privacy Policy Agreement checkbox */}
                    <div className="flex items-start gap-3 pt-2">
                      <input 
                        type="checkbox" 
                        id="privacy" 
                        required 
                        className="mt-0.5 accent-[#D97706]"
                      />
                      <label htmlFor="privacy" className="text-[10px] text-gray-400 leading-normal cursor-pointer select-none">
                        개인정보 수집 및 이용 동의 (상담을 위한 성함, 연락처, 메일 주소 등의 정보를 수집 보관하고, 용도 폐기 후 지체 없이 영구 파기합니다.) *
                      </label>
                    </div>

                    {/* Submit Button with Loading Indicator and dynamic text */}
                    <div className="pt-4">
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-transparent border border-[#D97706] text-[#D97706] py-5 text-xs font-bold uppercase tracking-widest hover:bg-[#D97706] hover:text-[#111827] disabled:opacity-50 transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-3.5 h-3.5 border-2 border-[#111827] border-t-transparent rounded-full animate-spin"></span>
                            전송 중입니다...
                          </>
                        ) : (
                          "Submit Inquiry"
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#111827] text-white/60 py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-16">
            <div className="lg:col-span-5 space-y-4">
              <h4 className="font-serif text-xl font-bold text-white">BIT SALT LIFE</h4>
              <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
                1000°C 정제 특허 공법을 기반으로 현대 바다 오염 물질을 원천 배출하여, 세상에서 가장 맑고 깨끗한 명품 웰니스 소금을 창조합니다.
              </p>
            </div>
            
            {/* Metadata layout according to instructions */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8 text-[11px] uppercase tracking-widest font-bold">
              <div>
                <span className="text-white block mb-2 uppercase">Address</span>
                <p className="text-xs text-gray-400 font-normal leading-relaxed normal-case">
                  서울특별시 강남구 테헤란로 웰니스빌딩 12F<br />
                  주식회사 빛소금 라이프
                </p>
              </div>

              <div>
                <span className="text-white block mb-2 uppercase">Contact</span>
                <p className="text-xs text-gray-400 font-normal leading-relaxed normal-case">
                  02.123.4567<br />
                  info@bitsalt.life
                </p>
              </div>

              <div>
                <span className="text-white block mb-2 uppercase">Hours</span>
                <p className="text-xs text-gray-400 font-normal leading-relaxed normal-case">
                  MON — FRI: 09:00 — 18:00<br />
                  WEEKENDS & HOLIDAYS: CLOSED
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
            <span className="text-[10px] tracking-widest font-black text-white uppercase">
              © 2026 BIT SALT LIFE CO. ALL RIGHTS RESERVED.
            </span>
            <div className="flex gap-6 text-[10px] tracking-widest text-gray-400">
              <a href="#philosophy" className="hover:text-white transition-colors">이용약관</a>
              <a href="#inquiry" className="hover:text-white transition-colors">개인정보처리방침</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
