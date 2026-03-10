import React from 'react';
import { motion } from 'framer-motion';

const LOOKBOOK_IMAGES = [
  { src: '/images/lifestyle-1.webp', span: 'col-span-2 row-span-2', label: 'Obsidian Persona' },
  { src: '/images/tee-sand.webp', span: 'col-span-1 row-span-1', label: 'Earthy Tones' },
  { src: '/images/tee-black.webp', span: 'col-span-1 row-span-1', label: 'Structure' },
  { src: '/images/hoodie-black.webp', span: 'col-span-2 row-span-1', label: 'The Uniform' },
];

export default function LookbookGrid() {
  return (
    <section className="w-full bg-white py-32 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-400 mb-4 block">Visual Archive</span>
            <h2 className="text-5xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.8]">
              Look <br /> Book <span className="text-gray-200">26</span>
            </h2>
          </div>
          <p className="text-gray-500 text-sm max-w-xs leading-relaxed font-medium">
            A study in form and shadow. Our 2026 archive focuses on the architecture of everyday wear.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-4 h-[120vh]">
          {LOOKBOOK_IMAGES.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className={`${img.span} relative group overflow-hidden bg-gray-50`}
            >
              <img 
                src={img.src} 
                alt={img.label} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-bold text-white uppercase tracking-widest bg-black px-3 py-1">
                  {img.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
