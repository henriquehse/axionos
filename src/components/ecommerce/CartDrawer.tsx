import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ChevronRight, Sparkles } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
  image: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const DESIGN_TOKENS = {
  colors: {
    obsidian: '#0A0A0A',
    sand: '#F5F5F0',
    stone: '#8A8A8A',
    accent: '#000000',
  }
};

const FREE_SHIPPING_THRESHOLD = 500;

export default function CartDrawer({ isOpen, onClose, items, onUpdateQuantity, onRemove }: CartDrawerProps) {
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Drawer Content */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col font-sans"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-black" />
                <h2 className="text-lg font-semibold tracking-tight uppercase">Seu Carrinho</h2>
                <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {items.length}
                </span>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Free Shipping Bar */}
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-gray-700">
                  {progress === 100 
                    ? 'Você ganhou Frete Grátis!' 
                    : `Faltam R$ ${remaining.toFixed(2)} para Frete Grátis`}
                </span>
                <span className="text-[10px] text-gray-400 font-mono">{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-black transition-all duration-500 ease-out"
                />
              </div>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                  <ShoppingBag className="w-12 h-12 mb-4 stroke-1" />
                  <p className="text-gray-500">Seu carrinho está vazio</p>
                  <button 
                    onClick={onClose}
                    className="mt-4 text-sm font-semibold underline underline-offset-4"
                  >
                    Continuar comprando
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <motion.div 
                      key={`${item.id}-${item.size}`}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-4"
                    >
                      <div className="w-24 h-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-contain mix-blend-multiply" 
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="text-sm font-bold text-gray-900 leading-tight">{item.name}</h3>
                            <button 
                              onClick={() => onRemove(item.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">
                            {item.color} / {item.size}
                          </p>
                        </div>
                        <div className="flex justify-between items-end">
                          <div className="flex items-center border border-gray-200 rounded-sm">
                            <button 
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="px-2 py-1 hover:bg-gray-50 text-gray-500 transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 py-1 text-xs font-mono">{item.quantity}</span>
                            <button 
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="px-2 py-1 hover:bg-gray-50 text-gray-500 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <p className="text-sm font-bold">R$ {(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Cross-Sell (Hyper-Optimized) */}
              {items.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-100">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <h4 className="text-xs font-bold uppercase tracking-[0.1em]">Complete o Look</h4>
                  </div>
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 flex gap-3 group cursor-pointer hover:border-black transition-all">
                    <div className="w-16 h-16 bg-white rounded-md overflow-hidden p-1">
                      <img src="/images/hoodie-black.webp" alt="Hoodie Premium" className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <p className="text-xs font-bold text-gray-900">The Essential Hoodie</p>
                      <p className="text-[10px] text-gray-500">R$ 449,00</p>
                    </div>
                    <button className="self-center p-2 bg-white rounded-full border border-gray-200 group-hover:bg-black group-hover:text-white transition-all shadow-sm">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-6 border-t border-gray-100 bg-white">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">Subtotal</span>
                  <span className="text-lg font-bold">R$ {subtotal.toFixed(2)}</span>
                </div>
                <p className="text-[10px] text-gray-400 mb-6 text-center uppercase tracking-widest">
                  Impostos e frete calculados no checkout
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-black text-white py-5 flex items-center justify-between px-8 font-bold tracking-widest uppercase text-sm shadow-xl hover:bg-gray-900 transition-all rounded-sm"
                >
                  <span>Finalizar Compra</span>
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
