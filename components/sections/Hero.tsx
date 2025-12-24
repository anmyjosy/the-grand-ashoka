'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import WhatsAppQRModal from '../modals/WhatsAppQRModal';
import { MessageSquare } from 'lucide-react';

export default function Hero() {
    const [isQRModalOpen, setIsQRModalOpen] = useState(false);
    return (
        <section id="hero" className="relative h-[55vh] min-h-[450px] w-full flex items-center justify-center overflow-hidden">
            {/* Background Image with Dark Overlay */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-slow-zoom"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2000')",
                        filter: "brightness(0.4)"
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#1A1614]/80 via-transparent to-[#1A1614]" />
            </div>

            {/* Main Content - Clean Banner Style */}
            <div className="relative z-20 text-center px-6 max-w-5xl mt-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6"
                >
                    <p className="text-[#FF7A21] text-xs uppercase tracking-[0.5em] font-bold">
                        Established 1998 — South India
                    </p>

                    <h1 className="text-5xl md:text-7xl font-playfair font-bold text-white tracking-tighter leading-none mb-4 uppercase">
                        Signature <span className="text-[#FF7A21]">Tradition</span>
                    </h1>

                    <p className="text-[#DCD6C8]/80 text-sm md:text-base font-light max-w-lg mx-auto leading-relaxed mb-8">
                        Experience authentic Pure Vegetarian excellence in the heart of Manama.
                        A culinary gem blending traditional Indian flavors with modern elegance.
                    </p>

                    <div className="pt-2 flex flex-col items-center gap-4">
                        <button
                            onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                            className="inline-block bg-[#FF7A21] text-white px-10 py-3.5 rounded-sm text-sm font-bold uppercase tracking-widest transition-all hover:bg-[#E6691A] hover:shadow-xl active:scale-95 cursor-pointer"
                        >
                            Explore Menu
                        </button>
                    </div>
                </motion.div>
            </div>

            <WhatsAppQRModal isOpen={isQRModalOpen} onClose={() => setIsQRModalOpen(false)} />

            {/* Aesthetic Bottom Glow to blend with the next section */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FFFBF7] to-transparent z-10" />
        </section>
    );
}
