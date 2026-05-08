import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Users, History, Palette, Heart, ChevronRight, Menu, X, 
  ArrowRight, Landmark, Music, Utensils, Send, CheckCircle2, Search,
  Play, ExternalLink
} from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [showVideo, setShowVideo] = useState(false);

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
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100/80 text-saffron rounded-full text-xs font-black uppercase tracking-widest mb-8 border border-saffron/20">
              <Landmark size={14} /> Eternal Heritage
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-navy leading-[0.95] mb-8 tracking-tighter">
              Experience the <br />
              <span className="text-saffron">Soul of India</span>
            </h1>
            <p className="text-xl text-slate-500 mb-12 max-w-lg leading-relaxed font-medium">
              Step into a world where 5,000 years of history meets the future. From the peaks of Himalayas to the shores of Kanyakumari.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <a 
                href="#landmarks"
                className="bg-navy text-white px-10 py-5 rounded-[2rem] font-bold text-lg hover:shadow-2xl hover:shadow-navy/30 transition-all flex items-center justify-center gap-3 group active:scale-95"
              >
                Start Exploring <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <button 
                onClick={() => setShowVideo(true)}
                className="bg-white text-navy border-2 border-slate-100 px-10 py-5 rounded-[2rem] font-bold text-lg hover:border-navy hover:bg-slate-50 transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                <Play size={22} className="fill-navy" /> Watch Story
              </button>
            </div>
            
            <div className="mt-16 flex items-center gap-6">
              <div className="flex -space-x-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                  </div>
                ))}
              </div>
              <p className="text-sm font-bold text-slate-400">
                <span className="text-navy">10k+</span> People exploring daily
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative z-10 aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl bg-gradient-to-br from-saffron/10 via-white to-green/10 border-[12px] border-white">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center grayscale-[0.2] hover:grayscale-0 transition-all duration-700 hover:scale-105"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent"></div>
              <div className="absolute bottom-12 left-12 right-12 text-white">
                <p className="text-sm font-bold uppercase tracking-widest mb-2 text-saffron">Must Visit</p>
                <h3 className="text-4xl font-black mb-2">Taj Mahal, Agra</h3>
                <p className="text-white/80 font-medium">Symbol of Eternal Love</p>
              </div>
            </div>
            
            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-10 -right-10 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 hidden lg:block z-20"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center">
                  <Heart className="text-red-500" fill="currentColor" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Diversity</p>
                  <p className="text-lg font-black text-navy leading-none">Unity</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Search/Filter Landmarks */}
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
