import { useState, useEffect, useRef, FormEvent, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Coffee, 
  MapPin, 
  Clock, 
  Mail, 
  Phone, 
  User, 
  Users, 
  Calendar, 
  FileText, 
  ArrowUp, 
  Send, 
  ChevronRight, 
  Menu, 
  X, 
  Instagram, 
  Facebook, 
  Heart,
  MessageSquare,
  GraduationCap
} from 'lucide-react';
import { MENU_ITEMS, GALLERY_ITEMS } from './data';
import { MenuItem, FeedbackItem } from './types';

export default function App() {
  // Page routing state: 'home' | 'uas-about'
  const [currentPage, setCurrentPage] = useState<'home' | 'uas-about'>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Reservation form state
  const [reserveForm, setReserveForm] = useState({
    nama: '',
    phone: '',
    guests: '2',
    date: '',
    time: '',
    notes: ''
  });

  // Student UAS Kesan & Pesan state
  const [studentFeedback, setStudentFeedback] = useState<FeedbackItem[]>(() => {
    const saved = localStorage.getItem('emerald_brew_feedback');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [
      {
        id: '1',
        name: 'Budi Santoso',
        rating: 5,
        message: 'Mata kuliah Aplikasi Komputer Bisnis ini sangat luar biasa! Kami diajarkan cara mengimplementasikan ide bisnis riil ke dalam platform teknologi modern. Sukses selalu Kampus STIE Ekadharma Indonesia!',
        createdAt: '18 Jul 2026'
      },
      {
        id: '2',
        name: 'Siti Aminah',
        rating: 5,
        message: 'Sangat menyukai penugasan praktis seperti ini. Kita tidak hanya belajar teori tapi langsung praktek membuat UI/UX digital kafe yang indah.',
        createdAt: '17 Jul 2026'
      }
    ];
  });

  const [newFeedback, setNewFeedback] = useState({
    name: '',
    rating: 5,
    message: ''
  });

  // Track scrolling
  useEffect(() => {
    const handleScroll = () => {
      // Is scrolled
      setIsScrolled(window.scrollY > 50);
      
      // Scroll Top button
      setShowScrollTop(window.scrollY > 400);

      // Scroll progress
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Simulate loading screen
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Save feedback
  useEffect(() => {
    localStorage.setItem('emerald_brew_feedback', JSON.stringify(studentFeedback));
  }, [studentFeedback]);

  // Navigate to section
  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (currentPage !== 'home') {
      setCurrentPage('home');
      // Wait for page change to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Switch to UAS About Page
  const handleGoToUasAbout = () => {
    setCurrentPage('uas-about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  // Submit reservation to WhatsApp
  const handleReservationSubmit = (e: FormEvent) => {
    e.preventDefault();
    const waNumber = '6281234567890'; // Custom static wa number formatted correctly
    const text = `Halo Emerald Brew, saya ingin melakukan reservasi:\n\n` +
      `*Nama* : ${reserveForm.nama}\n` +
      `*Nomor HP* : ${reserveForm.phone}\n` +
      `*Jumlah Orang* : ${reserveForm.guests} Orang\n` +
      `*Tanggal* : ${reserveForm.date}\n` +
      `*Jam* : ${reserveForm.time}\n` +
      `*Catatan* : ${reserveForm.notes || '-'}`;
    
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${waNumber}?text=${encodedText}`, '_blank');
  };

  // Add Student Feedback
  const handleAddFeedback = (e: FormEvent) => {
    e.preventDefault();
    if (!newFeedback.name.trim() || !newFeedback.message.trim()) return;

    const feedbackObj: FeedbackItem = {
      id: Date.now().toString(),
      name: newFeedback.name,
      rating: newFeedback.rating,
      message: newFeedback.message,
      createdAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    setStudentFeedback([feedbackObj, ...studentFeedback]);
    setNewFeedback({ name: '', rating: 5, message: '' });
  };

  // Create Ripple Effect on Buttons
  const createRipple = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const rect = button.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - rect.left - radius}px`;
    circle.style.top = `${e.clientY - rect.top - radius}px`;
    circle.classList.add("ripple-effect");

    const ripple = button.getElementsByClassName("ripple-effect")[0];
    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  };

  // Filtered Menu Items
  const filteredMenuItems = activeCategory === 'all'
    ? MENU_ITEMS
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col selection:bg-[#1C7C68]/20 selection:text-[#0F5E4F] overflow-x-hidden font-sans">
      {/* Scroll Progress Bar */}
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }}></div>

      {/* Loading Animation */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="fixed inset-0 bg-[#F8F8F6] z-[9999] flex flex-col items-center justify-center"
          >
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8] 
              }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 border-t-2 border-b-2 border-[#0F5E4F] rounded-full animate-spin mb-4"></div>
              <h1 className="font-serif text-2xl font-semibold tracking-wider text-[#0F5E4F]">EMERALD BREW</h1>
              <p className="font-kr text-xs tracking-widest text-[#1C7C68]/80 mt-2">에메랄드 브루 • Premium Editorial Aesthetic</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header / Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-b border-[#E5E7EB] py-4' 
          : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button 
            onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center space-x-2 text-left cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-[#0F5E4F] flex items-center justify-center text-white transition-all duration-300 group-hover:bg-[#1C7C68]">
              <Coffee size={20} />
            </div>
            <div>
              <span className="block font-serif font-semibold text-lg tracking-wider text-[#0F5E4F] leading-none">EMERALD BREW</span>
              <span className="block font-kr text-[9px] text-[#1C7C68] tracking-widest leading-none mt-1">에메랄드 브루</span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleNavClick('home')} 
              className={`font-sans text-sm tracking-wide transition-all duration-300 relative py-1 cursor-pointer hover:text-[#0F5E4F] ${
                currentPage === 'home' ? 'text-[#0F5E4F] font-semibold' : 'text-[#6B7280]'
              }`}
            >
              Home
              {currentPage === 'home' && (
                <motion.span layoutId="activeUnderline" className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0F5E4F]" />
              )}
            </button>
            <button 
              onClick={() => handleNavClick('about')} 
              className="font-sans text-sm tracking-wide text-[#6B7280] transition-all duration-300 hover:text-[#0F5E4F] cursor-pointer"
            >
              About
            </button>
            <button 
              onClick={() => handleNavClick('menu')} 
              className="font-sans text-sm tracking-wide text-[#6B7280] transition-all duration-300 hover:text-[#0F5E4F] cursor-pointer"
            >
              Menu
            </button>
            <button 
              onClick={() => handleNavClick('gallery')} 
              className="font-sans text-sm tracking-wide text-[#6B7280] transition-all duration-300 hover:text-[#0F5E4F] cursor-pointer"
            >
              Gallery
            </button>
            <button 
              onClick={() => handleNavClick('reservation')} 
              className="font-sans text-sm tracking-wide text-[#6B7280] transition-all duration-300 hover:text-[#0F5E4F] cursor-pointer"
            >
              Reservation
            </button>
            <button 
              onClick={() => handleNavClick('contact')} 
              className="font-sans text-sm tracking-wide text-[#6B7280] transition-all duration-300 hover:text-[#0F5E4F] cursor-pointer"
            >
              Contact
            </button>
            <button 
              onClick={handleGoToUasAbout} 
              className={`px-4 py-2 rounded-full border text-xs tracking-wide font-medium transition-all duration-300 relative cursor-pointer ${
                currentPage === 'uas-about' 
                  ? 'bg-[#0F5E4F] text-white border-[#0F5E4F]' 
                  : 'bg-transparent text-[#0F5E4F] border-[#0F5E4F]/30 hover:bg-[#0F5E4F]/5'
              }`}
            >
              About Us (UAS)
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#1F2937] hover:text-[#0F5E4F] transition-colors p-1"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[72px] left-0 w-full bg-white/95 backdrop-blur-lg border-b border-[#E5E7EB] z-40 p-6 shadow-xl md:hidden"
          >
            <div className="flex flex-col space-y-4">
              <button onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileMenuOpen(false); }} className="text-left py-2 text-[#1F2937] hover:text-[#0F5E4F] font-medium border-b border-[#E5E7EB]/50">Home</button>
              <button onClick={() => handleNavClick('about')} className="text-left py-2 text-[#6B7280] hover:text-[#0F5E4F] border-b border-[#E5E7EB]/50">About</button>
              <button onClick={() => handleNavClick('menu')} className="text-left py-2 text-[#6B7280] hover:text-[#0F5E4F] border-b border-[#E5E7EB]/50">Menu</button>
              <button onClick={() => handleNavClick('gallery')} className="text-left py-2 text-[#6B7280] hover:text-[#0F5E4F] border-b border-[#E5E7EB]/50">Gallery</button>
              <button onClick={() => handleNavClick('reservation')} className="text-left py-2 text-[#6B7280] hover:text-[#0F5E4F] border-b border-[#E5E7EB]/50">Reservation</button>
              <button onClick={() => handleNavClick('contact')} className="text-left py-2 text-[#6B7280] hover:text-[#0F5E4F] border-b border-[#E5E7EB]/50">Contact</button>
              <button onClick={handleGoToUasAbout} className="text-left py-3 text-[#0F5E4F] font-bold flex items-center justify-between">
                <span>About Us (UAS)</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-grow pt-[80px]">
        {currentPage === 'home' ? (
          <div>
            {/* HERO SECTION */}
            <section id="home" className="relative h-[85vh] md:h-[90vh] flex items-center overflow-hidden">
              {/* Parallax Background */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
                style={{ 
                  backgroundImage: `url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1600')`,
                }}
              />
              {/* Elegant Minimal Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>

              {/* Grid content */}
              <div className="relative max-w-7xl mx-auto w-full px-6 md:px-12 z-10 text-white">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="max-w-2xl space-y-6"
                >
                  <div className="inline-flex items-center space-x-2 bg-[#1C7C68]/30 border border-[#1C7C68]/40 px-4 py-1.5 rounded-full backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-[#1C7C68] animate-pulse"></span>
                    <span className="text-xs tracking-widest uppercase font-medium">Premium Handcrafted Coffee</span>
                  </div>
                  
                  <h1 className="font-serif text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1] md:leading-[1.1]">
                    Where Every Cup <br />
                    <span className="text-emerald-300 font-serif">Feels Like Home</span>
                  </h1>

                  <p className="text-sm md:text-lg text-[#E5E7EB] font-light leading-relaxed max-w-lg">
                    Premium handcrafted coffee inspired by Korean café culture. Experience modern minimalist luxury with a calm and elegant ambiance.
                  </p>

                  <div className="flex flex-wrap gap-4 pt-4">
                    <button 
                      onClick={(e) => { createRipple(e); handleNavClick('menu'); }}
                      className="ripple px-8 py-3.5 bg-[#0F5E4F] hover:bg-[#1C7C68] text-white text-sm font-medium rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-xl transition-all duration-300 ease-out cursor-pointer"
                    >
                      Explore Menu
                    </button>
                    <button 
                      onClick={(e) => { createRipple(e); handleNavClick('reservation'); }}
                      className="ripple px-8 py-3.5 bg-white/15 hover:bg-white/25 border border-white/30 text-white text-sm font-medium rounded-full backdrop-blur-md transition-all duration-300 cursor-pointer"
                    >
                      Contact Us
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Scroll Down Hint */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 text-white/60 text-xs tracking-widest uppercase z-10 pointer-events-none">
                <span>Scroll Down</span>
                <motion.div 
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-1 h-4 bg-white/60 rounded-full"
                ></motion.div>
              </div>
            </section>

            {/* ABOUT US SECTION */}
            <section id="about" className="py-24 bg-white">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  
                  {/* Left Column: Visual Grid */}
                  <div className="grid grid-cols-2 gap-4 relative">
                    <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#0F5E4F]/5 rounded-full -z-10"></div>
                    <div className="space-y-4">
                      <motion.div 
                        whileHover={{ scale: 1.03 }}
                        className="rounded-3xl overflow-hidden shadow-sm aspect-square bg-[#F8F8F6] border border-[#E5E7EB]"
                      >
                        <img 
                          src="https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&q=80&w=400" 
                          alt="Coffee brewing" 
                          className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700"
                          loading="lazy"
                        />
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.03 }}
                        className="rounded-3xl overflow-hidden shadow-sm aspect-[4/5]"
                      >
                        <img 
                          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=400" 
                          alt="Minimalist Cafe seating" 
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </motion.div>
                    </div>
                    <div className="space-y-4 pt-8">
                      <motion.div 
                        whileHover={{ scale: 1.03 }}
                        className="rounded-3xl overflow-hidden shadow-sm aspect-[4/5]"
                      >
                        <img 
                          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=400" 
                          alt="Minimal coffee cup" 
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.03 }}
                        className="rounded-[32px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] aspect-square bg-white p-6 flex flex-col justify-end border border-[#E5E7EB]"
                      >
                        <span className="font-serif text-[#0F5E4F] font-semibold text-3xl">에메랄드</span>
                        <span className="text-xs text-[#6B7280] tracking-widest uppercase mt-2">Pure Harmony</span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Right Column: Narrative */}
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <span className="text-xs uppercase tracking-widest text-[#1C7C68] font-bold">Filosofi & Kebanggaan</span>
                      <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#1F2937] tracking-tight leading-tight">
                        Inspirasi Rasa dari <br />
                        <span className="text-[#0F5E4F] underline decoration-wavy decoration-[#1C7C68]/30">Budaya Kafe Seoul</span>
                      </h2>
                    </div>

                    <p className="text-[#6B7280] leading-relaxed text-sm md:text-base font-light">
                      Emerald Brew lahir dari kekaguman mendalam terhadap arsitektur minimalis dan keanggunan tata cara penyajian kopi di Korea Selatan. Setiap tegukan dirancang untuk membawa ketenangan jiwa di tengah hiruk-pikuk kota.
                    </p>

                    <p className="text-[#6B7280] leading-relaxed text-sm md:text-base font-light">
                      Kami berkolaborasi langsung dengan petani lokal Gayo untuk menyajikan biji arabika terbaik, disangrai secara presisi dan diracik menggunakan standar modern kafe premium untuk memastikan kesempurnaan cita rasa.
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#E5E7EB]">
                      <div className="space-y-1 text-center lg:text-left">
                        <span className="block font-serif text-3xl md:text-4xl font-semibold text-[#0F5E4F] tracking-tight">10+</span>
                        <span className="block text-[10px] text-[#9CA3AF] uppercase tracking-widest font-medium">Years Exp</span>
                      </div>
                      <div className="space-y-1 text-center lg:text-left">
                        <span className="block font-serif text-3xl md:text-4xl font-semibold text-[#0F5E4F] tracking-tight">25+</span>
                        <span className="block text-[10px] text-[#9CA3AF] uppercase tracking-widest font-medium">Coffee Variants</span>
                      </div>
                      <div className="space-y-1 text-center lg:text-left">
                        <span className="block font-serif text-3xl md:text-4xl font-semibold text-[#0F5E4F] tracking-tight">5000+</span>
                        <span className="block text-[10px] text-[#9CA3AF] uppercase tracking-widest font-medium">Happy Guests</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* MENU SECTION */}
            <section id="menu" className="py-24 bg-[#F8F8F6]">
              <div className="max-w-7xl mx-auto px-6">
                
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
                  <span className="text-xs uppercase tracking-widest text-[#1C7C68] font-bold">Kurasi Menu Terbaik</span>
                  <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#1F2937] tracking-tight leading-tight">Crafted Beverage & Desserts</h2>
                  <p className="text-[#6B7280] text-sm font-light leading-relaxed">
                    Setiap menu dibuat dengan dedikasi tinggi, menggunakan pemanis alami, susu pilihan, dan bahan premium asli dari Korea.
                  </p>
                  
                  {/* Category Tabs */}
                  <div className="flex flex-wrap justify-center gap-2 pt-6">
                    {['all', 'signature', 'coffee', 'non-coffee', 'dessert'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-5 py-2.5 rounded-full text-[10px] font-semibold tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                          activeCategory === cat
                            ? 'bg-[#0F5E4F] text-white shadow-sm'
                            : 'bg-white text-[#6B7280] hover:text-[#0F5E4F] hover:bg-white border border-[#E5E7EB]'
                        }`}
                      >
                        {cat === 'all' ? 'All Menu' : cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grid */}
                <motion.div 
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredMenuItems.map((item) => (
                      <motion.div
                        layout
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4 }}
                        whileHover={{ y: -8 }}
                        className="bg-white rounded-[20px] overflow-hidden border border-[#E5E7EB] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(15,94,79,0.08)] transition-all duration-300 flex flex-col h-full group"
                      >
                        {/* Image Container */}
                        <div className="relative overflow-hidden aspect-[4/3]">
                          <img 
                            src={item.imageUrl} 
                            alt={item.name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            loading="lazy"
                          />
                          {item.tag && (
                            <span className="absolute top-4 left-4 bg-[#0F5E4F] text-white text-[9px] uppercase tracking-widest font-semibold px-3 py-1 rounded-full">
                              {item.tag}
                            </span>
                          )}
                          <span className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm text-[#0F5E4F] font-kr text-[10px] px-2.5 py-1 rounded-md font-medium shadow-sm">
                            {item.koreanName}
                          </span>
                        </div>

                        {/* Card Content */}
                        <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                          <div className="space-y-2">
                            <h3 className="font-serif font-semibold text-base md:text-lg text-[#1F2937] group-hover:text-[#0F5E4F] transition-colors leading-snug">
                              {item.name}
                            </h3>
                            <p className="text-xs text-[#6B7280] font-light leading-relaxed line-clamp-2">
                              {item.description}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-[#E5E7EB]/55">
                            <span className="font-serif font-semibold text-[#0F5E4F] text-sm md:text-base">
                              {item.price}
                            </span>
                            <button 
                              onClick={() => {
                                const waNumber = '6281234567890';
                                const text = `Halo Emerald Brew, saya tertarik memesan menu: *${item.name}* (${item.price}). Mohon info pemesanan selanjutnya. Terima kasih!`;
                                window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`, '_blank');
                              }}
                              className="px-4 py-1.5 rounded-full bg-[#F8F8F6] hover:bg-[#0F5E4F] text-[#0F5E4F] hover:text-white text-xs font-semibold tracking-wide transition-all duration-300 flex items-center space-x-1 border border-[#0F5E4F]/20 cursor-pointer"
                            >
                              <span>Order</span>
                              <ChevronRight size={12} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>

              </div>
            </section>

            {/* GALLERY SECTION */}
            <section id="gallery" className="py-24 bg-white">
              <div className="max-w-7xl mx-auto px-6">
                
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
                  <span className="text-xs uppercase tracking-widest text-[#1C7C68] font-bold">Estetika Visual</span>
                  <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#1F2937] tracking-tight leading-tight">Emerald Moment</h2>
                  <p className="text-[#6B7280] text-sm font-light leading-relaxed">
                    Setiap sudut dari Emerald Brew adalah karya seni arsitektur minimalis yang sempurna untuk portofolio Pinterest Anda.
                  </p>
                </div>

                {/* Pinterest Masonry Grid */}
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                  {GALLERY_ITEMS.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="break-inside-avoid relative rounded-[20px] overflow-hidden group shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#E5E7EB]"
                    >
                      <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full object-cover h-auto group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                        <span className="text-emerald-400 text-[10px] uppercase tracking-widest font-bold mb-1">
                          {item.category}
                        </span>
                        <h4 className="text-white font-serif font-semibold text-lg">
                          {item.title}
                        </h4>
                      </div>
                    </motion.div>
                  ))}
                </div>

              </div>
            </section>

            {/* RESERVATION SECTION */}
            <section id="reservation" className="py-24 bg-[#F8F8F6]">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">
                  
                  {/* Informational Column */}
                  <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
                    <div className="space-y-4">
                      <span className="text-xs uppercase tracking-widest text-[#1C7C68] font-bold">Sistem Reservasi</span>
                      <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#1F2937] tracking-tight leading-tight">
                        Amankan Meja <br />Aesthetic Anda
                      </h2>
                      <p className="text-[#6B7280] font-light text-sm md:text-base leading-relaxed">
                        Kami menyediakan area privat dan meja terbaik untuk pertemuan bisnis, perayaan ulang tahun, atau sekedar mencari inspirasi dalam suasana yang hening.
                      </p>
                    </div>

                    {/* Quick guidelines */}
                    <div className="space-y-4 bg-white p-6 rounded-[20px] border border-[#E5E7EB] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                      <h4 className="font-bold text-sm text-[#0F5E4F] uppercase tracking-wider">Ketentuan Reservasi:</h4>
                      <ul className="text-xs text-[#6B7280] space-y-2 font-light">
                        <li className="flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1C7C68]"></span>
                          <span>Harap hadir 10 menit sebelum waktu reservasi.</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1C7C68]"></span>
                          <span>Reservasi gratis tanpa biaya pemesanan meja.</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1C7C68]"></span>
                          <span>Meja akan ditahan maksimal selama 15 menit.</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Form Column */}
                  <div className="lg:col-span-7">
                    <form 
                      onSubmit={handleReservationSubmit}
                      className="bg-white p-8 md:p-10 rounded-[32px] shadow-[0_10px_40px_rgba(15,94,79,0.04)] border border-[#E5E7EB] space-y-6"
                    >
                      <h3 className="font-serif font-semibold text-xl text-[#1F2937] border-b border-[#E5E7EB] pb-4">
                        Formulir Reservasi Instan
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="space-y-2">
                          <label className="block text-xs uppercase tracking-wider text-[#6B7280] font-semibold">Nama Lengkap</label>
                          <div className="relative">
                            <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                            <input 
                              type="text" 
                              required
                              value={reserveForm.nama}
                              onChange={(e) => setReserveForm({...reserveForm, nama: e.target.value})}
                              placeholder="Yunita"
                              className="w-full pl-12 pr-4 py-3 bg-[#F8F8F6] border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:border-[#0F5E4F] transition-colors"
                            />
                          </div>
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                          <label className="block text-xs uppercase tracking-wider text-[#6B7280] font-semibold">Nomor WhatsApp</label>
                          <div className="relative">
                            <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                            <input 
                              type="tel" 
                              required
                              value={reserveForm.phone}
                              onChange={(e) => setReserveForm({...reserveForm, phone: e.target.value})}
                              placeholder="628123456789"
                              className="w-full pl-12 pr-4 py-3 bg-[#F8F8F6] border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:border-[#0F5E4F] transition-colors"
                            />
                          </div>
                        </div>

                        {/* Number of Guests */}
                        <div className="space-y-2">
                          <label className="block text-xs uppercase tracking-wider text-[#6B7280] font-semibold">Jumlah Orang</label>
                          <div className="relative">
                            <Users size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                            <select 
                              value={reserveForm.guests}
                              onChange={(e) => setReserveForm({...reserveForm, guests: e.target.value})}
                              className="w-full pl-12 pr-4 py-3 bg-[#F8F8F6] border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:border-[#0F5E4F] transition-colors appearance-none"
                            >
                              <option value="1">1 Orang</option>
                              <option value="2">2 Orang</option>
                              <option value="4">4 Orang</option>
                              <option value="6">6 Orang</option>
                              <option value="8+">8+ Orang (Grup)</option>
                            </select>
                          </div>
                        </div>

                        {/* Date */}
                        <div className="space-y-2">
                          <label className="block text-xs uppercase tracking-wider text-[#6B7280] font-semibold">Tanggal Reservasi</label>
                          <div className="relative">
                            <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                            <input 
                              type="date" 
                              required
                              value={reserveForm.date}
                              onChange={(e) => setReserveForm({...reserveForm, date: e.target.value})}
                              className="w-full pl-12 pr-4 py-3 bg-[#F8F8F6] border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:border-[#0F5E4F] transition-colors"
                            />
                          </div>
                        </div>

                        {/* Time */}
                        <div className="space-y-2">
                          <label className="block text-xs uppercase tracking-wider text-[#6B7280] font-semibold">Jam Reservasi</label>
                          <div className="relative">
                            <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                            <input 
                              type="time" 
                              required
                              value={reserveForm.time}
                              onChange={(e) => setReserveForm({...reserveForm, time: e.target.value})}
                              className="w-full pl-12 pr-4 py-3 bg-[#F8F8F6] border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:border-[#0F5E4F] transition-colors"
                            />
                          </div>
                        </div>

                        {/* Notes */}
                        <div className="space-y-2 md:col-span-2">
                          <label className="block text-xs uppercase tracking-wider text-[#6B7280] font-semibold">Catatan Khusus (Opsional)</label>
                          <div className="relative">
                            <FileText size={16} className="absolute left-4 top-[14px] text-[#6B7280]" />
                            <textarea 
                              rows={3}
                              value={reserveForm.notes}
                              onChange={(e) => setReserveForm({...reserveForm, notes: e.target.value})}
                              placeholder="Dekat jendela, siapkan lilin ulang tahun, dll..."
                              className="w-full pl-12 pr-4 py-3 bg-[#F8F8F6] border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:border-[#0F5E4F] transition-colors resize-none"
                            />
                          </div>
                        </div>
                      </div>

                      <button 
                        type="submit"
                        className="w-full py-4 bg-[#0F5E4F] hover:bg-[#1C7C68] text-white text-sm font-semibold tracking-wider uppercase rounded-full shadow-[0_4px_20px_rgba(15,94,79,0.15)] hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        <Send size={16} />
                        <span>Kirim Reservasi via WhatsApp</span>
                      </button>
                    </form>
                  </div>

                </div>
              </div>
            </section>

            {/* CONTACT & MAP SECTION */}
            <section id="contact" className="py-24 bg-white">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  
                  {/* Details column */}
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <span className="text-xs uppercase tracking-widest text-[#1C7C68] font-bold">Kunjungi Kami</span>
                      <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#1F2937] tracking-tight leading-tight">Lokasi & Kontak</h2>
                    </div>

                    <div className="space-y-6">
                      {/* Address */}
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-[#F8F8F6] rounded-full flex items-center justify-center text-[#0F5E4F] border border-[#E5E7EB] shrink-0 shadow-[0_4px_10px_rgba(0,0,0,0.02)]">
                          <MapPin size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-[#1F2937]">Alamat Utama</h4>
                          <p className="text-xs text-[#6B7280] leading-relaxed mt-1">
                            Jl. Jenderal Sudirman No. 45, Kebayoran Baru, Jakarta Selatan, 12190
                          </p>
                        </div>
                      </div>

                      {/* Operational Hours */}
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-[#F8F8F6] rounded-full flex items-center justify-center text-[#0F5E4F] border border-[#E5E7EB] shrink-0 shadow-[0_4px_10px_rgba(0,0,0,0.02)]">
                          <Clock size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-[#1F2937]">Jam Operasional</h4>
                          <p className="text-xs text-[#6B7280] leading-relaxed mt-1">
                            Senin - Jumat : 08.00 - 22.00 WIB <br />
                            Sabtu - Minggu : 09.00 - 23.00 WIB
                          </p>
                        </div>
                      </div>

                      {/* Email & Phone */}
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-[#F8F8F6] rounded-full flex items-center justify-center text-[#0F5E4F] border border-[#E5E7EB] shrink-0 shadow-[0_4px_10px_rgba(0,0,0,0.02)]">
                          <Mail size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-[#1F2937]">Kontak Digital</h4>
                          <p className="text-xs text-[#6B7280] leading-relaxed mt-1">
                            Email: contact@emeraldbrew.com <br />
                            WhatsApp: +62 812-3456-7890
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action button */}
                    <button 
                      onClick={() => window.open('https://wa.me/6281234567890?text=Halo%20Emerald%20Brew', '_blank')}
                      className="px-8 py-3.5 bg-[#1C7C68] hover:bg-[#0F5E4F] text-white text-xs font-semibold tracking-wider uppercase rounded-full shadow-[0_4px_20px_rgba(28,124,104,0.15)] hover:shadow-lg transition-all duration-300 flex items-center space-x-2 cursor-pointer"
                    >
                      <Phone size={14} />
                      <span>Hubungi via WhatsApp</span>
                    </button>
                  </div>

                  {/* Map column */}
                  <div className="rounded-[32px] overflow-hidden border border-[#E5E7EB] shadow-[0_10px_40px_rgba(0,0,0,0.03)] h-[380px] relative">
                    <iframe 
                      title="Emerald Brew Location"
                      src="https://www.google.com/maps/embed?pb=!11m18!1m12!1m3!1d3966.2541334057863!2d106.80436857410068!3d-6.230198061011854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f15049fb59f1%3A0x6335165c711a3b50!2sKebayoran%20Baru%2C%20South%20Jakarta%20City%2C%20Jakarta!5e0!3m2!1sen!2sid!4v1690000000000!5m2!1sen!2sid" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen={true} 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>

                </div>
              </div>
            </section>
          </div>
        ) : (
          /* UAS ABOUT US PAGE */
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="py-16 bg-[#F8F8F6]"
          >
            <div className="max-w-4xl mx-auto px-6">
              
              {/* Back breadcrumb */}
              <button 
                onClick={() => setCurrentPage('home')}
                className="inline-flex items-center space-x-2 text-xs font-medium text-[#1C7C68] hover:text-[#0F5E4F] transition-colors mb-10 cursor-pointer"
              >
                <span>&larr; Kembali ke Beranda Emerald Brew</span>
              </button>

              {/* Student Bio Card */}
              <div className="bg-white rounded-[32px] border border-[#E5E7EB] shadow-[0_10px_40px_rgba(15,94,79,0.03)] overflow-hidden grid grid-cols-1 md:grid-cols-12">
                
                {/* Photo Area */}
                <div className="md:col-span-5 bg-gradient-to-br from-[#0F5E4F] to-[#1C7C68] p-10 flex flex-col justify-between text-white relative overflow-hidden min-h-[350px]">
                  {/* Decorative backdrop graphics */}
                  <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-white/5 rounded-full"></div>
                  
                  <div className="space-y-4">
                    <span className="bg-white/25 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold backdrop-blur-md">
                      Kreator Website
                    </span>
                    <h2 className="font-serif text-3xl font-semibold tracking-tight">Yunita</h2>
                    <p className="text-xs text-white/80 leading-relaxed font-light">
                      Mahasiswa STIE Ekadharma Indonesia program Aplikasi Komputer Bisnis.
                    </p>
                  </div>

                  {/* Geometric Mockup Photo Placeholder */}
                  <div className="w-32 h-32 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex flex-col items-center justify-center space-y-2 self-center my-6">
                    <User size={36} className="text-white/60" />
                    <span className="text-[10px] text-white/50 tracking-widest uppercase">Photo</span>
                  </div>

                  <div className="space-y-1">
                    <span className="block text-[10px] text-white/50 uppercase tracking-wider">Lembaga Pendidikan</span>
                    <span className="block text-xs font-medium">STIE Ekadharma Indonesia</span>
                  </div>
                </div>

                {/* Info Fields */}
                <div className="md:col-span-7 p-8 md:p-10 flex flex-col justify-between space-y-8">
                  <div className="space-y-6">
                    <div className="inline-flex items-center space-x-2 bg-[#0F5E4F]/5 px-3 py-1 rounded-full text-xs text-[#0F5E4F] font-semibold">
                      <GraduationCap size={14} />
                      <span>Data Akademik Mahasiswa</span>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <span className="block text-[10px] text-[#6B7280] uppercase tracking-widest font-semibold">Nama Lengkap</span>
                        <span className="block text-sm font-bold text-[#1F2937]">Yuyun Sri Wahyuni</span>
                      </div>
                      <div className="space-y-1">
                        <span className="block text-[10px] text-[#6B7280] uppercase tracking-widest font-semibold">NIM</span>
                        <span className="block text-sm font-bold text-[#1F2937]">20230810045</span>
                      </div>
                      <div className="space-y-1">
                        <span className="block text-[10px] text-[#6B7280] uppercase tracking-widest font-semibold">Semester</span>
                        <span className="block text-sm font-bold text-[#1F2937]">6 (Enam)</span>
                      </div>
                      <div className="space-y-1">
                        <span className="block text-[10px] text-[#6B7280] uppercase tracking-widest font-semibold">Kelas</span>
                        <span className="block text-sm font-bold text-[#1F2937]">Malam - Manajemen</span>
                      </div>
                    </div>
                  </div>

                  {/* REQUIRED STATEMENT TEXT */}
                  <div className="bg-[#F8F8F6] p-6 rounded-2xl border border-[#E5E7EB] relative">
                    <p className="text-xs text-[#1F2937] leading-relaxed italic">
                      "Website ini dibuat sebagai Ujian Akhir Semester Mata Kuliah Aplikasi Komputer Bisnis Kampus STIE Ekadharma Indonesia."
                    </p>
                  </div>
                </div>

              </div>

              {/* Kesan & Pesan Section */}
              <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                
                {/* Add Feedback Form */}
                <div className="lg:col-span-5 bg-white p-8 rounded-[32px] border border-[#E5E7EB] space-y-6 shadow-[0_10px_40px_rgba(15,94,79,0.03)]">
                  <h3 className="font-serif font-semibold text-lg text-[#1F2937] border-b border-[#E5E7EB] pb-3">
                    Kesan & Pesan
                  </h3>
                  <p className="text-xs text-[#6B7280] font-light leading-relaxed">
                    Tuliskan komentar, kesan, atau saran Anda mengenai mata kuliah Aplikasi Komputer Bisnis ini.
                  </p>

                  <form onSubmit={handleAddFeedback} className="space-y-4">
                    <div className="space-y-1">
                      <label className="block text-[10px] uppercase tracking-wider text-[#6B7280] font-semibold">Nama</label>
                      <input 
                        type="text"
                        required
                        value={newFeedback.name}
                        onChange={(e) => setNewFeedback({...newFeedback, name: e.target.value})}
                        placeholder="Masukkan nama Anda..."
                        className="w-full px-4 py-2.5 bg-[#F8F8F6] border border-[#E5E7EB] rounded-xl text-xs focus:outline-none focus:border-[#0F5E4F]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] uppercase tracking-wider text-[#6B7280] font-semibold">Pilih Rating</label>
                      <select 
                        value={newFeedback.rating}
                        onChange={(e) => setNewFeedback({...newFeedback, rating: parseInt(e.target.value)})}
                        className="w-full px-4 py-2.5 bg-[#F8F8F6] border border-[#E5E7EB] rounded-xl text-xs focus:outline-none focus:border-[#0F5E4F]"
                      >
                        <option value="5">⭐⭐⭐⭐⭐ Excellent (5/5)</option>
                        <option value="4">⭐⭐⭐⭐ Good (4/5)</option>
                        <option value="3">⭐⭐ Neutral (3/5)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] uppercase tracking-wider text-[#6B7280] font-semibold">Kesan & Pesan</label>
                      <textarea 
                        required
                        rows={4}
                        value={newFeedback.message}
                        onChange={(e) => setNewFeedback({...newFeedback, message: e.target.value})}
                        placeholder="Tulis kesan Anda mengikuti mata kuliah..."
                        className="w-full px-4 py-2.5 bg-[#F8F8F6] border border-[#E5E7EB] rounded-xl text-xs focus:outline-none focus:border-[#0F5E4F] resize-none"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-3 bg-[#0F5E4F] hover:bg-[#1C7C68] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                    >
                      Kirim Kesan & Pesan
                    </button>
                  </form>
                </div>

                {/* Feedback List */}
                <div className="lg:col-span-7 space-y-4">
                  <h3 className="font-serif font-semibold text-lg text-[#1F2937] flex items-center space-x-2">
                    <MessageSquare size={18} className="text-[#0F5E4F]" />
                    <span>Testimoni Mahasiswa & Dosen</span>
                  </h3>

                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {studentFeedback.map((item) => (
                      <motion.div 
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white p-6 rounded-[20px] border border-[#E5E7EB] shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_20px_rgba(15,94,79,0.04)] transition-all duration-300 space-y-3"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="block font-bold text-xs text-[#1F2937]">{item.name}</span>
                            <span className="block text-[9px] text-[#6B7280] mt-0.5">{item.createdAt}</span>
                          </div>
                          <div className="text-yellow-400 text-xs">
                            {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
                          </div>
                        </div>
                        <p className="text-xs text-[#6B7280] leading-relaxed font-light">
                          {item.message}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </motion.div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-[#0F5E4F] text-white pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-12">
          
          {/* Logo & Slogan Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#0F5E4F]">
                <Coffee size={16} />
              </div>
              <span className="font-sans font-bold text-lg tracking-wider">EMERALD BREW</span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed font-light">
              Premium modern minimalist coffee shop inspired by Korean cafe aesthetic. Where every single cup of coffee brings you warmth and inner peace.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-widest text-[#38A169]">Navigasi Cepat</h4>
            <ul className="text-xs space-y-2.5 text-white/70 font-light">
              <li><button onClick={() => handleNavClick('home')} className="hover:text-white transition-colors cursor-pointer text-left">Home</button></li>
              <li><button onClick={() => handleNavClick('about')} className="hover:text-white transition-colors cursor-pointer text-left">About Us</button></li>
              <li><button onClick={() => handleNavClick('menu')} className="hover:text-white transition-colors cursor-pointer text-left">Our Menu</button></li>
              <li><button onClick={() => handleNavClick('gallery')} className="hover:text-white transition-colors cursor-pointer text-left">Gallery</button></li>
              <li><button onClick={handleGoToUasAbout} className="hover:text-white transition-colors font-bold text-left text-[#38A169]">UAS Page</button></li>
            </ul>
          </div>

          {/* Business Hours Summary */}
          <div className="space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-widest text-[#38A169]">Jam Operasional</h4>
            <ul className="text-xs space-y-2 text-white/70 font-light">
              <li className="flex justify-between">
                <span>Senin - Jumat:</span>
                <span>08.00 - 22.00 WIB</span>
              </li>
              <li className="flex justify-between">
                <span>Sabtu - Minggu:</span>
                <span>09.00 - 23.00 WIB</span>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-widest text-[#38A169]">Hubungkan Dengan Kami</h4>
            <p className="text-xs text-white/70 font-light">Ikuti akun resmi kami untuk update menu terbaru dan promo menarik.</p>
            <div className="flex space-x-3">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#38A169] transition-colors flex items-center justify-center text-white">
                <Instagram size={16} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#38A169] transition-colors flex items-center justify-center text-white">
                <Facebook size={16} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-white/50 font-light space-y-4 md:space-y-0">
          <span>&copy; 2026 Emerald Brew Cafe Jakarta. Semua Hak Cipta Dilindungi.</span>
          <div className="flex items-center space-x-1">
            <span>Dibuat dengan</span>
            <Heart size={10} className="text-[#38A169] fill-current" />
            <span>untuk UAS STIE Ekadharma Indonesia</span>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-[#0F5E4F] hover:bg-[#1C7C68] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-50 cursor-pointer"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
