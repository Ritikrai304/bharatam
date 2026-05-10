import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  MapPin, Users, History, Palette, Heart, ChevronRight, Menu, X, 
  ArrowRight, Landmark, Music, Utensils, Send, CheckCircle2, Search,
  Play, ExternalLink, Sparkles, Bot, MessageSquare, Loader2,
  Calendar, Globe, Shield, Star, Award, Compass, Languages
} from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [showVideo, setShowVideo] = useState(false);
  const [activeEra, setActiveEra] = useState(0);
  const [selectedState, setSelectedState] = useState<number | null>(null);

  const states = useMemo(() => [
    { name: "Rajasthan", capital: "Jaipur", highlight: "Royal Palaces & Desert", color: "from-orange-400 to-red-500", icon: "🏰" },
    { name: "Kerala", capital: "Thiruvananthapuram", highlight: "Backwaters & Ayurveda", color: "from-green-400 to-emerald-600", icon: "🌴" },
    { name: "Punjab", capital: "Chandigarh", highlight: "Golden Temple & Agriculture", color: "from-yellow-400 to-orange-500", icon: "🌾" },
    { name: "Maharashtra", capital: "Mumbai", highlight: "Financial Hub & Caves", color: "from-blue-400 to-indigo-600", icon: "🏢" },
    { name: "Tamil Nadu", capital: "Chennai", highlight: "Ancient Temples & Arts", color: "from-red-400 to-pink-600", icon: "🛕" },
    { name: "West Bengal", capital: "Kolkata", highlight: "Literature & Sundarbans", color: "from-teal-400 to-cyan-600", icon: "🐅" }
  ], []);

  const artForms = useMemo(() => [
    { title: "Kathakali", type: "Dance", origin: "Kerala", image: "https://images.unsplash.com/photo-1610991148731-3067f76323bc?auto=format&fit=crop&q=80&w=400" },
    { title: "Sitar", type: "Music", origin: "Varanasi", image: "https://images.unsplash.com/photo-1599933310631-7528a67d9834?auto=format&fit=crop&q=80&w=400" },
    { title: "Madhubani", type: "Painting", origin: "Bihar", image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=400" },
    { title: "Bharatnatyam", type: "Dance", origin: "Tamil Nadu", image: "https://images.unsplash.com/photo-1621430485603-49033f7c35f2?auto=format&fit=crop&q=80&w=400" }
  ], []);
  
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // AI Chat State
  const [showAIChat, setShowAIChat] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'Namaste! Main Bharatam AI assistant hoon. Aap mujhse Bharat ke itihas, sanskriti ya kisi bhi iconic jagah ke baare mein pooch sakte hain.' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const eras = useMemo(() => [
    { year: "3300 BCE", title: "Indus Valley", desc: "One of the world's earliest urban civilizations with advanced city planning.", icon: <Globe size={20} /> },
    { year: "1500 BCE", title: "Vedic Period", desc: "The foundation of Indian philosophy, Vedas, and spiritual traditions.", icon: <Languages size={20} /> },
    { year: "320 BCE", title: "Mauryan Empire", desc: "First major empire covering most of the subcontinent under Ashoka the Great.", icon: <Shield size={20} /> },
    { year: "320 CE", title: "Golden Age", desc: "Gupta Empire: Unprecedented progress in science, math, and arts.", icon: <Star size={20} /> },
    { year: "1947 CE", title: "Independence", desc: "The birth of the world's largest democracy through non-violence.", icon: <Award size={20} /> }
  ], []);

  const handleAIChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isTyping) return;

    const userMsg = chatInput;
    setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `You are a helpful AI assistant for the "Bharatam" project. Your goal is to provide information about India's history, culture, landmarks, and unity in a friendly and respectful manner. Keep your answers concise and engaging. User says: ${userMsg}` }] }]
        })
      });

      const data = await response.json();
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf kijiye, main abhi samajh nahi pa raha hoon. Kripya phir se poochein.";
      
      setChatMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    } catch (error) {
      setChatMessages(prev => [...prev, { role: 'ai', text: "Network error! Kripya check karein ki .env file mein API Key sahi hai." }]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    { 
      title: "Ancient History", 
      icon: <History className="text-saffron" />, 
      desc: "From the Indus Valley Civilization to the Golden Age of the Guptas, explore the roots of human wisdom.",
      color: "bg-orange-50",
      id: "history"
    },
    { 
      title: "Art & Culture", 
      icon: <Palette className="text-navy" />, 
      desc: "Experience the richness of classical dances, intricate architecture, and a tapestry of 22 official languages.",
      color: "bg-blue-50",
      id: "culture"
    },
    { 
      title: "Spirit of Unity", 
      icon: <Users className="text-green" />, 
      desc: "Witness how billions of people from different faiths and backgrounds live together in perfect harmony.",
      color: "bg-green-50",
      id: "unity"
    }
  ];

  const landmarks = [
    { 
      name: "Taj Mahal", 
      city: "Agra", 
      type: "Landmark", 
      icon: <Landmark size={18} />,
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=600",
      description: "A breathtaking white marble mausoleum, a symbol of eternal love and a UNESCO World Heritage site."
    },
    { 
      name: "Varanasi Ghats", 
      city: "Uttar Pradesh", 
      type: "Spirituality", 
      icon: <MapPin size={18} />,
      image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=600",
      description: "One of the oldest living cities in the world, famous for its spiritual energy and Ganga Aarti."
    },
    { 
      name: "Hampi Ruins", 
      city: "Karnataka", 
      type: "Landmark", 
      icon: <Landmark size={18} />,
      image: "https://images.unsplash.com/photo-1600100397608-f09074aa80e6?auto=format&fit=crop&q=80&w=600",
      description: "The magnificent remains of the Vijayanagara Empire, showcasing incredible stone architecture."
    },
    { 
      name: "Kerala Backwaters", 
      city: "Alleppey", 
      type: "Nature", 
      icon: <MapPin size={18} />,
      image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=600",
      description: "A serene network of lagoons and canals, offering a peaceful escape on traditional houseboats."
    },
    { 
      name: "Jaipur Palaces", 
      city: "Rajasthan", 
      type: "Landmark", 
      icon: <Landmark size={18} />,
      image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=600",
      description: "The 'Pink City' is home to majestic forts and the iconic Hawa Mahal, reflecting royal history."
    },
    { 
      name: "Golden Temple", 
      city: "Amritsar", 
      type: "Spirituality", 
      icon: <MapPin size={18} />,
      image: "https://images.unsplash.com/photo-1588096344356-9b9db8934c99?auto=format&fit=crop&q=80&w=600",
      description: "The holiest shrine of Sikhism, known for its stunning golden architecture and peaceful lake."
    }
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-white selection:bg-saffron/30">
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-navy/10">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <span className={`text-2xl font-black tracking-tight ${scrolled ? 'text-navy' : 'text-navy'}`}>Bharatam</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10 text-sm font-bold text-slate-600">
            <a href="#history" className="hover:text-saffron transition-colors">History</a>
            <a href="#culture" className="hover:text-saffron transition-colors">Culture</a>
            <a href="#unity" className="hover:text-saffron transition-colors">Unity</a>
            <a 
              href="#landmarks"
              className="bg-navy text-white px-7 py-2.5 rounded-full hover:bg-slate-800 transition-all hover:shadow-xl hover:shadow-navy/20 active:scale-95"
            >
              Explore Now
            </a>
          </div>

          <button className="md:hidden p-2 text-navy" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-2xl font-bold text-navy">
              <a href="#history" onClick={() => setIsMenuOpen(false)}>History</a>
              <a href="#culture" onClick={() => setIsMenuOpen(false)}>Culture</a>
              <a href="#unity" onClick={() => setIsMenuOpen(false)}>Unity</a>
              <a 
                href="#landmarks" 
                onClick={() => setIsMenuOpen(false)}
                className="bg-navy text-white py-4 rounded-2xl mt-4 text-center text-lg"
              >
                Explore Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-20 px-6 overflow-hidden bg-navy">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524492459413-0296b7482673?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center mix-blend-overlay opacity-40"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-navy/20 via-navy/50 to-white"></div>
        </motion.div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-saffron/20 text-saffron rounded-full text-xs font-black uppercase tracking-widest mb-8 border border-saffron/30 backdrop-blur-md">
              <Sparkles size={14} className="animate-pulse" /> Super Premium Experience
            </div>
            <h1 className="text-7xl md:text-9xl font-black text-white leading-[0.9] mb-8 tracking-tighter">
              Discover <br />
              <span className="text-saffron">Bharatam</span>
            </h1>
            <p className="text-xl text-white/70 mb-12 max-w-lg leading-relaxed font-medium">
              Explore the timeless heritage, vibrant culture, and the soaring spirit of a civilization that continues to inspire the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <a 
                href="#landmarks"
                className="bg-saffron text-white px-10 py-5 rounded-[2rem] font-black text-lg hover:shadow-[0_20px_50px_-10px_rgba(255,153,51,0.5)] transition-all flex items-center justify-center gap-3 group active:scale-95"
              >
                Start Exploring <Compass size={22} className="group-hover:rotate-180 transition-transform duration-500" />
              </a>
              <button 
                onClick={() => setShowVideo(true)}
                className="bg-white/10 backdrop-blur-md text-white border-2 border-white/20 px-10 py-5 rounded-[2rem] font-bold text-lg hover:bg-white/20 transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                <Play size={22} className="fill-white" /> Watch Story
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="hidden lg:block relative"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-saffron to-green rounded-[4rem] opacity-20 blur-2xl group-hover:opacity-40 transition-opacity"></div>
              <div className="relative aspect-square rounded-[4rem] overflow-hidden border-[12px] border-white/10 shadow-2xl backdrop-blur-3xl bg-white/5 p-12 flex flex-col items-center justify-center text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-48 h-48 border-4 border-dashed border-saffron/30 rounded-full flex items-center justify-center mb-8"
                >
                  <div className="w-32 h-32 bg-saffron/10 rounded-full flex items-center justify-center">
                    <MapPin size={60} className="text-saffron" />
                  </div>
                </motion.div>
                <h3 className="text-3xl font-black text-white mb-2 tracking-tight">Bharat Mata</h3>
                <p className="text-white/50 font-bold uppercase tracking-widest text-sm">Unity in Diversity</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-32 px-6 bg-white overflow-hidden" id="history">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black text-navy mb-6 tracking-tighter">Timeline of Wisdom</h2>
            <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">Five millennia of progress, spirituality, and triumph.</p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 hidden lg:block"></div>
            
            <div className="grid lg:grid-cols-5 gap-8 relative z-10">
              {eras.map((era, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -10 }}
                  onClick={() => setActiveEra(idx)}
                  className={`cursor-pointer p-8 rounded-[2.5rem] transition-all duration-500 ${activeEra === idx ? 'bg-navy text-white shadow-2xl' : 'bg-slate-50 text-navy hover:bg-slate-100'}`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${activeEra === idx ? 'bg-saffron text-white' : 'bg-white text-navy'}`}>
                    {era.icon}
                  </div>
                  <p className={`text-sm font-black mb-2 ${activeEra === idx ? 'text-saffron' : 'text-slate-400'}`}>{era.year}</p>
                  <h3 className="text-2xl font-black mb-4 tracking-tight">{era.title}</h3>
                  <p className={`text-sm font-medium leading-relaxed ${activeEra === idx ? 'text-white/70' : 'text-slate-500'}`}>
                    {era.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* States Explorer Section */}
      <section className="py-32 px-6 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div>
              <h2 className="text-5xl md:text-7xl font-black text-navy mb-6 tracking-tighter">States of Bharatam</h2>
              <p className="text-xl text-slate-500 font-medium max-w-xl">A mosaic of cultures, traditions, and colors across the subcontinent.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {states.map((state, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedState(idx)}
                className={`relative group cursor-pointer h-64 rounded-[3rem] overflow-hidden shadow-xl transition-all duration-500 ${selectedState === idx ? 'ring-4 ring-saffron ring-offset-4' : ''}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${state.color} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
                <div className="relative h-full p-10 flex flex-col justify-between text-white">
                  <div className="text-5xl">{state.icon}</div>
                  <div>
                    <h3 className="text-3xl font-black mb-1 tracking-tight">{state.name}</h3>
                    <p className="text-white/80 font-bold text-sm uppercase tracking-widest">{state.capital}</p>
                    <motion.p 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: selectedState === idx ? 1 : 0, height: selectedState === idx ? 'auto' : 0 }}
                      className="mt-4 text-sm font-medium border-t border-white/20 pt-4"
                    >
                      {state.highlight}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Art Forms Gallery */}
      <section className="py-32 px-6 bg-white overflow-hidden" id="culture">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black text-navy mb-6 tracking-tighter">Living Arts</h2>
            <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">Where every move tells a story and every note echoes through time.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {artForms.map((art, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden group shadow-lg"
              >
                <img src={art.image} alt={art.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <span className="inline-block px-3 py-1 bg-saffron/80 rounded-full text-[10px] font-black uppercase tracking-widest mb-3">
                    {art.type}
                  </span>
                  <h3 className="text-2xl font-black mb-1">{art.title}</h3>
                  <p className="text-white/60 text-sm font-bold flex items-center gap-1">
                    <MapPin size={12} className="text-saffron" /> {art.origin}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 px-6 bg-slate-50/50" id="landmarks">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-navy mb-4 tracking-tight">Vibrant Landmarks</h2>
              <p className="text-lg text-slate-500 font-medium">Discover the most iconic places and experiences.</p>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              {['all', 'Landmark', 'Spirituality', 'Nature'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all whitespace-nowrap ${activeTab === tab ? 'bg-navy text-white shadow-lg' : 'bg-white text-slate-500 border border-slate-100 hover:bg-slate-50'}`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {landmarks.filter(l => activeTab === 'all' || l.type === activeTab).map((item, idx) => (
              <motion.div 
                layout
                key={idx}
                className="bg-white rounded-[2.5rem] border border-slate-100 hover:shadow-2xl transition-all cursor-pointer group overflow-hidden"
                onClick={() => window.open(`https://www.google.com/search?q=${item.name}+${item.city}+India`, '_blank')}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-navy shadow-lg">
                    {item.type}
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-navy group-hover:bg-navy group-hover:text-white transition-colors">
                      {item.icon}
                    </div>
                    <ExternalLink size={16} className="text-slate-200 group-hover:text-saffron transition-colors" />
                  </div>
                  <h3 className="text-2xl font-black text-navy mb-2 group-hover:text-saffron transition-colors tracking-tight">{item.name}</h3>
                  <p className="text-sm text-slate-400 font-bold flex items-center gap-1 mb-4">
                    <MapPin size={14} className="text-saffron" /> {item.city}
                  </p>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Sections */}
      <section className="py-24 px-6" id="history">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10">
            {sections.map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -12 }}
                className={`${item.color} p-12 rounded-[3rem] border-2 border-white shadow-sm transition-all relative group overflow-hidden`}
              >
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/40 rounded-full blur-3xl group-hover:bg-white/60 transition-colors"></div>
                <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-xl shadow-slate-200/50 mb-10 relative z-10">
                  {item.icon}
                </div>
                <h3 className="text-3xl font-black text-navy mb-6 tracking-tight">{item.title}</h3>
                <p className="text-lg text-slate-600 leading-relaxed font-medium mb-8">
                  {item.desc}
                </p>
                <a href="#history" className="flex items-center justify-between group/btn">
                  <span className="flex items-center gap-2 font-black text-navy group-hover/btn:text-saffron transition-colors">
                    Learn More <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-navy/90 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setShowVideo(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/10"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowVideo(false)}
                className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all active:scale-90"
              >
                <X size={24} />
              </button>
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/S70L4Vf6Htc?autoplay=1" 
                title="Incredible India" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Newsletter Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-navy rounded-[4rem] p-12 md:p-20 relative overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,128,0.3)]">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="relative z-10 max-w-2xl mx-auto text-center">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">Stay updated with <br /> the <span className="text-saffron">Bharatam Journey</span></h2>
              <p className="text-xl text-white/60 mb-12 font-medium">Join 50,000+ travelers and history enthusiasts.</p>
              
              {!isSubscribed ? (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email" 
                    className="flex-1 bg-white/10 border-2 border-white/20 rounded-[2rem] px-8 py-5 text-white placeholder:text-white/30 focus:outline-none focus:border-saffron transition-all text-lg font-bold"
                  />
                  <button type="submit" className="bg-saffron text-white px-10 py-5 rounded-[2rem] font-black text-lg hover:bg-orange-500 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-xl shadow-saffron/20">
                    Subscribe <Send size={20} />
                  </button>
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green/20 border-2 border-green/30 rounded-[2rem] p-8 flex items-center justify-center gap-4 text-white"
                >
                  <div className="w-12 h-12 bg-green rounded-full flex items-center justify-center shadow-lg shadow-green/30">
                    <CheckCircle2 size={24} />
                  </div>
                  <div className="text-left">
                    <p className="text-xl font-black">Thank you for subscribing!</p>
                    <p className="text-white/60 font-medium">Welcome to the community.</p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-24 pb-12 px-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">B</span>
                </div>
                <span className="text-2xl font-black tracking-tight text-navy">Bharatam</span>
              </div>
              <p className="text-lg text-slate-400 font-medium max-w-xs leading-relaxed">
                Dedicated to showcasing the incredible heritage and spirit of the Indian subcontinent.
              </p>
            </div>
            <div>
              <h4 className="text-navy font-black mb-6 uppercase tracking-widest text-xs">Explore</h4>
              <ul className="space-y-4 text-slate-500 font-bold">
                <li><a href="#" className="hover:text-saffron transition-colors">Ancient Cities</a></li>
                <li><a href="#" className="hover:text-saffron transition-colors">Royal Palaces</a></li>
                <li><a href="#" className="hover:text-saffron transition-colors">Festivals</a></li>
                <li><a href="#" className="hover:text-saffron transition-colors">Art Forms</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-navy font-black mb-6 uppercase tracking-widest text-xs">Connect</h4>
              <ul className="space-y-4 text-slate-500 font-bold">
                <li><a href="#" className="hover:text-saffron transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-saffron transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-saffron transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-saffron transition-colors">YouTube</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-slate-50 gap-6">
            <p className="text-slate-300 font-bold text-sm">
              © 2026 Bharatam Project. Built with love for the nation.
            </p>
            <div className="flex items-center gap-8 text-slate-300 font-bold text-sm">
              <a href="#" className="hover:text-navy transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-navy transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowAIChat(true)}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-navy text-white rounded-full shadow-2xl flex items-center justify-center group overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-saffron via-transparent to-green opacity-0 group-hover:opacity-20 transition-opacity"></div>
        <Sparkles size={28} className="group-hover:animate-pulse" />
      </motion.button>

      {/* AI Chat Window */}
      <AnimatePresence>
        {showAIChat && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-28 right-8 z-50 w-[90vw] md:w-[400px] h-[500px] bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,128,0.3)] border border-slate-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-navy p-6 flex items-center justify-between">
              <div className="flex items-center gap-3 text-white">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <Bot size={22} className="text-saffron" />
                </div>
                <div>
                  <h4 className="font-black leading-none">Bharatam AI</h4>
                  <p className="text-[10px] text-white/50 uppercase font-bold tracking-widest mt-1">Always Online</p>
                </div>
              </div>
              <button onClick={() => setShowAIChat(false)} className="text-white/40 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-3xl font-medium text-sm ${
                    msg.role === 'user' 
                    ? 'bg-navy text-white rounded-tr-none' 
                    : 'bg-slate-100 text-slate-700 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 p-4 rounded-3xl rounded-tl-none flex gap-1">
                    <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1 h-1 bg-slate-400 rounded-full" />
                    <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1 h-1 bg-slate-400 rounded-full" />
                    <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1 h-1 bg-slate-400 rounded-full" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleAIChat} className="p-6 border-t border-slate-50">
              <div className="relative">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask something..."
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 pr-14 text-sm font-bold focus:outline-none focus:border-navy transition-all"
                />
                <button 
                  type="submit"
                  disabled={isTyping}
                  className="absolute right-2 top-2 bottom-2 w-10 bg-navy text-white rounded-xl flex items-center justify-center hover:bg-slate-800 transition-all disabled:opacity-50"
                >
                  {isTyping ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}
