// import React, { useContext } from 'react';
// import '../../Cart.css';
// import { CartContext } from './CartContext'; // CartContext 경로를 수정하세요.

// const Cart = () => {
//     const { cart, setCart } = useContext(CartContext);

//     const handleReservation = () => {
//         console.log(cart);
//         setCart([]); // 장바구니 초기화
//     };

//     const handleCancel = () => {
//         setCart([]); // 장바구니 초기화
//     };

//     return (
//         <div className='outer-box'>
//             <p>장바구니</p>
//             <div className="cart-container">
//                 <div className="cart-content">
//                     {cart.length > 0 ? (
//                         <div className="cart-items">
//                             {cart.map((item, index) => (
//                                 <div key={index} className="cart-item">
//                                     {item.name} <br/>
//                                     {item.quantity}개
//                                 </div>
//                             ))}
//                         </div>
//                     ) : (
//                         <p>장바구니가 비어 있습니다.</p>
//                     )}
//                 </div>
//                 <div className="cart-buttons">
//                     <button className="cart-button" onClick={handleReservation}>예약하기</button>
//                     <button className="cart-button cancel" onClick={handleCancel}>취소</button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Cart;



import React, { useState, useContext } from 'react';
import '../../Cart.css';
import { CartContext } from './CartContext'; // CartContext 경로를 수정하세요.
import { Modal, Button } from 'react-bootstrap';

const Cart = () => {
    const { cart, setCart } = useContext(CartContext);
    const [show, setShow] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [quantity, setQuantity] = useState(0);

    const handleReservation = () => {
        console.log(cart);
        setCart([]); // 장바구니 초기화
    };

    const handleCancel = () => {
        setCart([]); // 장바구니 초기화
    };

    const handleShow = (item) => {
        setSelectedItem(item);
        setQuantity(item.quantity); // 수량을 현재 수량으로 설정
        setModalContent(item.name);
        setShow(true);
    };

    const handleClose = () => {
        if (selectedItem) {
            const updatedCart = cart.map((item) =>
                item.name === selectedItem.name ? { ...item, quantity } : item
            );
            setCart(updatedCart);
        }
        setShow(false);
    };

    const handleRemoveItem = (index) => {
        setCart(cart.filter((_, i) => i !== index));
    };

    const handleIncrease = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 0) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    return (
        <div className='outer-box'>
            <p>장바구니</p>
            <div className="cart-container">
                <div className="cart-content">
                    {cart.length > 0 ? (
                        <div className="cart-items">
                            {cart.map((item, index) => (
                                <div key={index} className="cart-item">
                                    <span onClick={() => handleShow(item)}>
                                        {item.name} <br />
                                        {item.quantity}개
                                    </span>
                                    <button className="remove-button" onClick={() => handleRemoveItem(index)}>x</button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>장바구니가 비어 있습니다.</p>
                    )}
                </div>
                <div className="cart-buttons">
                    <button className="cart-button" onClick={handleReservation}>예약하기</button>
                    <button className="cart-button cancel" onClick={handleCancel}>취소</button>
                </div>
            </div>

            {selectedItem && (
                <Modal
                    show={show}
                    onHide={handleClose}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{modalContent} 수량 조절</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>현재 선택된 수량: {quantity}개</p>
                        <div className="quantity-controls">
                            <Button variant="outline-primary" onClick={handleDecrease}>-</Button>
                            <span>{quantity}</span>
                            <Button variant="outline-primary" onClick={handleIncrease}>+</Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            확인
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
}

export default Cart;
