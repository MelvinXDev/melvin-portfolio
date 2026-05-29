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
              <a href="#education" onClick={() => setIsOpen(false)} className="hover:text-zinc-50 transition-colors py-1">Education</a>
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
  const [messageText, setMessageText] = useState("");
  const [showOptions, setShowOptions] = useState(false);

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
          <a href="#education" className="hover:text-zinc-50 transition-colors">Education</a>
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
          <a href="#education" className="hover:text-zinc-50 transition-colors">Education</a>
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
              <a href="https://x.com/MelvinXDev" target="_blank" rel="noreferrer" className="p-2.5 border border-zinc-900 bg-zinc-950 rounded-full text-zinc-400 hover:text-zinc-50 hover:border-zinc-700 hover:bg-zinc-900 transition-all group" title="X (Twitter)">
                <Twitter className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.linkedin.com/in/melvin-chinedu-70927328a/" target="_blank" rel="noreferrer" className="p-2.5 border border-zinc-900 bg-zinc-950 rounded-full text-zinc-400 hover:text-zinc-50 hover:border-zinc-700 hover:bg-zinc-900 transition-all group" title="LinkedIn">
                <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://github.com/MelvinXDev" target="_blank" rel="noreferrer" className="p-2.5 border border-zinc-900 bg-zinc-950 rounded-full text-zinc-400 hover:text-zinc-50 hover:border-zinc-700 hover:bg-zinc-900 transition-all group" title="GitHub">
                <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="p-2.5 border border-zinc-900 bg-zinc-950 rounded-full text-zinc-400 hover:text-zinc-50 hover:border-zinc-700 hover:bg-zinc-900 transition-all group" title="Medium">
                <PenTool className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.instagram.com/melvinxdev/" target="_blank" rel="noreferrer" className="p-2.5 border border-zinc-900 bg-zinc-950 rounded-full text-zinc-400 hover:text-zinc-50 hover:border-zinc-700 hover:bg-zinc-900 transition-all group" title="Instagram">
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

      {/* My Journey Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mb-24 scroll-mt-20"
      >
        <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-10 pb-4 border-b border-zinc-900 inline-block pr-10">01 // My Journey</h3>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4 text-xs font-mono text-emerald-500/80 uppercase tracking-wider md:sticky md:top-28">
            The narrative version of my software engineering adventure.
          </div>
          <div className="md:col-span-8 space-y-6 text-zinc-400 text-sm leading-relaxed font-light max-w-2xl">
            <p>
              My journey into software engineering started back in 2017 at Code Club Nigeria, where I wrote my very first lines of HTML. Throughout secondary school, I stayed close to tech, diving into IT fundamentals through the Cisco Networking Academy.
            </p>
            <p>
              I took a gap year after graduation to fully immerse myself in code, completing an intensive bootcamp that solidified my foundation in JavaScript, React, and Tailwind CSS. By 2025, I landed my first major role at Brandmind, where I led a team of four to build an AI-powered psychometric testing platform. Managing a product manager, a designer, and a co-developer taught me how to ship real products under pressure.
            </p>
            <p>
              Today, I'm pursuing my Software Engineering degree while concurrently studying Computer Science, and I serve as an active contributor in my local GDSC chapter. Whether I'm wiring up an Arduino security system in C++, or building AI-integrated e-commerce platforms in Next.js, my goal is always the same: building clean, scalable software that solves actual problems.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Projects Bento Grid */}
      <motion.section
        id="projects"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mb-24 pt-10 scroll-mt-20"
      >
        <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-10 pb-4 border-b border-zinc-900 inline-block pr-10">02 // Projects</h3>
        <div className="grid grid-cols-1 lg:grid-cols-12 auto-rows-[minmax(180px,auto)] gap-4 flex-grow">

          {/* Project 1: Cura+ */}
          <div className="lg:col-span-7 lg:row-span-2 group border border-zinc-800 hover:border-zinc-700 bg-zinc-900/20 p-8 flex flex-col justify-between transition-all duration-300">
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest">AI Healthcare Platform</span>
                <a href="https://cura-online-pharmacy-system.vercel.app/" target="_blank" rel="noreferrer" title="View Cura+ live platform">
                  <ExternalLink className="w-5 h-5 text-zinc-700 group-hover:text-zinc-400 transition-colors" />
                </a>
              </div>
              <h3 className="text-3xl sm:text-4xl font-heading font-bold tracking-tighter mb-2 text-zinc-50">
                <a href="https://cura-online-pharmacy-system.vercel.app/" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
                  Cura+
                </a>
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light mb-8 max-w-md">
                Developed a Next.js MVP that utilizes AI to scan user uploaded medical prescriptions, cross-reference pharmacy inventory, and generate educational summaries of the prescribed medications.
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="px-2 py-1 bg-zinc-950 border border-zinc-800 text-[9px] font-mono text-zinc-500 uppercase">Next.js</span>
              <span className="px-2 py-1 bg-zinc-950 border border-zinc-800 text-[9px] font-mono text-zinc-500 uppercase">AI (LLM)</span>
              <span className="px-2 py-1 bg-zinc-950 border border-zinc-800 text-[9px] font-mono text-zinc-500 uppercase">Firebase Auth</span>
              <span className="px-2 py-1 bg-zinc-950 border border-zinc-800 text-[9px] font-mono text-zinc-500 uppercase">Firestore</span>
            </div>
          </div>

          {/* Project 2: AI Real Estate Hub */}
          <div className="lg:col-span-5 lg:row-span-1 group border border-zinc-800 hover:border-zinc-700 bg-zinc-900/20 p-6 flex flex-col justify-between transition-all duration-300">
            <div className="flex justify-between items-start">
              <div className="max-w-[320px] mb-4 sm:mb-0">
                <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest block mb-2">AI Real Estate Hub</span>
                <h3 className="text-xl font-heading font-bold tracking-tighter mb-1 text-zinc-50">
                  <a href="https://berrylinproperties.com/" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
                    AI Property Portal
                  </a>
                </h3>
                <p className="text-zinc-500 text-[10px] sm:text-xs leading-snug">
                  Engineered a responsive property listing website utilizing React/Next.js. Integrated an AI text-refinement tool to format description summaries with WhatsApp and Email routing.
                </p>
              </div>
              <a href="https://berrylinproperties.com/" target="_blank" rel="noreferrer" className="h-10 w-10 sm:h-12 sm:w-12 shrink-0 border border-zinc-800 rounded-full flex items-center justify-center hover:border-emerald-500 hover:bg-emerald-500/10 transition-colors group/link" title="View live property portal">
                <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300 group-hover/link:text-emerald-400 transition-colors" />
              </a>
            </div>
            <div className="flex gap-2 flex-wrap mt-4 sm:mt-0">
              <span className="px-2 py-1 bg-zinc-950 border border-zinc-800 text-[9px] font-mono text-zinc-500 uppercase">React</span>
              <span className="px-2 py-1 bg-zinc-950 border border-zinc-800 text-[9px] font-mono text-zinc-500 uppercase">Next.js</span>
              <span className="px-2 py-1 bg-zinc-950 border border-zinc-800 text-[9px] font-mono text-zinc-500 uppercase">AI Refinement</span>
            </div>
          </div>

          {/* Project 3: Ubani */}
          <div className="lg:col-span-5 lg:row-span-1 group border border-zinc-800 hover:border-zinc-700 bg-zinc-900/20 p-6 flex flex-col justify-between transition-all duration-300">
            <div className="flex justify-between items-start mb-4 lg:mb-0">
              <div>
                <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest block mb-2">Real Estate Startup</span>
                <h3 className="text-xl font-heading font-bold tracking-tighter text-zinc-50 flex items-center gap-2">
                  Ubani <span className="text-[9px] font-mono px-1.5 py-0.5 border border-amber-500/30 text-amber-500/80 rounded bg-amber-500/5 normal-case font-normal">Architecture Only</span>
                </h3>
                <p className="text-zinc-500 text-[10px] sm:text-xs leading-snug mt-2">
                  Designed and developed the architecture for a comprehensive real estate platform, solidifying advanced state management and React fundamentals.
                </p>
              </div>
            </div>
            <div className="flex items-end justify-between mt-auto">
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-zinc-950 border border-zinc-800 text-[9px] font-mono text-zinc-500 uppercase">State Management</span>
                <span className="px-2 py-1 bg-zinc-950 border border-zinc-800 text-[9px] font-mono text-zinc-500 uppercase">System Design</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-600 uppercase italic">Blueprint</span>
            </div>
          </div>

          {/* Project 4: Smart Door Security */}
          <div className="lg:col-span-12 lg:row-span-1 group border border-zinc-800 hover:border-zinc-700 bg-zinc-900/20 p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center transition-all duration-300 gap-6">
            <div className="flex-grow max-w-3xl">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Hardware / IoT Security</span>
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></span>
              </div>
              <h3 className="text-2xl font-heading font-bold tracking-tighter mb-2 text-zinc-50">Smart Door Security System</h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light">
                Built a physical hardware security project using C++ and an Arduino microcontroller. Programmed logic to monitor door status and trigger scheduled alarms for unauthorized access during restricted hours.
              </p>
            </div>
            <div className="flex flex-col items-start sm:items-end justify-between sm:h-full gap-4 shrink-0">
              <div className="flex gap-0.5 h-6 items-end group-hover:gap-1 transition-all">
                <div className="w-1.5 h-3 bg-red-950/80 group-hover:bg-red-500 transition-colors"></div>
                <div className="w-1.5 h-5 bg-red-900/60 group-hover:bg-red-500 transition-colors"></div>
                <div className="w-1.5 h-2 bg-red-950/80 group-hover:bg-red-500 transition-colors"></div>
                <div className="w-1.5 h-4 bg-red-800/80 group-hover:bg-red-500 transition-colors animate-pulse"></div>
                <div className="w-1.5 h-6 bg-red-700/80 group-hover:bg-red-500 transition-colors"></div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <span className="px-2 py-1 bg-zinc-950 border border-zinc-800 text-[9px] font-mono text-zinc-500 uppercase">C++</span>
                <span className="px-2 py-1 bg-zinc-950 border border-zinc-800 text-[9px] font-mono text-zinc-500 uppercase">Arduino</span>
                <span className="px-2 py-1 bg-zinc-950 border border-zinc-800 text-[9px] font-mono text-zinc-500 uppercase">Microcontroller</span>
                <span className="px-2 py-1 bg-zinc-950 border border-zinc-800 text-[9px] font-mono text-zinc-500 uppercase">IoT</span>
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
        <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-10 pb-4 border-b border-zinc-900 inline-block pr-10">03 // Experience</h3>
        <div className="space-y-12 pl-4 sm:pl-6 border-l border-zinc-900 ml-2">

          {/* Brandmind */}
          <div className="relative group">
            <div className="absolute -left-[22px] sm:-left-[30px] top-[9px] w-3 h-3 bg-zinc-700 group-hover:bg-zinc-50 rounded-full outline outline-4 outline-zinc-950 transition-colors"></div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
              <h4 className="text-xl sm:text-2xl font-heading font-bold text-zinc-50 tracking-tight">Software Engineer & Team Lead</h4>
              <span className="text-[10px] font-mono text-zinc-500 md:mt-0 uppercase tracking-widest">2025 – Jan 2026</span>
            </div>
            <div className="text-xs text-emerald-500/80 font-mono mb-4 uppercase tracking-wider">Brandmind</div>
            <ul className="text-sm text-zinc-400 leading-relaxed font-light max-w-2xl list-disc list-outside pl-4 space-y-2">
              <li>Architected and developed an AI-powered psychometric testing platform designed to assess behavioral patterns based on dynamic user inputs.</li>
              <li>Led a cross-functional product team of 4 (including a Product Manager, UI/UX Designer, and Co-developer) to successfully deliver the MVP, earning direct commendation from company leadership.</li>
              <li>Managed the integration of artificial intelligence tools to process and refine user assessment data.</li>
            </ul>
          </div>

          {/* GDSC */}
          <div className="relative group">
            <div className="absolute -left-[22px] sm:-left-[30px] top-[9px] w-3 h-3 bg-zinc-700 group-hover:bg-zinc-50 rounded-full outline outline-4 outline-zinc-950 transition-colors"></div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
              <h4 className="text-xl sm:text-2xl font-heading font-bold text-zinc-50 tracking-tight">Technical Contributor</h4>
              <span className="text-[10px] font-mono text-zinc-500 md:mt-0 uppercase tracking-widest">100 Level – Present</span>
            </div>
            <div className="text-xs text-emerald-500/80 font-mono mb-4 uppercase tracking-wider">Google Developer Student Clubs (GDSC) – Lead City University</div>
            <ul className="text-sm text-zinc-400 leading-relaxed font-light max-w-2xl list-disc list-outside pl-4 space-y-2">
              <li>Actively collaborated with peers to build technical projects and explore artificial intelligence implementations.</li>
              <li>Participated in software development workshops, reinforcing core programming principles and modern framework architecture.</li>
            </ul>
          </div>

          {/* Course Rep */}
          <div className="relative group">
            <div className="absolute -left-[22px] sm:-left-[30px] top-[9px] w-3 h-3 bg-zinc-700 group-hover:bg-zinc-50 rounded-full outline outline-4 outline-zinc-950 transition-colors"></div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
              <h4 className="text-xl sm:text-2xl font-heading font-bold text-zinc-50 tracking-tight">Course Representative</h4>
              <span className="text-[10px] font-mono text-zinc-500 md:mt-0 uppercase tracking-widest">100 Level</span>
            </div>
            <div className="text-xs text-emerald-500/80 font-mono mb-4 uppercase tracking-wider">Lead City University Faculty of Software Engineering</div>
            <ul className="text-sm text-zinc-400 leading-relaxed font-light max-w-2xl list-disc list-outside pl-4 space-y-2">
              <li>Acted as the primary liaison between the university faculty and the Software Engineering student body.</li>
              <li>Coordinated schedules, managed academic resources, and advocated for student needs within the department.</li>
            </ul>
          </div>

        </div>
      </motion.section>

      {/* Education Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        id="education"
        className="mb-24 scroll-mt-20"
      >
        <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-10 pb-4 border-b border-zinc-900 inline-block pr-10">04 // Education</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pl-2">

          {/* Lead City University */}
          <div className="border border-zinc-900 bg-zinc-950/30 p-6 rounded-xl relative group hover:border-zinc-800 transition-all">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-mono text-emerald-500/80 uppercase tracking-widest">University Degree</span>
              <span className="text-[10px] font-mono text-zinc-500">Currently in 200 Level</span>
            </div>
            <h4 className="text-lg font-heading font-bold text-zinc-50 mb-1">Bachelor of Science in Software Engineering</h4>
            <p className="text-xs text-zinc-400 font-mono mb-3">Lead City University</p>
            <p className="text-xs text-zinc-500 font-light leading-relaxed">
              Pursuing a deep theoretical and practical foundation in software systems, algorithmic complexity, and software development methodologies.
            </p>
          </div>

          {/* University of the People */}
          <div className="border border-zinc-900 bg-zinc-950/30 p-6 rounded-xl relative group hover:border-zinc-800 transition-all">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-mono text-emerald-500/80 uppercase tracking-widest">Asynchronous Degree</span>
              <span className="text-[10px] font-mono text-zinc-500">Concurrent Studies</span>
            </div>
            <h4 className="text-lg font-heading font-bold text-zinc-50 mb-1">Associate of Science in Computer Science</h4>
            <p className="text-xs text-zinc-400 font-mono mb-3">University of the People</p>
            <p className="text-xs text-zinc-500 font-light leading-relaxed">
              Engaging in self-paced academic coursework covering software design, databases, operating systems, and discrete mathematics.
            </p>
          </div>

          {/* Web Development Bootcamp */}
          <div className="border border-zinc-900 bg-zinc-950/30 p-6 rounded-xl relative group hover:border-zinc-800 transition-all">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-mono text-emerald-500/80 uppercase tracking-widest">Bootcamp</span>
              <span className="text-[10px] font-mono text-zinc-500">3-Month Immersive</span>
            </div>
            <h4 className="text-lg font-heading font-bold text-zinc-50 mb-1">Intensive Web Development</h4>
            <p className="text-xs text-zinc-400 font-mono mb-3">Full-Stack Immersive Program</p>
            <p className="text-xs text-zinc-500 font-light leading-relaxed">
              Completed an intensive hands-on curriculum focusing on JavaScript, HTML, CSS, React, and Tailwind CSS, building responsive and interactive web applications.
            </p>
          </div>

          {/* Cisco Networking Academy */}
          <div className="border border-zinc-900 bg-zinc-950/30 p-6 rounded-xl relative group hover:border-zinc-800 transition-all">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-mono text-emerald-500/80 uppercase tracking-widest">Academy Certificate</span>
              <span className="text-[10px] font-mono text-zinc-500">Secondary School</span>
            </div>
            <h4 className="text-lg font-heading font-bold text-zinc-50 mb-1">Foundational IT & Network Infrastructure</h4>
            <p className="text-xs text-zinc-400 font-mono mb-3">Cisco Networking Academy</p>
            <p className="text-xs text-zinc-500 font-light leading-relaxed">
              Gained hands-on exposure to network architecture, routing and switching principles, hardware systems, and foundational IT operations.
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
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-8 pb-4 border-b border-zinc-900 inline-block pr-10">05 // Blogs & Notes</h3>
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
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-8 pb-4 border-b border-zinc-900 inline-block pr-10">06 // Tools & Tech</h3>
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
            <div className="flex flex-wrap gap-4 mt-4">
              <a href="https://wa.me/2348066300182" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[10px] font-mono text-zinc-400 hover:text-emerald-400 transition-colors bg-zinc-950/40 border border-zinc-900 px-3 py-1.5 rounded-full hover:border-emerald-500/30 group" title="Chat on WhatsApp">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-[pulse_1.5s_infinite]"></span>
                WhatsApp: +234 806 630 0182
              </a>
              <a href="https://discord.com/users/melvinxdev" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[10px] font-mono text-zinc-400 hover:text-indigo-400 transition-colors bg-zinc-950/40 border border-zinc-900 px-3 py-1.5 rounded-full hover:border-indigo-500/30 group" title="Message on Discord">
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-[pulse_1.5s_infinite]"></span>
                Discord: melvinxdev
              </a>
            </div>
          </div>
          <div className="w-full md:w-auto relative overflow-hidden min-h-[50px] flex items-center">
            <AnimatePresence mode="wait">
              {!showOptions ? (
                <motion.form
                  key="input-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (messageText.trim()) {
                      setShowOptions(true);
                    }
                  }}
                  className="flex w-full md:w-auto relative group"
                >
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Hey Melvin..."
                    className="bg-zinc-950 border border-zinc-800 text-zinc-300 text-sm font-mono px-5 py-3 rounded-l-lg w-full md:w-80 focus:outline-none focus:border-zinc-500 transition-colors placeholder:text-zinc-700"
                  />
                  <button 
                    type="submit"
                    className="bg-zinc-50 text-zinc-950 px-5 py-3 rounded-r-lg hover:bg-zinc-300 transition-colors flex items-center justify-center font-medium"
                  >
                    <Send className="w-4 h-4 ml-1" />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="options-selector"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-3 w-full md:w-80 border border-zinc-850 bg-zinc-950 p-4 rounded-xl shadow-2xl relative z-10"
                >
                  <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 text-center">
                    Choose how to reach out
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={`https://wa.me/2348066300182?text=${encodeURIComponent(messageText)}`}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setShowOptions(false)}
                      className="flex flex-col items-center justify-center p-3 border border-emerald-900/40 bg-emerald-950/10 hover:bg-emerald-950/30 hover:border-emerald-500 rounded-lg text-zinc-200 transition-all text-center gap-1 group/wa"
                    >
                      <span className="text-[10px] font-mono font-bold text-emerald-400 group-hover/wa:scale-105 transition-transform">WhatsApp</span>
                      <span className="text-[9px] text-zinc-500 font-mono">Pre-fills text</span>
                    </a>
                    <a
                      href="https://discord.com/users/melvinxdev"
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => {
                        navigator.clipboard.writeText(messageText);
                        setShowOptions(false);
                      }}
                      className="flex flex-col items-center justify-center p-3 border border-indigo-900/40 bg-indigo-950/10 hover:bg-indigo-950/30 hover:border-indigo-500 rounded-lg text-zinc-200 transition-all text-center gap-1 group/dc"
                      title="Copies message to clipboard and opens Discord"
                    >
                      <span className="text-[10px] font-mono font-bold text-indigo-400 group-hover/dc:scale-105 transition-transform">Discord</span>
                      <span className="text-[9px] text-zinc-500 font-mono">Copies message</span>
                    </a>
                  </div>
                  <button
                    onClick={() => setShowOptions(false)}
                    className="text-[9px] font-mono uppercase tracking-widest text-zinc-600 hover:text-zinc-400 transition-colors text-center pt-1 border-t border-zinc-900/50"
                  >
                    ← Back to edit
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
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
          <a href="https://github.com/MelvinXDev" target="_blank" rel="noreferrer" className="text-[10px] font-mono text-zinc-400 hover:text-zinc-50 uppercase transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/melvin-chinedu-70927328a/" target="_blank" rel="noreferrer" className="text-[10px] font-mono text-zinc-400 hover:text-zinc-50 uppercase transition-colors">LinkedIn</a>
          <a href="mailto:melvinlefthanded@gmail.com" className="text-[10px] font-mono text-zinc-400 hover:text-zinc-50 uppercase transition-colors underline underline-offset-4">Email</a>
        </div>
      </motion.footer>
    </div>
  );
}
