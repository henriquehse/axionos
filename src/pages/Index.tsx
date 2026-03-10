import React, { useState, useEffect } from 'react';
import HeroSection from '../components/ecommerce/HeroSection';
import CartDrawer from '../components/ecommerce/CartDrawer';
import FeaturedExperience from '../components/ecommerce/FeaturedExperience';
import LookbookGrid from '../components/ecommerce/LookbookGrid';
import { toast } from 'sonner';

interface CartItem {
  id: string;
  name: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
  image: string;
}

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Smooth Scroll Initialization (Native behavior enhanced by CSS)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = (product: CartItem) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, product];
    });
    
    toast.success('Produto adicionado ao carrinho', {
      description: `${product.name} - ${product.color} (${product.size})`,
      action: {
        label: 'Ver Carrinho',
        onClick: () => setIsCartOpen(true)
      },
    });

    setTimeout(() => setIsCartOpen(true), 1200);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast.info('Item removido do carrinho');
  };

  return (
    <main className="min-h-screen bg-white">
      <HeroSection 
        onAddToCart={handleAddToCart} 
        onOpenCart={() => setIsCartOpen(true)} 
      />

      {/* NEW EXPANSION: The "Quality" Parallax Section */}
      <FeaturedExperience />

      {/* NEW EXPANSION: The Visual Archive */}
      <LookbookGrid />
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveItem}
      />

      {/* FOOTER Simples para fechar o layout */}
      <footer className="bg-[#0A0A0A] text-white py-24 px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <span className="text-[10px] font-bold uppercase tracking-[1em] text-white/20 mb-12">
              The Archive Is Now Open
            </span>
            <h2 className="text-4xl lg:text-9xl font-black tracking-tighter mb-12">AXIONOS</h2>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-16 text-left w-full border-t border-white/10 pt-16">
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-8 text-white/40">Shop</h4>
                <ul className="space-y-4 text-xs font-medium">
                  <li><a href="#" className="hover:text-white/60 transition-colors">T-Shirts</a></li>
                  <li><a href="#" className="hover:text-white/60 transition-colors">Hoodies</a></li>
                  <li><a href="#" className="hover:text-white/60 transition-colors">Archive</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-8 text-white/40">Company</h4>
                <ul className="space-y-4 text-xs font-medium">
                  <li><a href="#" className="hover:text-white/60 transition-colors">Our Story</a></li>
                  <li><a href="#" className="hover:text-white/60 transition-colors">Sustainability</a></li>
                  <li><a href="#" className="hover:text-white/60 transition-colors">Terms</a></li>
                </ul>
              </div>
              <div className="col-span-2">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-8 text-white/40">Subscribe</h4>
                <div className="flex gap-4">
                  <input 
                    type="email" 
                    placeholder="ENTER YOUR EMAIL" 
                    className="bg-transparent border-b border-white/20 py-2 flex-1 text-xs outline-none focus:border-white transition-colors"
                  />
                  <button className="text-[10px] font-bold uppercase tracking-widest border border-white/20 px-6 py-2 hover:bg-white hover:text-black transition-all">
                    Join
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-24 w-full flex justify-between items-center opacity-30 text-[9px] font-bold uppercase tracking-widest">
              <p>© 2026 AXIONOS ESSENTIALS.</p>
              <div className="flex gap-8">
                <span>Instagram</span>
                <span>TikTok</span>
              </div>
            </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;
