'use client';

import { motion } from 'framer-motion';
import { Check, ShoppingBag, Eye } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function OrderSuccessPage() {
    const [orderInfo, setOrderInfo] = useState<{ name: string; phone: string; orderId?: string | number } | null>(null);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        const savedInfo = localStorage.getItem('lastOrderInfo');
        if (savedInfo) {
            setOrderInfo(JSON.parse(savedInfo));
        }
    }, []);

    // Random dots for the confetti effect
    const dots = [...Array(12)].map((_, i) => ({
        id: i,
        x: Math.random() * 200 - 100,
        y: Math.random() * 200 - 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 0.5
    }));

    return (
        <main className="min-h-screen bg-[#F0F2F5] flex items-center justify-center p-6 pt-24 font-sans">
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-xl w-full bg-white rounded-xl shadow-sm border border-[#E1E4E8] overflow-hidden flex flex-col relative"
            >
                <div className="p-12 md:p-16 text-center space-y-8">
                    {/* Centered Achievement Style Checkmark */}
                    <div className="relative inline-block">
                        {/* Confetti Dots */}
                        <div className="absolute inset-0 pointer-events-none">
                            {dots.map((dot) => (
                                <motion.div
                                    key={dot.id}
                                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                                    animate={{ opacity: 1, scale: 1, x: dot.x, y: dot.y }}
                                    transition={{
                                        type: 'spring',
                                        damping: 15,
                                        stiffness: 150,
                                        delay: dot.delay
                                    }}
                                    className="absolute bg-[#FF7A21]/40 rounded-full"
                                    style={{ width: dot.size, height: dot.size, left: '50%', top: '50%' }}
                                />
                            ))}
                        </div>

                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: 'spring',
                                damping: 12,
                                stiffness: 200,
                                delay: 0.2
                            }}
                            className="w-24 h-24 bg-gradient-to-tr from-[#FF7A21] to-[#FF9B5E] mx-auto rounded-full flex items-center justify-center text-white shadow-xl shadow-orange-500/30 relative z-10"
                        >
                            <Check size={48} strokeWidth={3} />
                        </motion.div>
                    </div>

                    <div className="space-y-3">
                        <h1 className="text-3xl font-bold text-[#1A1614] tracking-tight">Thank you for ordering!</h1>
                        <p className="text-[#5C5552] text-sm md:text-base leading-relaxed max-w-sm mx-auto opacity-70">
                            Your delicious meal is being prepared with high quality ingredients and love.
                        </p>
                    </div>

                    {/* Order Details Toggle (Hidden by default based on simple design) */}
                    {showDetails && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="bg-[#FFFBF7] p-6 rounded-xl border border-[#F2EDEA] text-left space-y-3"
                        >
                            <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-[#A0958F]">
                                <span>Reference ID</span>
                                <span className="text-[#1A1614]">#{orderInfo?.orderId || '----'}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-[#A0958F]">
                                <span>Contact</span>
                                <span className="text-[#1A1614]">{orderInfo?.phone || '----'}</span>
                            </div>
                        </motion.div>
                    )}

                    {/* Buttons Layout */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <button
                            onClick={() => setShowDetails(!showDetails)}
                            className="w-full sm:w-auto px-8 py-3.5 rounded-sm border border-[#E1E4E8] text-[#1A1614] text-xs font-bold uppercase tracking-widest hover:bg-[#F2EDEA] transition-all flex items-center justify-center gap-2 group"
                        >
                            <Eye size={14} className="group-hover:text-[#FF7A21] transition-colors" />
                            {showDetails ? 'Hide Order' : 'View Order'}
                        </button>

                        <Link
                            href="/"
                            className="w-full sm:w-auto px-10 py-4 rounded-sm bg-[#FF7A21] text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-orange-500/20 hover:bg-[#E6691A] transition-all flex items-center justify-center gap-2 group"
                        >
                            Continue Shopping
                            <ShoppingBag size={14} className="group-hover:scale-110 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* Footer Subtle Brand Tag */}
                <div className="bg-[#FAFBFC] p-4 text-center border-t border-[#E1E4E8]">
                    <p className="text-[10px] text-[#A0958F] font-bold uppercase tracking-[0.2em]">The Grand Ashoka • Authentic Flavors</p>
                </div>
            </motion.div>
        </main>
    );
}
