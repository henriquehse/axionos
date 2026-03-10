import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function FeaturedExperience() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative w-full bg-[#0A0A0A] py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        
        {/* TEXT REVEAL */}
        <motion.div 
          style={{ opacity }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center"
        >
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/30 mb-8 block">
              Evolution of the Essential
            </span>
            <h2 className="text-4xl lg:text-7xl font-bold text-white tracking-tighter leading-[0.9] mb-12">
              BEYOND THE <br /> <span className="text-white/20">TRADITION.</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-md leading-relaxed mb-12 font-light">
              Crafted with a 340GSM interlocked weave, our heavyweight cotton maintains structure long after the first wash. A silhouette that defines without restricting.
            </p>
            
            <div className="space-y-8">
              {[
                { label: 'Density', val: '340GSM' },
                { label: 'Origin', val: 'Porto, Portugal' },
                { label: 'Fit', val: 'Boxy / Oversized' }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">{item.label}</span>
                  <span className="text-xs font-bold text-white uppercase tracking-widest">{item.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-[3/4] lg:aspect-square group">
            <motion.div 
              style={{ y: y1 }}
              className="absolute -top-12 -right-12 w-1/2 h-1/2 border border-white/10 z-0"
            />
            <motion.div 
              style={{ scale }}
              className="relative w-full h-full bg-[#111] overflow-hidden rounded-sm"
            >
              <img 
                src="/images/texture-zoom.webp" 
                alt="Fabric Detail" 
                className="w-full h-full object-cover grayscale opacity-80 group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-12 left-12">
                <p className="text-white font-black text-4xl tracking-tighter uppercase leading-none">
                  Heavy <br /> Weave
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* FLOATING DECORATIONS */}
      <motion.div 
        style={{ y: y2 }}
        className="absolute top-0 right-0 text-[20vw] font-black text-white/[0.02] pointer-events-none select-none -translate-y-1/2"
      >
        AXIONOS
      </motion.div>
    </section>
  );
}
