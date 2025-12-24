'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type CartItem = {
    name: string;
    price: string;
    quantity: number;
};

type CartContextType = {
    items: CartItem[];
    addItem: (item: { name: string; price: string }) => void;
    removeItem: (name: string) => void;
    updateQuantity: (name: string, delta: number) => void;
    clearCart: () => void;
    totalCount: number;
    totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = (item: { name: string; price: string }) => {
        setItems(prev => {
            const existing = prev.find(i => i.name === item.name);
            if (existing) {
                return prev.map(i => i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const removeItem = (name: string) => {
        setItems(prev => prev.filter(i => i.name !== name));
    };

    const updateQuantity = (name: string, delta: number) => {
        setItems(prev => prev.map(i => {
            if (i.name === name) {
                const newQty = Math.max(0, i.quantity + delta);
                return { ...i, quantity: newQty };
            }
            return i;
        }).filter(i => i.quantity > 0));
    };

    const clearCart = () => setItems([]);

    const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => {
        const price = parseFloat(item.price);
        return sum + (isNaN(price) ? 0 : price * item.quantity);
    }, 0);

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalCount, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
