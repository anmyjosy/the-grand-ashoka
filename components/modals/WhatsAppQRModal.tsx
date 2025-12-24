'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { X, MessageSquare, ExternalLink } from 'lucide-react';

export default function WhatsAppQRModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const whatsappUrl = "https://wa.me/918089001017?text=Hi Grand Ashoka, I'd like to place an order.";

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                {/* Overlay */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                {/* Modal */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl overflow-hidden border border-[#F2EDEA]"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-[#F2EDEA] flex justify-between items-center bg-[#FFFBF7]">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-[#FF7A21]/10 rounded-lg text-[#FF7A21]">
                                <MessageSquare size={20} />
                            </div>
                            <div>
                                <h2 className="text-xl font-playfair font-bold text-[#1A1614]">Order via WhatsApp</h2>
                                <p className="text-[10px] text-[#A0958F] font-bold uppercase tracking-widest leading-none">Scan to Start Chat</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-[#F2EDEA] rounded-full transition-colors">
                            <X size={24} className="text-[#1A1614]" />
                        </button>
                    </div>

                    <div className="p-8 flex flex-col items-center">
                        {/* QR Code Container */}
                        <div className="p-4 bg-white border-2 border-[#FF7A21]/20 rounded-2xl shadow-inner mb-6">
                            <QRCodeSVG
                                value={whatsappUrl}
                                size={200}
                                fgColor="#1A1614"
                                level="H"
                                includeMargin={true}
                            />
                        </div>

                        <div className="text-center space-y-4">
                            <p className="text-sm text-[#5C5552] leading-relaxed">
                                Scan this QR code with your phone camera to <strong className="text-[#1A1614]">immediately start a chat</strong>
                            </p>
                            <p className="text-[10px] text-[#A0958F] uppercase tracking-widest font-bold">
                                Or call us: <a href="tel:+918089001017" className="text-[#FF7A21]">+91 8089001017</a>
                            </p>

                            <div className="pt-4 border-t border-[#F2EDEA] w-full">
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-[#FF7A21] font-bold uppercase tracking-widest text-xs hover:underline"
                                >
                                    Or click here to open chat
                                    <ExternalLink size={14} />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-[#FFFBF7] text-center">
                        <p className="text-[10px] text-[#A0958F] font-medium italic">
                            * Dedicated support for Manama, Bahrain orders.
                        </p>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
