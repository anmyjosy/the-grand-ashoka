'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { useCart } from './CartProvider';
import { ShoppingBag, X, Plus, Minus, Trash2, Send, ArrowRight, ArrowLeft, MapPin, User, Phone as PhoneIcon, CreditCard, CheckCircle2, ChevronRight, Check } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function CartDrawer() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState<'cart' | 'details' | 'payment' | 'success'>('cart');
    const [loading, setLoading] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: ''
    });

    const { items, updateQuantity, removeItem, totalCount, totalPrice, clearCart } = useCart();

    const handleNextStep = () => {
        if (step === 'cart') setStep('details');
        else if (step === 'details') setStep('payment');
    };

    const handlePrevStep = () => {
        if (step === 'details') setStep('cart');
        else if (step === 'payment') setStep('details');
    };

    const handleSubmitOrder = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('orders')
                .insert([{
                    user_name: formData.name,
                    user_phone: formData.phone,
                    address: formData.address,
                    items: items,
                    total_price: totalPrice,
                    status: 'pending'
                }])
                .select()
                .single();

            if (error) throw error;

            // Save info for success page
            localStorage.setItem('lastOrderInfo', JSON.stringify({
                name: formData.name,
                phone: formData.phone,
                orderId: data.id
            }));

            // Redirect to Success Page
            clearCart();
            setIsOpen(false);
            setStep('cart'); // Reset for next time
            router.push('/order-success');
        } catch (err) {
            console.error("Order error:", err);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Floating Cart Button */}
            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 bg-[#FF7A21] text-white p-4 rounded-full shadow-[0_20px_40px_-10px_rgba(255,122,33,0.3)] flex items-center group transition-all duration-300"
            >
                <div className="relative">
                    <ShoppingBag size={24} />
                    {totalCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-white text-[#FF7A21] text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-sm border border-orange-100">
                            {totalCount}
                        </span>
                    )}
                </div>
                <div className="max-w-0 group-hover:max-w-xs transition-all duration-500 ease-in-out overflow-hidden">
                    <span className="pl-3 pr-1 whitespace-nowrap text-sm font-bold uppercase tracking-widest">
                        View Cart
                    </span>
                </div>
            </motion.button>

            {/* Drawer Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
                        >
                            {/* Header & Stepper */}
                            <div className="p-6 border-b border-[#F2EDEA] space-y-4 bg-[#FFFBF7]">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-[#FF7A21]/10 rounded-lg text-[#FF7A21]">
                                            <ShoppingBag size={20} />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-playfair font-bold text-[#1A1614]">
                                                {step === 'cart' && 'Your Order'}
                                                {step === 'details' && 'Delivery Info'}
                                                {step === 'payment' && 'Confirm & Pay'}
                                            </h2>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-2 hover:bg-[#F2EDEA] rounded-full transition-colors text-[#1A1614]"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                {/* Professional Stepper */}
                                <div className="flex items-center gap-2 px-1">
                                    {[
                                        { id: 'cart', label: 'Cart' },
                                        { id: 'details', label: 'Info' },
                                        { id: 'payment', label: 'Pay' }
                                    ].map((s, i, arr) => (
                                        <div key={s.id} className="flex-1 flex items-center gap-2">
                                            <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${['cart', 'details', 'payment'].indexOf(step) >= i
                                                ? 'bg-[#FF7A21]'
                                                : 'bg-[#F2EDEA]'
                                                }`} />
                                            {i < arr.length - 1 && (
                                                <ChevronRight size={10} className="text-[#A0958F]" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Items List */}
                            <div className={`flex-1 p-6 space-y-6 ${(step === 'cart' || step === 'payment') ? 'overflow-y-auto' : 'overflow-visible'}`}>
                                {step === 'cart' && (
                                    items.length === 0 ? (
                                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                            <div className="w-20 h-20 bg-[#F2EDEA] rounded-full flex items-center justify-center text-[#A0958F]">
                                                <ShoppingBag size={40} />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-playfair font-bold text-[#1A1614]">Your cart is empty</h3>
                                                <p className="text-sm text-[#A0958F]">Add delicious items from our menu to start your order.</p>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    setIsOpen(false);
                                                    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
                                                }}
                                                className="text-[#FF7A21] text-sm font-bold uppercase tracking-widest hover:underline"
                                            >
                                                Browse Menu
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            {items.map((item) => (
                                                <div key={item.name} className="flex justify-between items-start group">
                                                    <div className="space-y-1">
                                                        <h4 className="font-playfair font-bold text-[#1A1614] group-hover:text-[#FF7A21] transition-colors">
                                                            {item.name}
                                                        </h4>
                                                        <p className="text-sm font-bold text-[#FF7A21]">{item.price} BHD</p>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex items-center gap-3 bg-[#F2EDEA] rounded-full px-2 py-1">
                                                            <button
                                                                onClick={() => updateQuantity(item.name, -1)}
                                                                className="w-6 h-6 rounded-full bg-white text-[#1A1614] flex items-center justify-center hover:bg-[#FF7A21] hover:text-white transition-all shadow-sm"
                                                            >
                                                                <Minus size={12} />
                                                            </button>
                                                            <span className="text-sm font-bold text-[#1A1614] w-4 text-center">
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                onClick={() => updateQuantity(item.name, 1)}
                                                                className="w-6 h-6 rounded-full bg-white text-[#1A1614] flex items-center justify-center hover:bg-[#FF7A21] hover:text-white transition-all shadow-sm"
                                                            >
                                                                <Plus size={12} />
                                                            </button>
                                                        </div>
                                                        <button
                                                            onClick={() => removeItem(item.name)}
                                                            className="text-[#A0958F] hover:text-red-500 transition-colors p-1"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                )}

                                {step === 'details' && (
                                    <div className="space-y-6 animate-in slide-in-from-right duration-300">
                                        <div className="space-y-4">
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-[#A0958F]">Full Name</label>
                                                <div className="relative">
                                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0958F]" size={16} />
                                                    <input
                                                        type="text"
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        placeholder="Enter your name"
                                                        className="w-full pl-10 pr-4 py-3 bg-[#F2EDEA] border-none rounded-sm text-sm text-[#1A1614] focus:ring-2 focus:ring-[#FF7A21] transition-all placeholder:text-[#A0958F]/60"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-[#A0958F]">Phone Number</label>
                                                <div className="relative">
                                                    <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0958F]" size={16} />
                                                    <input
                                                        type="tel"
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                        placeholder="+973 ..."
                                                        className="w-full pl-10 pr-4 py-3 bg-[#F2EDEA] border-none rounded-sm text-sm text-[#1A1614] focus:ring-2 focus:ring-[#FF7A21] transition-all placeholder:text-[#A0958F]/60"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-[#A0958F]">Delivery Address</label>
                                                <div className="relative">
                                                    <MapPin className="absolute left-3 top-3 text-[#A0958F]" size={16} />
                                                    <textarea
                                                        value={formData.address}
                                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                        placeholder="Flat/Villa, Road, Block..."
                                                        rows={3}
                                                        className="w-full pl-10 pr-4 py-3 bg-[#F2EDEA] border-none rounded-sm text-sm text-[#1A1614] focus:ring-2 focus:ring-[#FF7A21] transition-all resize-none placeholder:text-[#A0958F]/60"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {step === 'payment' && (
                                    <div className="space-y-8 animate-in slide-in-from-right duration-300">
                                        <div className="p-8 bg-[#22C55E]/5 border-2 border-dashed border-[#22C55E]/30 rounded-3xl flex flex-col items-center text-center space-y-6">
                                            <div className="space-y-2">
                                                <div className="w-12 h-12 rounded-full bg-[#22C55E]/10 flex items-center justify-center text-[#22C55E] mx-auto">
                                                    <CreditCard size={28} />
                                                </div>
                                                <h4 className="text-xl font-playfair font-bold text-[#1A1614]">Scan & Pay</h4>
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-[#A0958F]">Simulated Payment</p>
                                            </div>

                                            {/* Real QR Code SVG with Premium Wrapper */}
                                            <motion.div
                                                whileHover={{ scale: 1.02 }}
                                                className="w-56 h-56 bg-white/80 backdrop-blur-md p-6 rounded-[2.5rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-white/50 relative group flex items-center justify-center overflow-hidden"
                                            >
                                                {/* Corner Accents */}
                                                <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#FF7A21]/30 rounded-tl-md" />
                                                <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#FF7A21]/30 rounded-tr-md" />
                                                <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#FF7A21]/30 rounded-bl-md" />
                                                <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#FF7A21]/30 rounded-br-md" />

                                                <QRCodeSVG
                                                    value={`https://the-grand-ashoka.com/pay/${totalPrice.toFixed(2)}BHD`}
                                                    size={180}
                                                    fgColor="#1A1614"
                                                    level="H"
                                                    includeMargin={false}
                                                />
                                                <div className="absolute top-2 right-2 flex gap-1">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                                                    <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]/40" />
                                                </div>
                                            </motion.div>

                                            <div className="space-y-4 w-full">
                                                <div className="p-4 bg-white border border-[#F2EDEA] rounded-xl flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-3 h-3 rounded-full bg-[#22C55E] animate-ping" />
                                                        <span className="text-sm font-bold text-[#1A1614]">Waiting for scan...</span>
                                                    </div>
                                                    <span className="text-xs text-[#A0958F] italic">Secure SSL</span>
                                                </div>
                                                <p className="text-[10px] text-[#A0958F] italic leading-relaxed px-4">
                                                    * Since this is a demo, simply click the button below to simulate a successful payment.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#A0958F]">Order Summary</h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-[#5C5552]">Items Total</span>
                                                    <span className="font-bold">{totalPrice.toFixed(3)} BHD</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-[#5C5552]">Delivery Fee</span>
                                                    <span className="text-[#22C55E] font-bold">FREE</span>
                                                </div>
                                                <div className="pt-2 border-t border-[#F2EDEA] flex justify-between text-lg font-bold text-[#1A1614]">
                                                    <span>Grand Total</span>
                                                    <span>{totalPrice.toFixed(3)} BHD</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {step === 'success' && (
                                    <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in duration-500">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', damping: 12 }}
                                            className="w-32 h-32 bg-[#22C55E]/10 rounded-full flex items-center justify-center text-[#22C55E]"
                                        >
                                            <CheckCircle2 size={64} />
                                        </motion.div>
                                        <div className="space-y-2">
                                            <h2 className="text-3xl font-playfair font-bold text-[#1A1614]">Thank You!</h2>
                                            <p className="text-sm text-[#A0958F]">Your order has been placed successfully.</p>
                                        </div>
                                        <div className="p-6 bg-[#FFFBF7] rounded-xl border border-[#F2EDEA] w-full space-y-3">
                                            <p className="text-xs uppercase tracking-widest font-bold text-[#1A1614]">What happens next?</p>
                                            <p className="text-sm text-[#5C5552]">Our team will call you at <strong className="text-[#1A1614]">{formData.phone}</strong> to confirm your order and delivery time.</p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setIsOpen(false);
                                                setStep('cart');
                                            }}
                                            className="w-full py-4 bg-[#1A1614] text-white text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-[#FF7A21] transition-all"
                                        >
                                            Back to Menu
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            {items.length > 0 && step !== 'success' && (
                                <div className="p-6 bg-[#FFFBF7] border-t border-[#F2EDEA] space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#A0958F] font-bold uppercase tracking-widest text-xs">Total Amount</span>
                                        <span className="text-2xl font-playfair font-bold text-[#1A1614]">{totalPrice.toFixed(3)} BHD</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            onClick={step === 'cart' ? clearCart : handlePrevStep}
                                            className="py-4 rounded-sm border border-[#F2EDEA] text-[#A0958F] text-xs font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2"
                                        >
                                            {step === 'cart' ? 'Clear' : (
                                                <>
                                                    <ArrowLeft size={14} />
                                                    Back
                                                </>
                                            )}
                                        </button>
                                        <button
                                            onClick={step === 'payment' ? handleSubmitOrder : handleNextStep}
                                            disabled={loading || (step === 'details' && (!formData.name || !formData.phone || !formData.address))}
                                            className="py-4 rounded-sm bg-[#FF7A21] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#E6691A] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {loading ? 'Processing...' : (
                                                <>
                                                    {step === 'payment' ? 'Complete Payment' : 'Next'}
                                                    <ArrowRight size={14} />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    <p className="text-[10px] text-center text-[#A0958F] italic leading-tight">
                                        {step === 'cart' && '* Add your details in the next step to complete your order.'}
                                        {step === 'details' && '* Your information is used only for delivery purposes.'}
                                        {step === 'payment' && '* Complete the simulated scan to finalize your order!'}
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
