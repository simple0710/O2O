import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [reservations, setReservations] = useState([]);

    return (
        <CartContext.Provider value={{ cart, setCart, reservations, setReservations}}>
            {children}
        </CartContext.Provider>
    );
};
