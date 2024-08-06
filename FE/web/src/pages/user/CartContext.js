
import React, { createContext, useState } from 'react';
import Swal from 'sweetalert2';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [reservations, setReservations] = useState([]);

    const addToCart = (newItem) => {
        if (cart.length > 0 && cart[0].locker_body_id !== newItem.locker_body_id) {
            Swal.fire({
                title: '다른 사물함의 물품을 추가할 수 없습니다.',
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: '확인',
            });
            return;
        }

        setCart([...cart, newItem]);
        
    };

    return (
        <CartContext.Provider value={{ cart, setCart, reservations, setReservations, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

