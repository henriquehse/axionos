import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ChevronRight, Star } from 'lucide-react';

interface HeroProps {
  onAddToCart: (product: {
    id: string;
    name: string;
    price: number;
    color: string;
    size: string;
    image: string;
    quantity: number;
  }) => void;
  onOpenCart: () => void;
}

const DESIGN_TOKENS = {
  colors: {
    obsidian: '#0A0A0A',
    sand: '#F5F5F0',
    stone: '#8A8A8A',
  },
  animation: {
    transitionProps: { type: 'spring' as const, stiffness: 100, damping: 20 },
  }
};

const PRODUCT_DATA = {
  name: "The Essential Heavyweight",
  price: 289.00,
  variants: [
    { id: 'v1', color: 'Obsidian Black', hex: DESIGN_TOKENS.colors.obsidian, img: '/images/tee-black.webp' },
    { id: 'v2', color: 'Desert Sand', hex: DESIGN_TOKENS.colors.sand, img: '/images/tee-sand.webp' }
  ],
  sizes: ['P', 'M', 'G', 'GG']
};

export default function HeroSection({ onAddToCart, onOpenCart }: HeroProps) {
  const [activeVariant, setActiveVariant] = useState(PRODUCT_DATA.variants[0]);
  const [activeSize, setActiveSize] = useState('M');

  const handleAdd = () => {
    onAddToCart({
      id: `${activeVariant.id}-${activeSize}`,
      name: PRODUCT_DATA.name,
      price: PRODUCT_DATA.price,
      color: activeVariant.color,
      size: activeSize,
      image: activeVariant.img,
      quantity: 1
    });
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col lg:flex-row items-center bg-white overflow-hidden font-sans">
      
      {/* NAVBAR SIMBOLISTA (Minimal) */}
      <nav className="absolute top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center pointer-events-none">
        <div className="text-xl font-black tracking-tighter pointer-events-auto cursor-pointer">AXIONOS</div>
        <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-gray-400 pointer-events-auto hidden md:flex">
          <a href="#" className="hover:text-black transition-colors">Shop</a>
          <a href="#" className="hover:text-black transition-colors">Archive</a>
          <a href="#" className="hover:text-black transition-colors">About</a>
        </div>
        <button 
          onClick={onOpenCart}
          className="pointer-events-auto p-2 hover:bg-gray-100 rounded-full transition-all relative"
        >
          <ShoppingBag className="w-5 h-5 text-black" />
        </button>
      </nav>

      {/* COLUNA ESQUERDA: GALERIA DE PRODUTO */}
      <div className="w-full lg:w-3/5 h-[60vh] lg:h-screen relative bg-[#F9F9F9] flex items-center justify-center p-8 lg:p-24">
        <div className="absolute top-24 left-12 hidden lg:block">
           <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-300 [writing-mode:vertical-lr] rotate-180">
             CRAFTED IN PORTUGAL / 340GSM
           </span>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeVariant.id}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, y: -20 }}
            transition={{ ...DESIGN_TOKENS.animation.transitionProps, duration: 0.6 } as any}
            className="relative w-full h-full flex items-center justify-center"
          >
            <img
              src={activeVariant.img}
              alt={`${PRODUCT_DATA.name} em ${activeVariant.color}`}
              className="w-full max-w-sm lg:max-w-xl xl:max-w-2xl object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.1)] mix-blend-multiply"
            />
            {/* Subtle Texture/Detail Zoom indicator or info */}
            <div className="absolute bottom-12 right-12 bg-white/50 backdrop-blur-md px-4 py-2 border border-white/50 rounded-full flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Heavy Cotton Texture</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* COLUNA DIREITA: MOTOR DE CONVERSÃO */}
      <div className="w-full lg:w-2/5 flex flex-col justify-center px-8 lg:px-20 py-16 lg:py-0 z-10">
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, ...DESIGN_TOKENS.animation.transitionProps } as any}
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="flex text-amber-500">
               {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">4.9/5 (1,248 reviews)</span>
          </div>

          <span className="text-[11px] tracking-[0.25em] uppercase text-stone-500 font-bold mb-4 block">
            The Essentials Collection
          </span>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-black mb-4 leading-[0.9]">
            {PRODUCT_DATA.name.split(' ').map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </h1>
          <p className="text-2xl text-gray-900 mb-10 font-bold tracking-tight">
            R$ {PRODUCT_DATA.price.toFixed(2)}
          </p>

          <div className="space-y-10">
            {/* SELETOR DE COR */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-900">Color: <span className="text-gray-400">{activeVariant.color}</span></span>
              </div>
              <div className="flex gap-4">
                {PRODUCT_DATA.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setActiveVariant(variant)}
                    className={`group relative w-12 h-12 rounded-full p-1 transition-all duration-500 ease-in-out ${
                      activeVariant.id === variant.id ? 'ring-2 ring-black bg-gray-50' : 'ring-1 ring-gray-200'
                    }`}
                  >
                    <span 
                      className="block w-full h-full rounded-full shadow-inner"
                      style={{ backgroundColor: variant.hex }}
                    />
                    <motion.span 
                      className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                    >
                      {variant.color}
                    </motion.span>
                  </button>
                ))}
              </div>
            </div>

            {/* SELETOR DE TAMANHO */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-900">Size: <span className="text-gray-400 font-normal">{activeSize}</span></span>
                <button className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-200 hover:border-black transition-colors">
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {PRODUCT_DATA.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setActiveSize(size)}
                    className={`py-4 border text-[11px] font-bold transition-all duration-300 rounded-sm ${
                      activeSize === size 
                        ? 'border-black bg-black text-white' 
                        : 'border-gray-200 bg-white text-gray-900 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA PRINCIPAL */}
            <div className="pt-4">
              <motion.button
                whileHover={{ scale: 1.01, backgroundColor: '#111' }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAdd}
                className="w-full bg-black text-white py-6 flex items-center justify-between px-10 font-bold uppercase tracking-widest text-xs shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
              >
                <span>Add to Bag</span>
                <div className="flex items-center gap-3">
                  <div className="w-px h-4 bg-white/20" />
                  <ChevronRight className="w-5 h-5" />
                </div>
              </motion.button>
              
              <div className="mt-8 flex items-center justify-center gap-8 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full" />
                  In Stock
                </div>
                <div className="flex items-center gap-2">
                   24h Shipping
                </div>
                <div className="flex items-center gap-2">
                   Free Returns
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
    </section>
  );
}
