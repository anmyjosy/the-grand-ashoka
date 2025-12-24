'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X } from 'lucide-react';
import Image from 'next/image';
import WhatsAppQRModal from '../modals/WhatsAppQRModal';

export default function Navbar() {
    const pathname = usePathname();
    const isSuccessPage = pathname === '/order-success';
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isQRModalOpen, setIsQRModalOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#hero' },
        { name: 'About', href: '#about' },
        { name: 'Menu', href: '#menu' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${(isScrolled || isSuccessPage) ? 'bg-[#1A1614]/95 backdrop-blur-md py-4 shadow-xl' : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
                {/* Logo */}
                <div
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    <Image
                        src="/ashoka-logo.png"
                        alt="The Grand Ashoka Logo"
                        width={100}
                        height={40}
                        className="h-10 md:h-12 w-auto object-contain brightness-110 group-hover:scale-105 transition-transform"
                        priority
                    />
                    <div className="flex flex-col justify-center">
                        <span className="text-[9px] md:text-[11px] font-bold text-[#22C55E] tracking-[0.4em] uppercase leading-none translate-y-[2px]">The</span>
                        <div className="flex items-center gap-1.5 leading-none">
                            <span className="text-sm md:text-base font-playfair font-bold text-[#FF7A21] uppercase tracking-tight">Grand</span>
                            <span className="text-sm md:text-base font-playfair font-bold text-[#FF7A21] uppercase tracking-tight">Ashoka</span>
                        </div>
                    </div>
                </div>

                {/* Center Links - Desktop */}
                <div className="hidden lg:flex items-center gap-10 lg:ml-auto lg:mr-32">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-white/80 hover:text-[#FF7A21] transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF7A21] transition-all duration-300 group-hover:w-full" />
                        </a>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4 md:gap-8">
                    <div className="hidden md:flex items-center gap-2 text-white/90">
                        <Phone size={16} className="text-[#FF7A21]" />
                        <span className="text-sm font-medium">+91 8089001017</span>
                    </div>

                    <button
                        onClick={() => setIsQRModalOpen(true)}
                        className="hidden sm:block bg-[#FF7A21] text-white px-5 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all hover:bg-[#E6691A] hover:shadow-lg hover:shadow-orange-500/20 active:scale-95"
                    >
                        Order via WhatsApp
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="lg:hidden text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 bg-[#1A1614] border-t border-white/5 py-8 px-6 lg:hidden flex flex-col gap-6 shadow-2xl"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-xl font-playfair text-white hover:text-[#FF7A21] transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                        <div className="pt-4 flex flex-col gap-4">
                            <div className="flex items-center gap-2 text-white/80">
                                <Phone size={18} className="text-[#FF7A21]" />
                                <span>+91 80890 01017</span>
                            </div>
                            <button
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    setIsQRModalOpen(true);
                                }}
                                className="w-full bg-[#FF7A21] text-white px-6 py-4 rounded-lg text-center text-sm font-bold uppercase tracking-widest transition-all"
                            >
                                Order via WhatsApp
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <WhatsAppQRModal isOpen={isQRModalOpen} onClose={() => setIsQRModalOpen(false)} />
        </header>
    );
}
