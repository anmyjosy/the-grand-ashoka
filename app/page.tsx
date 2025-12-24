'use client';

import Hero from '@/components/sections/Hero';
import MenuSection from '@/components/sections/MenuSection';
import { Leaf, Flame, Camera, Utensils, MapPin, ChevronRight, Menu as MenuIcon, UtensilsCrossed } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import WhatsAppQRModal from '@/components/modals/WhatsAppQRModal';
import { useCart } from '@/components/cart/CartProvider';
import { Plus } from 'lucide-react';

export default function Home() {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const { addItem } = useCart();

  return (
    <main className="min-h-screen bg-[#FFFBF7] selection:bg-[#FF7A21] selection:text-white">
      <Hero />

      {/* Variety Highlight - Featured Products (Visible above/near fold) */}
      <section className="bg-[#FFFBF7] py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-sm font-medium text-[#A0958F] mb-1">Signature Varieties</p>
            <h2 className="text-4xl md:text-5xl font-playfair italic text-[#FF7A21] mb-6">Feature Products</h2>
            <div className="flex items-center justify-center gap-2 text-[#FF7A21]/30">
              <div className="h-px w-10 bg-[#FF7A21]" />
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rotate-45 bg-[#FF7A21]" />
                <div className="w-1.5 h-1.5 rotate-45 bg-[#FF7A21]" />
              </div>
              <div className="h-px w-10 bg-[#FF7A21]" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Ghee Masala Dosa", price: "1.200", img: "/dosa.jpg" },
              { name: "Paneer Butter Masala", price: "1.900", img: "/paneer-butter-masala-recipe.jpg" },
              { name: "Schezwan Fried Rice", price: "1.600", img: "/schezwan-fried-rice.jpg" }
            ].map((product, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-6 shadow-xl shadow-black/5 rounded-sm group hover:-translate-y-2 transition-transform duration-500 border border-[#F2EDEA]"
              >
                <div className="relative aspect-[4/3] overflow-hidden mb-6 border-b border-[#F2EDEA] pb-6">
                  <Image
                    src={product.img}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <p className="text-[#A0958F] text-xs font-bold uppercase tracking-widest mb-2">{product.name}</p>
                <h4 className="text-3xl font-playfair font-bold text-[#FF7A21] mb-6">{product.price} <span className="text-[10px] text-[#A0958F]">BHD</span></h4>
                <button
                  onClick={() => addItem({
                    name: product.name,
                    price: product.price,
                  })}
                  className="inline-flex items-center justify-center gap-2 w-full bg-[#FF7A21] text-white py-3 px-4 text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-[#E6691A] transition-all hover:shadow-lg active:scale-95"
                >
                  <Plus size={14} />
                  Add to Cart
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/ashoka.jpg"
                  alt="Restaurant Interior"
                  width={500}
                  height={900}
                  className="w-full h-[500px] object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#FF7A21]/10 rounded-full blur-3xl -z-10" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#22C55E]/10 rounded-full blur-2xl -z-10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF7A21]/10 text-[#FF7A21] text-xs font-bold uppercase tracking-widest">
                <Leaf size={14} />
                <span>Culinary Gem in Bahrain</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-playfair italic text-[#1A1614] leading-tight">
                Pure Vegetarian <br />
                <span className="text-[#FF7A21]">Excellence in Manama</span>
              </h2>

              <div className="space-y-4 text-sm text-[#5C5552] leading-relaxed">
                <p>
                  Located in the vibrant heart of Manama, <strong>The Grand Ashoka</strong> is a haven for those who appreciate the rich flavors and wholesome ingredients of authentic vegetarian cuisine. We blend tradition with modernity to offer an unforgettable culinary experience for locals and tourists exploring the beauty of Bahrain.
                </p>
                <p>
                  Our central location makes us the perfect retreat after visiting nearby landmarks like the <strong>Bahrain National Museum</strong>, <strong>Bab Al Bahrain</strong>, or the bustling <strong>Manama Souq</strong>. Whether you're staying in Riffa, Muharraq, or just arriving from Bahrain International Airport (only 12 minutes away), a soulful meal awaits you.
                </p>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#22C55E]/10 flex items-center justify-center shrink-0">
                      <MapPin size={16} className="text-[#22C55E]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1A1614] text-xs uppercase tracking-wider mb-1">Location</h4>
                      <p className="text-[11px]">Heart of Manama, Bahrain</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#FF7A21]/10 flex items-center justify-center shrink-0">
                      <Flame size={16} className="text-[#FF7A21]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1A1614] text-xs uppercase tracking-wider mb-1">Experience</h4>
                      <p className="text-[11px]">Authentic Indian Flavors</p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 bg-[#1A1614] text-white px-8 py-3.5 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-[#FF7A21] transition-all group"
              >
                <span>Discover Our Menu</span>
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <MenuSection />

      {/* Catering Section */}
      <section className="py-24 bg-[#FFFBF7] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FF7A21]/20 to-transparent" />
        <div className="max-w-4xl mx-auto px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-10 flex justify-center">
              <div className="w-20 h-20 rounded-full bg-[#FF7A21]/10 flex items-center justify-center text-[#FF7A21]">
                <UtensilsCrossed size={40} />
              </div>
            </div>
            <h2 className="text-3xl md:text-5xl font-playfair italic text-[#1A1614] mb-8 leading-tight">
              Elevate Your <span className="text-[#FF7A21]">Special Moments</span>
            </h2>
            <div className="space-y-6 text-lg text-[#5C5552] font-light max-w-2xl mx-auto leading-relaxed">
              <p className="uppercase tracking-[0.2em] text-xs font-bold text-[#FF7A21]/80">Catering & Events</p>
              <p>
                We cater to <strong className="text-[#1A1614]">Small & Large Gatherings</strong>, offering customized menus tailored to your taste.
              </p>
              <div className="py-8 border-y border-[#F2EDEA] flex flex-col items-center gap-4 my-8">
                <p className="text-xl font-playfair italic italic text-[#FF7A21]">Special Highlight</p>
                <p className="text-3xl md:text-4xl font-playfair text-[#1A1614]">
                  Live <span className="text-[#FF7A21]">Dosa Stations</span>
                </p>
                <p className="text-sm uppercase tracking-widest text-[#5C5552]/60 font-bold">For an Unforgettable Experience</p>
              </div>
              <p className="pt-6">
                <a
                  href="https://wa.me/918089001017?text=Hi Grand Ashoka, I'd like to inquire about your catering services and live dosa stations."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#1A1614] text-white px-12 py-4 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-[#FF7A21] transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Inquire Now
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </section>


      <WhatsAppQRModal isOpen={isQRModalOpen} onClose={() => setIsQRModalOpen(false)} />
    </main>
  );
}
