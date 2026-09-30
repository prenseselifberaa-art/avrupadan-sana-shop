import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import StoryHighlights from './components/StoryHighlights';
import StoryModal from './components/StoryModal';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CustomOrderWizard from './components/CustomOrderWizard';
import CartDrawer from './components/CartDrawer';
import MobileBottomBar from './components/MobileBottomBar';
import TrustSection from './components/TrustSection';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { CATEGORIES, PRODUCTS } from './data/products';
import { fetchLiveRates } from './utils/currency';
import { Search, Sparkles, Plane, Check, ArrowRight, ShoppingBag, TrendingUp } from 'lucide-react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currency, setCurrency] = useState('TRY');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedStory, setSelectedStory] = useState(null);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Live Exchange Rates
  const [rates, setRates] = useState({
    EUR: 55.60,
    USD: 49.00,
    EUR_USD: 1.13,
    lastUpdated: 'Canlı'
  });

  useEffect(() => {
    fetchLiveRates().then(data => {
      if (data) setRates(data);
    });
  }, []);

  // Cart State with localStorage persistence
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('avrupa_shop_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('avrupa_shop_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  // Toast Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Cart Actions
  const handleAddToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
    showToast(`"${product.title.slice(0, 28)}..." sepete eklendi!`);
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: newQty } : item));
  };

  const handleRemoveItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Story Action Handler
  const handleStoryAction = (action) => {
    if (action === 'open_wizard') {
      setIsWizardOpen(true);
    } else if (action === 'filter_vintage') {
      setSelectedCategory('luks-vintage');
      scrollToCatalog();
    } else if (action === 'filter_koleksiyon') {
      setSelectedCategory('koleksiyon');
      scrollToCatalog();
    } else if (action === 'show_rates') {
      setIsWizardOpen(true);
    } else if (action === 'open_dolap') {
      window.open('https://dolap.com/profil/avrupadansana1', '_blank');
    }
  };

  // Filter products
  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const scrollToCatalog = () => {
    document.getElementById('katalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#070e1b] text-slate-100 flex flex-col font-sans pb-16 md:pb-0">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 glass-card px-4 py-3 rounded-xl border border-euro-500/50 shadow-2xl flex items-center gap-2.5 text-xs font-bold text-white animate-in slide-in-from-bottom duration-300">
          <div className="w-5 h-5 rounded-full bg-euro-600 flex items-center justify-center shrink-0">
            <Check className="w-3 h-3 text-white" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation */}
      <Navbar 
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        currency={currency}
        setCurrency={setCurrency}
        onOpenWizard={() => setIsWizardOpen(true)}
        rates={rates}
      />

      {/* Instagram-Style Story Highlights Bar */}
      <StoryHighlights 
        onSelectStory={setSelectedStory} 
      />

      {/* Main Content */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <Hero 
          onOpenWizard={() => setIsWizardOpen(true)}
          scrollToCatalog={scrollToCatalog}
          currency={currency}
          rates={rates}
        />

        {/* Product Catalog Section */}
        <section id="katalog" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          
          {/* Section Header & Filters */}
          <div className="space-y-5">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-euro-400 bg-euro-900/60 px-3 py-1 rounded-full border border-euro-800">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Stoktaki Hazır & Özel İthal Ürünler</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-2">
                  Seçkin Avrupa Koleksiyonu
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Orijinal Avrupa faturalı ürünler. Dolap & Gardrops güvencesiyle veya doğrudan WhatsApp üzerinden sipariş verebilirsiniz.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input 
                  type="text"
                  placeholder="Ürün veya marka ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-euro-900/70 border border-euro-700/60 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-euro-400 transition"
                />
              </div>
            </div>

            {/* Category Filter Pills (Horizontal Touch Scroll on Mobile) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none snap-x">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 shrink-0 snap-start active:scale-95 ${
                    selectedCategory === cat.id 
                      ? 'bg-euro-600 text-white shadow-lg shadow-euro-900/50 border border-euro-500' 
                      : 'bg-euro-900/60 text-slate-300 hover:text-white border border-euro-800 hover:border-euro-700'
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="glass-card rounded-2xl p-10 text-center space-y-4 border border-euro-800/80">
              <p className="text-slate-400 text-sm">Aradığınız kriterlere uygun ürün bulunamadı.</p>
              <button 
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                className="text-xs font-bold text-euro-400 hover:underline"
              >
                Filtreleri Temizle
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  currency={currency}
                  rates={rates}
                  onSelectProduct={setSelectedProduct}
                  onAddToCart={handleAddToCart}
                  onOpenWizard={() => setIsWizardOpen(true)}
                />
              ))}
            </div>
          )}

        </section>

        {/* Custom Order Callout Section */}
        <section className="py-10 sm:py-14 bg-gradient-to-r from-euro-950 via-euro-900 to-euro-950 border-y border-euro-800/40 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-panel p-6 sm:p-12 rounded-3xl border border-euro-600/30 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 relative">
              <div className="space-y-2.5 text-center lg:text-left">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/20">
                  Aradığınız Ürün Listede Yok mu?
                </span>
                <h3 className="text-xl sm:text-3xl font-extrabold text-white font-display">
                  Almanya DM, Rossmann veya Amazon.de'den <br className="hidden sm:inline"/>
                  İstediğiniz Ürünü Getirelim!
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                  Balea, Mivolis vitaminler, Avrupa cilt bakım ürünleri, özel Funko Pop veya nadir parçalar... Linkini iletin, canlı kurla getirelim.
                </p>
              </div>

              <button 
                onClick={() => setIsWizardOpen(true)}
                className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-euro-950 font-extrabold text-xs sm:text-sm shadow-xl active:scale-95 transition"
              >
                <Plane className="w-5 h-5 text-euro-950" />
                <span>Hemen Özel İstek Gönder</span>
                <ArrowRight className="w-4 h-4 text-euro-950" />
              </button>
            </div>
          </div>
        </section>

        {/* Trust & Verification Section */}
        <TrustSection />

        {/* FAQ Section */}
        <FAQ />

      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Fixed App Bottom Bar */}
      <MobileBottomBar 
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWizard={() => setIsWizardOpen(true)}
        scrollToCatalog={scrollToCatalog}
        scrollToTop={scrollToTop}
      />

      {/* Story Viewer Modal */}
      <StoryModal 
        story={selectedStory}
        onClose={() => setSelectedStory(null)}
        onAction={handleStoryAction}
      />

      {/* Product Detail Modal (Native Mobile Bottom Sheet) */}
      <ProductModal 
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        currency={currency}
        rates={rates}
        onAddToCart={handleAddToCart}
        onOpenWizard={() => setIsWizardOpen(true)}
      />

      {/* Custom Order Wizard Modal */}
      <CustomOrderWizard 
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        rates={rates}
      />

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        currency={currency}
        rates={rates}
      />

    </div>
  );
}
