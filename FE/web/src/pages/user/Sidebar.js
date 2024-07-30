import React, { useContext, useEffect, useState } from 'react';
import '../../style/Sidebar.css'; 
import { CartContext } from './CartContext';
import Swal from 'sweetalert2';

function Sidebar() {
    const { cart, setCart, reservations, setReservations } = useContext(CartContext);
    const [updatedReservations, setUpdatedReservations] = useState([]);

    const notRefund = [
        { name: "가위", quantity: 4 },
        { name: "풀", quantity: 5 },
    ];

    const register = [
        { name: "풀", quantity: 5 },
        { name: "잉크", quantity: 5 }
    ];

    const recent = [
        { name: "가위", quantity: 4 },
        { name: "잉크", quantity: 5 }
    ];

    const addToCart = (item) => {
        const existingItemIndex = cart.findIndex(cartItem => cartItem.name === item.name);
        const existingQuantity = existingItemIndex >= 0 ? cart[existingItemIndex].quantity : 0;
        const totalQuantity = existingQuantity + item.quantity;

        if (totalQuantity > item.quantity) {
            Swal.fire({
                title: "재고가 부족합니다.",
                text: "장바구니에 물품이 있는지 확인해주세요.",
                icon: "warning",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "확인",
            });
        } else {
            if (existingItemIndex >= 0) {
                const updatedCart = cart.map((cartItem, index) =>
                    index === existingItemIndex ? { ...cartItem, quantity: totalQuantity } : cartItem
                );
                setCart(updatedCart);
            } else {
                setCart(prevCart => [...prevCart, { ...item, quantity: totalQuantity }]);
            }
        }
    };

    const formatRemainingTime = (remainingTime) => {
        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
        return `${days}일 ${hours}시간 ${minutes}분 ${seconds}초`;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setReservations(prevReservations =>
                prevReservations
                    .map(reservation => {
                        const remainingTime = Math.max(0, new Date(reservation.date) - new Date());
                        return { ...reservation, remainingTime };
                    })
                    .filter(reservation => reservation.remainingTime > 0)
            );
        }, 1000);

        return () => clearInterval(interval);
    }, [setReservations]);

    useEffect(() => {
        setUpdatedReservations(reservations);
    }, [reservations]);

    return (
        <div className="side-bar">
            <div>
                미반납 물품
                <ul>
                    {notRefund.map((item, index) => (
                        <li key={index}>{item.name}</li>
                    ))}
                </ul>
            </div>
            <hr />
            <div>
                예약 물품
                    {updatedReservations.map((reservation, index) => (
                        <ul key={index}>
                             <li>
                            {reservation.items.map((item, itemIndex) => (
                                <div key={itemIndex}>
                                   
                                    {item.name} - {item.quantity}개
                                    남은 시간: {formatRemainingTime(reservation.remainingTime)}
                                   
                                </div>
                            ))}
                             </li>
                        </ul>
                    ))}
                
            </div>
            <hr />
            <div>
                최근 대여 물품
                <ul>
                    {recent.map((item, index) => (
                        <li key={index}>
                            {item.name} {item.quantity}개 
                            <button className='btn' onClick={() => addToCart(item)}>담기</button>
                        </li>
                    ))}
                </ul>
            </div>
            <hr />
        </div>
    );
}

export default Sidebar;
