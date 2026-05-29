'use client';
import { ExternalLink, Github, Linkedin, Twitter, Instagram, PenTool, Menu, X, Send } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

const TITLES = [
  "Full Stack Engineer.",
  "System Architect.",
  "Machine Learning Prospect",
  "Code Janitor."
];

function Typewriter() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % TITLES.length;
      const fullText = TITLES[i];

      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1));

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
        setTypingSpeed(40);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(100);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <div className="text-lg sm:text-xl font-mono text-zinc-300 tracking-tight flex items-center min-h-[28px] mb-6">
      <span>{text}</span>
      <span className="w-2 h-5 bg-emerald-500 ml-1.5 animate-[pulse_1s_steps(2,start)_infinite]"></span>
    </div>
  );
}

function SelectionHeader() {
  return (
    <div className="relative inline-block w-full md:w-auto text-left mb-2 pt-2">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-6xl sm:text-[80px] lg:text-[110px] font-heading font-extrabold leading-[0.85] tracking-tighter text-zinc-50 relative z-10 select-none py-2"
      >
        Hey, I'm Melvin.
      </motion.h1>

      <motion.div
        className="absolute top-4 sm:top-6 left-0 h-[calc(100%-2rem)] bg-zinc-50/20 z-20 pointer-events-none rounded-sm backdrop-invert-[0.1]"
        initial={{ width: "0%", left: "0%" }}
        animate={{
          width: ["0%", "100%", "100%", "0%", "0%"],
          left: ["0%", "0%", "0%", "100%", "0%"]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", times: [0, 0.3, 0.6, 0.9, 1] }}
      />

      <motion.div
        className="absolute z-30 pointer-events-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 1, 0, 0],
          left: ["-5%", "0%", "100%", "105%", "-5%"],
          top: ["80%", "30%", "30%", "80%", "80%"]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", times: [0, 0.1, 0.6, 0.7, 1] }}
      >
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none" className="-ml-3 -mt-3 text-emerald-400">
          <path fillRule="evenodd" clipRule="evenodd" d="M11.6688 28.5L5 4L28.1883 13.4158L16.8967 16.5333L21.3204 26.6667L15.3533 20.0883L11.6688 28.5Z" fill="currentColor" />
          <path d="M11.6688 28.5L5 4L28.1883 13.4158L16.8967 16.5333M11.6688 28.5L16.8967 16.5333M11.6688 28.5L15.3537 20.0883M16.8967 16.5333L21.3204 26.6667" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </div>
  );
}

function TimeWidget() {
  const [mounted, setMounted] = useState(false);
  const [visitorTime, setVisitorTime] = useState("");
  const [lagosTime, setLagosTime] = useState("");

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      setVisitorTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
      try {
        setLagosTime(now.toLocaleTimeString('en-US', { timeZone: 'Africa/Lagos', hour: '2-digit', minute: '2-digit' }));
      } catch (e) {
        setLagosTime("..."); // Fallback if timezone not found
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return <div className="h-[66px] w-[200px]" />; // Skeleton size

  return (
    <div className="flex flex-col gap-2.5 p-4 border border-zinc-900 bg-zinc-950/50 rounded-xl w-full sm:w-auto shadow-inner">
      <div className="flex items-center justify-between gap-8 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
        <span>Lagos Time</span>
        <span className="text-zinc-300 bg-zinc-900 px-2 py-0.5 rounded-sm">{lagosTime}</span>
      </div>
      <div className="flex items-center justify-between gap-8 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
        <span>Your Time</span>
        <span className="text-zinc-300 bg-zinc-900 px-2 py-0.5 rounded-sm">{visitorTime}</span>
      </div>
    </div>
  );
}

function MobileNav({ isScrolled }: { isScrolled: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isScrolled) setIsOpen(false);
  }, [isScrolled]);

  return (
    <div
      className="md:hidden fixed z-[70] left-0 right-0 flex justify-center pointer-events-none transition-all duration-500 ease-out"
      style={{
        top: isScrolled ? '24px' : '-100px',
        transform: `translateY(${isScrolled ? '0' : '-20px'})`,
        opacity: isScrolled ? 1 : 0
      }}
    >
      <motion.div
        layout
        className="pointer-events-auto bg-zinc-950/90 backdrop-blur-xl border border-zinc-800 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.8)] overflow-hidden flex flex-col justify-center"
        style={{ width: isOpen ? '90vw' : '180px', maxWidth: '320px' }}
      >
        <div className="flex items-center justify-between px-4 py-2 min-h-[48px]">
          {isOpen ? (
            <span className="text-zinc-50 text-[10px] font-mono uppercase tracking-widest pl-2">Navigation</span>
          ) : (
            <div className="flex items-center gap-3 pl-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-mono text-zinc-300 uppercase tracking-widest">Melvin</span>
            </div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 -mr-1 text-zinc-400 hover:text-zinc-50 transition-colors bg-zinc-900/50 rounded-full"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-col px-6 pb-6 gap-4 text-xs font-mono tracking-tighter text-zinc-400 uppercase border-t border-zinc-800/50 pt-4"
            >
              <a href="#about" onClick={() => setIsOpen(false)} className="hover:text-zinc-50 transition-colors py-1">About</a>
              <a href="#projects" onClick={() => setIsOpen(false)} className="hover:text-zinc-50 transition-colors py-1">Projects</a>
              <a href="#experience" onClick={() => setIsOpen(false)} className="hover:text-zinc-50 transition-colors py-1">Experience</a>
              <a href="#blogs" onClick={() => setIsOpen(false)} className="hover:text-zinc-50 transition-colors py-1">Blogs</a>
              <a href="#tools" onClick={() => setIsOpen(false)} className="hover:text-zinc-50 transition-colors py-1">Tools</a>
              <a href="#contact" onClick={() => setIsOpen(false)} className="hover:text-zinc-50 transition-colors py-1">Contact</a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function Page() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans p-6 md:p-10 flex flex-col max-w-[1280px] mx-auto w-full selection:bg-zinc-50/20 relative">

      {/* Mobile Dynamic Island Nav */}
      <MobileNav isScrolled={isScrolled} />

      {/* Desktop Floating Navigation */}
      <div
        className={`hidden md:flex fixed top-6 left-0 right-0 z-[70] justify-center pointer-events-none transition-all duration-500 ease-out ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
      >
        <div className="flex flex-wrap gap-6 text-xs font-mono tracking-tighter text-zinc-400 uppercase justify-center border border-zinc-800 bg-zinc-950/90 backdrop-blur-xl p-3 px-8 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.8)] pointer-events-auto">
          <a href="#about" className="text-zinc-50 hover:opacity-80 transition-opacity">About</a>
          <a href="#projects" className="hover:text-zinc-50 transition-colors">Projects</a>
          <a href="#experience" className="hover:text-zinc-50 transition-colors">Experience</a>
          <a href="#blogs" className="hover:text-zinc-50 transition-colors">Blogs</a>
          <a href="#tools" className="hover:text-zinc-50 transition-colors">Tools</a>
          <a href="#contact" className="hover:text-zinc-50 transition-colors">Contact</a>
        </div>
      </div>

      {/* Standard Static Top Navigation */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`flex flex-col sm:flex-row justify-between items-center mb-16 pt-2 gap-6 transition-opacity duration-300 ${isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <div className="font-mono text-xs tracking-widest text-zinc-500 uppercase"></div>
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-xs font-mono tracking-tighter text-zinc-400 uppercase">
          <a href="#about" className="text-zinc-50 hover:opacity-80 transition-colors">About</a>
          <a href="#projects" className="hover:text-zinc-50 transition-colors">Projects</a>
          <a href="#experience" className="hover:text-zinc-50 transition-colors">Experience</a>
          <a href="#blogs" className="hover:text-zinc-50 transition-colors">Blogs</a>
          <a href="#tools" className="hover:text-zinc-50 transition-colors">Tools</a>
          <a href="#contact" className="hover:text-zinc-50 transition-colors">Contact</a>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <header id="about" className="mb-20 pt-4 lg:mb-24 flex flex-col md:flex-row items-center md:items-start justify-between gap-12 lg:gap-16 scroll-mt-32">

        <div className="flex-1 w-full order-2 md:order-1">
          <SelectionHeader />
          <Typewriter />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="max-w-xl"
          >
            <p className="text-zinc-400 text-sm leading-relaxed mb-8 font-light">
              I build scalable systems, dynamic web applications, and premium digital experiences.
              Currently engineering full-stack solutions and optimizing performance for high-impact platforms.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10">
              <a href="#projects" className="px-6 py-3 border border-zinc-50 text-zinc-50 text-xs font-mono uppercase tracking-widest hover:bg-zinc-50/5 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all">
                View Work
              </a>
              <TimeWidget />
            </div>

            {/* Socials / Connect */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="pt-8 border-t border-zinc-900/80 flex flex-wrap items-center gap-4"
            >
              <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mr-2">Connect</span>
              <a href="#" className="p-2.5 border border-zinc-900 bg-zinc-950 rounded-full text-zinc-400 hover:text-zinc-50 hover:border-zinc-700 hover:bg-zinc-900 transition-all group" title="X (Twitter)">
                <Twitter className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="p-2.5 border border-zinc-900 bg-zinc-950 rounded-full text-zinc-400 hover:text-zinc-50 hover:border-zinc-700 hover:bg-zinc-900 transition-all group" title="LinkedIn">
                <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="p-2.5 border border-zinc-900 bg-zinc-950 rounded-full text-zinc-400 hover:text-zinc-50 hover:border-zinc-700 hover:bg-zinc-900 transition-all group" title="GitHub">
                <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="p-2.5 border border-zinc-900 bg-zinc-950 rounded-full text-zinc-400 hover:text-zinc-50 hover:border-zinc-700 hover:bg-zinc-900 transition-all group" title="Medium">
                <PenTool className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="p-2.5 border border-zinc-900 bg-zinc-950 rounded-full text-zinc-400 hover:text-zinc-50 hover:border-zinc-700 hover:bg-zinc-900 transition-all group" title="Instagram">
                <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
            </motion.div>
          </motion.div>
        </div>

        <div className="order-1 md:order-2 flex flex-col items-center md:items-end p-4 md:p-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-32 h-32 md:w-44 md:h-44 shrink-0 rounded-full overflow-hidden border border-zinc-800 bg-zinc-900/50 relative group shadow-2xl mb-6 md:mb-0"
          >
            <Image
        src="/melvinpfp.jpg"
        alt="Melvin"
        fill
        className="object-cover grayscale opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
/>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mt-6 flex flex-col items-center md:items-end w-full"
          >
            <span className="block text-[10px] font-mono text-zinc-600 uppercase mb-2 italic leading-none">Status</span>
            <div className="px-4 py-2 border border-zinc-800 bg-zinc-900/30 rounded-full inline-flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-mono text-zinc-300 uppercase tracking-widest">Available for hire</span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Projects Bento Grid (Moved before Experience) */}
      <motion.section
        id="projects"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mb-24 pt-10 scroll-mt-20"
      >
        <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-10 pb-4 border-b border-zinc-900 inline-block pr-10">01 // Projects</h3>
        <div className="grid grid-cols-1 lg:grid-cols-12 auto-rows-[minmax(180px,auto)] lg:grid-rows-2 gap-4 flex-grow">

          {/* Project 1: Anchor */}
          <div className="lg:col-span-7 lg:row-span-2 group border border-zinc-800 hover:border-zinc-700 bg-zinc-900/20 p-8 flex flex-col justify-between transition-all duration-300">
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Infrastructure</span>
                <ExternalLink className="w-5 h-5 text-zinc-700 group-hover:text-zinc-400 transition-colors" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-heading font-bold tracking-tighter mb-2 text-zinc-50">Cura+ Health Platform</h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm font-light mb-8">
                Fully deployed Next.js web application with a secure Firebase Auth infrastructure, real-time Firestore database integration, and a sleek responsive UI.
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="px-2 py-1 bg-zinc-950 border border-zinc-800 text-[9px] font-mono text-zinc-500 uppercase">Next.js</span>
              <span className="px-2 py-1 bg-zinc-950 border border-zinc-800 text-[9px] font-mono text-zinc-500 uppercase">Firebase</span>
              <span className="px-2 py-1 bg-zinc-950 border border-zinc-800 text-[9px] font-mono text-zinc-500 uppercase">Tailwind</span>
            </div>
          </div>

          {/* Project 2: Utility */}
          <div className="lg:col-span-5 lg:row-span-1 group border border-zinc-800 hover:border-zinc-700 bg-zinc-900/20 p-6 flex flex-col justify-between transition-all duration-300">
            <div className="flex justify-between items-start">
              <div className="max-w-[200px] mb-4 sm:mb-0">
                <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest block mb-2">Tooling</span>
                <h3 className="text-xl font-heading font-bold tracking-tighter mb-1 text-zinc-50">CampusVault</h3>
                <p className="text-zinc-500 text-[10px] sm:text-xs leading-snug">High-speed academic repository and digital infrastructure for university ecosystems.</p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 shrink-0 border border-zinc-800 rounded-full flex items-center justify-center group-hover:border-zinc-600 transition-colors">
                <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap mt-4 sm:mt-0">
              <span className="px-2 py-1 bg-zinc-950 border border-zinc-800 text-[9px] font-mono text-zinc-500 uppercase">TypeScript</span>
              <span className="px-2 py-1 bg-zinc-950 border border-zinc-800 text-[9px] font-mono text-zinc-500 uppercase">PostgreSQL</span>
            </div>
          </div>

          {/* Project 3: Creative */}
          <div className="lg:col-span-5 lg:row-span-1 group border border-zinc-800 hover:border-zinc-700 bg-zinc-900/20 p-6 flex flex-col justify-between transition-all duration-300">
            <div className="flex justify-between items-start mb-4 lg:mb-0">
              <div>
                <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest block mb-2">Audio</span>
                <h3 className="text-xl font-heading font-bold tracking-tighter text-zinc-50 flex items-center gap-2">
                  Voidcore <ExternalLink className="w-4 h-4 text-zinc-700 group-hover:text-zinc-400 opacity-0 group-hover:opacity-100 transition-all" />
                </h3>
              </div>
            </div>
            <div className="flex items-end justify-between mt-auto">
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-zinc-950 border border-zinc-800 text-[9px] font-mono text-zinc-500 uppercase hidden sm:inline-block">Web Audio</span>
              </div>
              <div className="flex items-end gap-3">
                <div className="flex gap-0.5 h-6 items-end group-hover:gap-1 transition-all">
                  <div className="w-1 h-3 bg-zinc-700 animate-[pulse_1s_ease-in-out_infinite_alternate]"></div>
                  <div className="w-1 h-5 bg-zinc-600 animate-[pulse_1.2s_ease-in-out_infinite_alternate]"></div>
                  <div className="w-1 h-2 bg-zinc-700 animate-[pulse_0.8s_ease-in-out_infinite_alternate]"></div>
                  <div className="w-1 h-4 bg-zinc-500 animate-[pulse_1.5s_ease-in-out_infinite_alternate]"></div>
                  <div className="w-1 h-6 bg-zinc-400 animate-[pulse_1.1s_ease-in-out_infinite_alternate]"></div>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Live Player</span>
              </div>
            </div>
          </div>

        </div>
      </motion.section>

      {/* Experience Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        id="experience"
        className="mb-24 scroll-mt-20"
      >
        <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-10 pb-4 border-b border-zinc-900 inline-block pr-10">02 // Experience</h3>
        <div className="space-y-12 pl-4 sm:pl-6 border-l border-zinc-900 ml-2">

          <div className="relative group">
            <div className="absolute -left-[22px] sm:-left-[30px] top-[9px] w-3 h-3 bg-zinc-700 group-hover:bg-zinc-50 rounded-full outline outline-4 outline-zinc-950 transition-colors"></div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
              <h4 className="text-xl sm:text-2xl font-heading font-bold text-zinc-50 tracking-tight">Software Engineer</h4>
              <span className="text-[10px] font-mono text-zinc-500 md:mt-0 uppercase tracking-widest">Mar 2024 - Present</span>
            </div>
            <div className="text-xs text-emerald-500/80 font-mono mb-4 uppercase tracking-wider">kay.ai</div>
            <p className="text-sm text-zinc-400 leading-relaxed font-light max-w-2xl">
              Building high-performance interfaces and scalable systems. Leading full-stack engineering efforts to conceptualize, construct, and optimize core web products from the ground up.
            </p>
          </div>

        </div>
      </motion.section>

      {/* Blogs & Tools Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-16">

        {/* Blogs */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          id="blogs"
          className="scroll-mt-20"
        >
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-8 pb-4 border-b border-zinc-900 inline-block pr-10">03 // Blogs & Notes</h3>
          <div className="space-y-10">
            <a href="#" className="block group">
              <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest block mb-2">Apr 24, 2026</span>
              <h4 className="text-xl font-heading font-semibold text-zinc-200 group-hover:text-zinc-50 transition-colors tracking-tight">The Illusion of State: React Hooks Deep Dive</h4>
              <p className="text-sm text-zinc-500 mt-2 font-light line-clamp-2">A comprehensive guide to avoiding unnecessary renders in complex React applications by properly managing the dependency array and utilizing derived state.</p>
            </a>
            <a href="#" className="block group">
              <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest block mb-2">Mar 12, 2026</span>
              <h4 className="text-xl font-heading font-semibold text-zinc-200 group-hover:text-zinc-50 transition-colors tracking-tight">Designing Voidcore: The Minimalist Web</h4>
              <p className="text-sm text-zinc-500 mt-2 font-light line-clamp-2">Why pure black is too harsh, and how to use deep zinc grays for premium interfaces that breathe elegance and professionalism.</p>
            </a>
          </div>
        </motion.section>

        {/* Tools */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          id="tools"
          className="scroll-mt-20"
        >
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-8 pb-4 border-b border-zinc-900 inline-block pr-10">04 // Tools & Tech</h3>
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 bg-zinc-900/50 border border-zinc-800 text-xs font-mono text-zinc-300 rounded-sm">TypeScript</span>
            <span className="px-4 py-2 bg-zinc-900/50 border border-zinc-800 text-xs font-mono text-zinc-300 rounded-sm">React (Next.js)</span>
            <span className="px-4 py-2 bg-zinc-900/50 border border-zinc-800 text-xs font-mono text-zinc-300 rounded-sm">Tailwind CSS</span>
            <span className="px-4 py-2 bg-zinc-900/50 border border-zinc-800 text-xs font-mono text-zinc-300 rounded-sm">Node.js</span>
            <span className="px-4 py-2 bg-zinc-900/50 border border-zinc-800 text-xs font-mono text-zinc-300 rounded-sm">PostgreSQL</span>
            <span className="px-4 py-2 bg-zinc-900/50 border border-zinc-800 text-xs font-mono text-zinc-300 rounded-sm">Redis</span>
            <span className="px-4 py-2 bg-zinc-900/50 border border-zinc-800 text-xs font-mono text-zinc-300 rounded-sm">Framer Motion</span>
            <span className="px-4 py-2 bg-zinc-900/50 border border-zinc-800 text-xs font-mono text-zinc-300 rounded-sm">Figma</span>
            <span className="px-4 py-2 bg-zinc-900/50 border border-zinc-800 text-xs font-mono text-zinc-300 rounded-sm">Docker</span>
            <span className="px-4 py-2 bg-zinc-900/50 border border-zinc-800 text-xs font-mono text-zinc-300 rounded-sm">AWS</span>
          </div>
        </motion.section>
      </div>

      {/* Quick Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-8 mb-12 w-full pt-8 border-t border-zinc-900"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-zinc-900/10 p-6 md:p-8 rounded-2xl border border-zinc-800/50">
          <div>
            <h4 className="text-xl font-heading font-semibold text-zinc-50">Start a conversation</h4>
            <p className="text-sm text-zinc-500 mt-2 font-light">Interested in working together? Shoot me a quick message.</p>
          </div>
          <div className="flex w-full md:w-auto relative group">
            <input
              type="text"
              placeholder="Hey Melvin..."
              className="bg-zinc-950 border border-zinc-800 text-zinc-300 text-sm font-mono px-5 py-3 rounded-l-lg w-full md:w-80 focus:outline-none focus:border-zinc-500 transition-colors placeholder:text-zinc-700"
            />
            <button className="bg-zinc-50 text-zinc-950 px-5 py-3 rounded-r-lg hover:bg-zinc-300 transition-colors flex items-center justify-center font-medium">
              <Send className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        id="contact"
        className="flex flex-col sm:flex-row justify-center items-center pt-8 border-t border-zinc-900 gap-4 scroll-mt-20 mb-6 w-full"
      >
        <div className="flex gap-6">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="text-[10px] font-mono text-zinc-400 hover:text-zinc-50 uppercase transition-colors">GitHub</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-[10px] font-mono text-zinc-400 hover:text-zinc-50 uppercase transition-colors">LinkedIn</a>
          <a href="mailto:hello@example.com" className="text-[10px] font-mono text-zinc-400 hover:text-zinc-50 uppercase transition-colors underline underline-offset-4">Email</a>
        </div>
      </motion.footer>
    </div>
  );
}
