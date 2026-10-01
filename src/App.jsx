import React, { useState, useEffect, useRef } from 'react';
import AnnouncementBar from './components/AnnouncementBar';
import HeaderBar from './components/HeaderBar';
import NavigationDrawer from './components/NavigationDrawer';
import FilterSortBar from './components/FilterSortBar';
import SearchBar from './components/SearchBar';
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
import { Sparkles, Plane, Check, ArrowRight, ShieldCheck, Heart, ArrowUp } from 'lucide-react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currency, setCurrency] = useState('TRY');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedStory, setSelectedStory] = useState(null);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [mobileCols, setMobileCols] = useState(2);
  const [toastMessage, setToastMessage] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const searchInputRef = useRef(null);

  // Live Exchange Rates - Fetches immediately & polls every 60 seconds
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

    const interval = setInterval(() => {
      fetchLiveRates().then(data => {
        if (data) setRates(data);
      });
    }, 60000); // 60s live poll

    return () => clearInterval(interval);
  }, []);

  // Scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Favorites (Wishlist) State with localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('avrupa_shop_favs');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      const isFav = prev.includes(productId);
      const next = isFav ? prev.filter(id => id !== productId) : [...prev, productId];
      try {
        localStorage.setItem('avrupa_shop_favs', JSON.stringify(next));
      } catch (e) {}
      showToast(isFav ? 'Ürün favorilerden çıkarıldı' : '❤️ Ürün favorilere eklendi!');
      return next;
    });
  };

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
    showToast(`"${product.title.slice(0, 24)}..." sepete eklendi!`);
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

  const scrollToCatalog = () => {
    document.getElementById('katalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFocusSearch = () => {
    scrollToCatalog();
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 300);
  };

  // Filter & Sort Products
  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCat = 
      selectedCategory === 'all' ? true :
      selectedCategory === 'favorites' ? favorites.includes(p.id) :
      p.category === selectedCategory;

    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.priceTRY - b.priceTRY;
    if (sortBy === 'price-desc') return b.priceTRY - a.priceTRY;
    if (sortBy === 'rare') return (b.isRare ? 1 : 0) - (a.isRare ? 1 : 0);
    return 0; // featured
  });

  const cartTotalCount = cart.reduce((a, b) => a + b.quantity, 0);

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-100 flex flex-col font-sans pb-20 md:pb-0 w-full max-w-full overflow-x-hidden">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-22 md:bottom-6 right-4 sm:right-6 z-50 glass-card px-4 py-3 rounded-xl border border-euro-500/50 shadow-2xl flex items-center gap-2.5 text-xs font-bold text-white animate-in slide-in-from-bottom duration-300">
          <div className="w-5 h-5 rounded-full bg-euro-600 flex items-center justify-center shrink-0">
            <Check className="w-3 h-3 text-white" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-22 md:bottom-8 right-4 sm:right-6 z-40 p-3 rounded-full bg-euro-900/95 text-euro-400 hover:text-white border border-euro-600/70 backdrop-blur-xl shadow-2xl active:scale-95 transition"
          title="Sayfa Başına Çık"
          aria-label="Sayfa Başına Çık"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* 1. Announcement Bar (Promo / Live Currency Ticker) */}
      <AnnouncementBar rates={rates} />

      {/* 2. Header Bar (Top App Bar / Sticky Navbar) */}
      <HeaderBar 
        onOpenDrawer={() => setIsDrawerOpen(true)}
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        currency={currency}
        setCurrency={setCurrency}
        onOpenWizard={() => setIsWizardOpen(true)}
        onFocusSearch={handleFocusSearch}
      />

      {/* 3. Navigation Drawer (Slide-out Sidebar / Off-Canvas Menu) */}
      <NavigationDrawer 
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        currency={currency}
        setCurrency={setCurrency}
        onOpenWizard={() => setIsWizardOpen(true)}
        onSelectCategory={(catId) => {
          setSelectedCategory(catId);
          scrollToCatalog();
        }}
        rates={rates}
      />

      {/* Instagram-Style Story Highlights */}
      <StoryHighlights 
        onSelectStory={setSelectedStory} 
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        
        {/* Hero Section */}
        <Hero 
          onOpenWizard={() => setIsWizardOpen(true)}
          scrollToCatalog={scrollToCatalog}
          currency={currency}
          rates={rates}
        />

        {/* Product Catalog Section */}
        <section id="katalog" className="py-6 sm:py-12 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-4 sm:space-y-6 w-full max-w-full overflow-hidden">
          
          {/* Section Header */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-euro-400 bg-euro-900/60 px-3 py-1 rounded-full border border-euro-800">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Stoktaki Hazır & Özel İthal Ürünler</span>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-3xl font-extrabold text-white font-display">
                  Seçkin Avrupa Koleksiyonu
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                  Orijinal Avrupa faturalı koleksiyon figürleri, nadir vintage çantalar ve Almanya DM ürünleri.
                </p>
              </div>

              {/* 4. Search Bar (Search Inputs with Chips) */}
              <div className="w-full md:w-80">
                <SearchBar 
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  inputRef={searchInputRef}
                />
              </div>
            </div>
          </div>

          {/* 5. Filter & Sort Bar (Category Utility Bar - Sticky) */}
          <FilterSortBar 
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
            itemCount={sortedProducts.length}
            mobileCols={mobileCols}
            setMobileCols={setMobileCols}
            favoritesCount={favorites.length}
          />

          {/* Product Grid */}
          {sortedProducts.length === 0 ? (
            <div className="glass-card rounded-2xl p-10 text-center space-y-4 border border-euro-800/80">
              {selectedCategory === 'favorites' ? (
                <>
                  <div className="w-12 h-12 rounded-full bg-rose-950/60 text-rose-400 border border-rose-800/60 flex items-center justify-center mx-auto">
                    <Heart className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-white">Henüz Favori Ürününüz Yok</h3>
                  <p className="text-slate-400 text-xs max-w-sm mx-auto">
                    Beğendiğiniz ürünlerin üzerindeki kalp ikonuna tıklayarak favorilerinize ekleyebilir, daha sonra kolayca inceleyebilirsiniz.
                  </p>
                  <button 
                    onClick={() => setSelectedCategory('all')}
                    className="text-xs font-bold text-euro-400 hover:text-euro-300 underline"
                  >
                    Tüm Ürünleri Gör
                  </button>
                </>
              ) : (
                <>
                  <p className="text-slate-400 text-sm">Aradığınız kriterlere uygun ürün bulunamadı.</p>
                  <button 
                    onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                    className="text-xs font-bold text-euro-400 hover:underline"
                  >
                    Filtreleri Temizle
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className={`grid gap-2.5 sm:gap-6 ${mobileCols === 1 ? 'grid-cols-1' : 'grid-cols-2'} sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full`}>
              {sortedProducts.map(product => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  currency={currency}
                  rates={rates}
                  onSelectProduct={setSelectedProduct}
                  onAddToCart={handleAddToCart}
                  onOpenWizard={() => setIsWizardOpen(true)}
                  mobileCols={mobileCols}
                  isFavorite={favorites.includes(product.id)}
                  onToggleFavorite={toggleFavorite}
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

      {/* 6. Bottom Tab Bar (Bottom Navigation Bar) */}
      <MobileBottomBar 
        cartCount={cartTotalCount}
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

      {/* 7. Product Modal (With Sticky Buy Bar / Floating Action Bar & Multi-Image Gallery) */}
      <ProductModal 
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        currency={currency}
        rates={rates}
        onAddToCart={handleAddToCart}
        onOpenWizard={() => setIsWizardOpen(true)}
        isFavorite={selectedProduct ? favorites.includes(selectedProduct.id) : false}
        onToggleFavorite={toggleFavorite}
        onShowToast={showToast}
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
