import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer id="contact" className="bg-[#1A1614] text-white pt-24 pb-12 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                {/* Brand */}
                <div className="space-y-6">
                    <div className="text-3xl font-playfair font-bold">
                        <span>Grand</span>{' '}
                        <span className="text-[#FF7A21]">Ashoka</span>
                    </div>
                    <p className="text-[#DCD6C8]/60 text-sm leading-relaxed max-w-xs">
                        Experience the true essence of Indian hospitality. A tradition of
                        refined flavours served with passion and architectural elegance.
                    </p>
                    <div className="flex gap-4">
                        {[Instagram, Facebook, Twitter].map((Icon, i) => (
                            <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#FF7A21] hover:border-[#FF7A21] transition-all duration-300">
                                <Icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-lg font-playfair font-bold mb-8 text-[#FF7A21]">Quick Links</h4>
                    <ul className="space-y-4">
                        {['Home', 'About Our Story', 'Menu Selections', 'Gallery', 'Private Dining'].map((link) => (
                            <li key={link}>
                                <a href={`#${link.toLowerCase().split(' ')[0]}`} className="text-[#DCD6C8]/60 hover:text-[#FF7A21] transition-colors text-sm">
                                    {link}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="text-lg font-playfair font-bold mb-8 text-[#FF7A21]">Contact us</h4>
                    <ul className="space-y-6">
                        <li className="flex gap-4 items-start">
                            <MapPin className="text-[#FF7A21] shrink-0" size={20} />
                            <span className="text-[#DCD6C8]/60 text-sm">Manama, Bahrain</span>
                        </li>
                        <li className="flex gap-4 items-center">
                            <Phone className="text-[#FF7A21] shrink-0" size={20} />
                            <span className="text-[#DCD6C8]/60 text-sm">+973 1727 8686</span>
                        </li>
                        <li className="flex gap-4 items-center">
                            <Mail className="text-[#FF7A21] shrink-0" size={20} />
                            <span className="text-[#DCD6C8]/60 text-sm underline">hello@grandashokabahrain.com</span>
                        </li>
                    </ul>
                </div>

                {/* Opening Hours */}
                <div>
                    <h4 className="text-lg font-playfair font-bold mb-8 text-[#FF7A21]">Opening Hours</h4>
                    <ul className="space-y-4">
                        <li className="flex justify-between text-sm">
                            <span className="text-[#DCD6C8]/60">Sun - Thu</span>
                            <span className="text-white font-medium">12:00 PM - 11:00 PM</span>
                        </li>
                        <li className="flex justify-between text-sm">
                            <span className="text-[#DCD6C8]/60">Fri - Sat</span>
                            <span className="text-white font-medium">12:00 PM - 12:00 AM</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-xs text-[#DCD6C8]/40">
                    © 2025 The Grand Ashoka. All rights reserved.
                </p>
                <div className="flex gap-8 text-xs text-[#DCD6C8]/40">
                    <a href="#" className="hover:text-white">Privacy Policy</a>
                    <a href="#" className="hover:text-white">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
}
