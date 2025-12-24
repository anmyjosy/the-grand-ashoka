'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MENU_DATA } from '@/lib/menu-data';
import { Flame, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '@/components/cart/CartProvider';

export default function MenuSection() {
    const [activeCategory, setActiveCategory] = useState(MENU_DATA[0].title);
    const { addItem, updateQuantity, items } = useCart();

    const filteredItems = MENU_DATA.find(cat => cat.title === activeCategory)?.items || [];

    const getItemQuantity = (name: string) => {
        return items.find(i => i.name === name)?.quantity || 0;
    };

    return (
        <section id="menu" className="bg-[#FFFBF7] py-20">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-playfair font-bold text-[#1A1614] mb-4"
                    >
                        Our <span className="text-[#FF7A21]">Menu</span>
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col items-center gap-2 mb-6"
                    >
                        <p className="text-[#A0958F] text-xs uppercase tracking-[0.3em] font-bold">Authentic South Indian Flavors</p>
                        <p className="text-[#A0958F] text-[10px] uppercase tracking-widest font-bold">
                            Call to Order: <a href="tel:+918089001017" className="text-[#FF7A21] hover:underline font-bold">+91 8089001017</a>
                        </p>
                    </motion.div>
                </div>

                {/* Category Pills */}
                <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-4 mb-12 overflow-x-auto pb-4 md:pb-0 no-scrollbar animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {MENU_DATA.map((category) => (
                        <button
                            key={category.title}
                            onClick={() => setActiveCategory(category.title)}
                            className={`px-8 py-3 rounded-full text-xs font-bold transition-all duration-300 ${activeCategory === category.title
                                ? 'bg-[#FF7A21] text-white shadow-lg shadow-orange-500/20 scale-105'
                                : 'bg-[#F2EDEA] text-[#1A1614] hover:bg-[#FF7A21]/10'
                                }`}
                        >
                            {category.title}
                        </button>
                    ))}
                </div>

                {/* Menu Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item, index) => (
                            <motion.div
                                key={item.name}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className="bg-white p-8 rounded-2xl border border-[#F2EDEA] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative"
                            >
                                {/* Chef's Special Badge (Dummy check for variety) */}
                                {index % 4 === 0 && (
                                    <div className="absolute -top-3 left-6 z-10">
                                        <div className="bg-[#FF7A21] text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full shadow-md">
                                            Chef's Special
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-playfair font-bold text-[#1A1614] group-hover:text-[#FF7A21] transition-colors leading-snug">
                                        {item.name}
                                    </h3>
                                    <span className="text-lg font-bold text-[#FF7A21] whitespace-nowrap">{item.price} BHD</span>
                                </div>

                                {item.description && (
                                    <p className="text-[#A0958F] text-[11px] leading-relaxed font-light mb-6 line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
                                        {item.description}
                                    </p>
                                )}

                                <div className="pt-4 border-t border-[#F2EDEA] flex justify-between items-center transition-all">
                                    {getItemQuantity(item.name) > 0 ? (
                                        <div className="flex items-center gap-3 bg-[#FF7A21]/10 rounded-full px-3 py-1.5 border border-[#FF7A21]/20">
                                            <button
                                                onClick={() => updateQuantity(item.name, -1)}
                                                className="w-6 h-6 rounded-full bg-white text-[#FF7A21] flex items-center justify-center hover:bg-[#FF7A21] hover:text-white transition-all shadow-sm"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="text-sm font-bold text-[#FF7A21] w-4 text-center">
                                                {getItemQuantity(item.name)}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.name, 1)}
                                                className="w-6 h-6 rounded-full bg-white text-[#FF7A21] flex items-center justify-center hover:bg-[#FF7A21] hover:text-white transition-all shadow-sm"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => addItem({ name: item.name, price: item.price })}
                                            className="text-[10px] uppercase tracking-widest font-bold text-[#FF7A21] hover:bg-[#FF7A21] hover:text-white px-4 py-2 rounded-full border border-[#FF7A21]/30 transition-all flex items-center gap-2"
                                        >
                                            <ShoppingCart size={12} />
                                            Add to Cart
                                        </button>
                                    )}
                                    <div className="flex gap-2 text-[#FF7A21]">
                                        <Flame size={14} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
