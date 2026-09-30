import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CustomOrderWizard from './components/CustomOrderWizard';
import CartDrawer from './components/CartDrawer';
import TrustSection from './components/TrustSection';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { CATEGORIES, PRODUCTS } from './data/products';
import { Search, Filter, Sparkles, Plane, Check, ArrowRight, ShoppingBag } from 'lucide-react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currency, setCurrency] = useState('TRY');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

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
    showToast(`"${product.title.slice(0, 30)}..." sepete eklendi!`);
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

  return (
    <div className="min-h-screen bg-[#070e1b] text-slate-100 flex flex-col font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 glass-card px-4 py-3 rounded-xl border border-euro-500/50 shadow-2xl flex items-center gap-2.5 text-xs font-bold text-white animate-in slide-in-from-bottom duration-300">
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
      />

      {/* Main Content */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <Hero 
          onOpenWizard={() => setIsWizardOpen(true)}
          scrollToCatalog={scrollToCatalog}
        />

        {/* Product Catalog Section */}
        <section id="katalog" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Section Header & Filters */}
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-euro-400 bg-euro-900/60 px-3 py-1 rounded-full border border-euro-800">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Stoktaki Hazır & Özel İthal Ürünler</span>
                </div>
                <h2 className="text-3xl font-extrabold text-white font-display mt-2">
                  Seçkin Avrupa Koleksiyonu
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Tüm ürünler orijinal Avrupa faturalıdır. Dolap & Gardrops ilanlarından veya WhatsApp üzerinden anında sipariş verebilirsiniz.
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
                  className="w-full bg-euro-900/70 border border-euro-700/60 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-euro-400 transition"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 ${
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
            <div className="glass-card rounded-2xl p-12 text-center space-y-4 border border-euro-800/80">
              <p className="text-slate-400 text-sm">Aradığınız kriterlere uygun ürün bulunamadı.</p>
              <button 
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                className="text-xs font-bold text-euro-400 hover:underline"
              >
                Filtreleri Temizle
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  currency={currency}
                  onSelectProduct={setSelectedProduct}
                  onAddToCart={handleAddToCart}
                  onOpenWizard={() => setIsWizardOpen(true)}
                />
              ))}
            </div>
          )}

        </section>

        {/* Custom Order Callout Section */}
        <section className="py-12 bg-gradient-to-r from-euro-950 via-euro-900 to-euro-950 border-y border-euro-800/40 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-euro-600/30 flex flex-col lg:flex-row items-center justify-between gap-8 relative">
              <div className="space-y-3 text-center lg:text-left">
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/20">
                  Aradığınız Ürün Listede Yok mu?
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                  Almanya DM, Rossmann veya Amazon.de'den <br className="hidden sm:inline"/>
                  İstediğiniz Ürünü Getirelim!
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                  Balea, Mivolis vitaminler, Avrupa cilt bakım ürünleri, özel Funko Pop veya nadir sneaker'lar... Linkini ya da fotoğrafını iletin, güvenle kapınıza ulaştıralım.
                </p>
              </div>

              <button 
                onClick={() => setIsWizardOpen(true)}
                className="shrink-0 flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-euro-950 font-extrabold text-sm shadow-xl transition transform active:scale-95"
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

      {/* Modals & Drawers */}
      <ProductModal 
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        currency={currency}
        onAddToCart={handleAddToCart}
        onOpenWizard={() => setIsWizardOpen(true)}
      />

      <CustomOrderWizard 
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
      />

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        currency={currency}
      />

    </div>
  );
}
