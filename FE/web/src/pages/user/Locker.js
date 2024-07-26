import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../style/MainPageApp.css';
import '../../style/Locker.css';
import { Modal, Button } from 'react-bootstrap';
import { CartContext } from './CartContext'; // CartContext 경로를 수정하세요.
import Swal from 'sweetalert2'


const Locker = () => {
    const [show, setShow] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [warning, setWarning] = useState(''); // 경고 메시지 상태 추가
    const { cart, setCart } = useContext(CartContext);

    const handleCloseWithoutAddToCart = () => {
        setShow(false);
    };

    const handleAddToCart = () => {
        if (quantity > 0 && selectedItem) {

            const existingItemIndex = cart.findIndex(item => item.name === modalContent);
            const existingQuantity = existingItemIndex >= 0 ? cart[existingItemIndex].quantity : 0;
            const totalQuantity = existingQuantity + quantity;

            if (totalQuantity  > selectedItem.quantity) {
                Swal.fire({
                    title: "재고가 부족합니다.",
                    text: "장바구니에 물품이 있는지 확인해주세요.",
                    icon: "warning",
                    
                    confirmButtonColor: "#3085d6", //빨간색
                    confirmButtonText: "확인",
                  });
                setShow(false);
            } else {
                const itemDetails = { name: modalContent, quantity };

                if (existingItemIndex >= 0) {
                    const updatedCart = cart.map((item, index) =>
                        index === existingItemIndex ? { ...item, quantity: item.quantity + quantity } : item
                    );
                    setCart(updatedCart);
                } else {
                    setCart(prevCart => [...prevCart, itemDetails]);
                }
                setShow(false);
            }
        } else {
            setWarning('수량을 선택해주세요.');
        }
    };

    const handleShow = (item) => {
        setSelectedItem(item);
        setQuantity(0); // 수량을 0으로 초기화
        setModalContent(item.name);
        setWarning('') // 경고 메세지 초기화
        setShow(true);
    };

    const tableData = [
        [
            { name: "가위", quantity: 4 },
            { name: "풀", quantity: 5 },
            { name: "잉크", quantity: 5 }
        ],
        [
            { name: "종이", quantity: 5 },
            { name: "핸드크림", quantity: 5 },
            { name: "이어폰", quantity: 5 }
        ],
        [
            { name: "주스", quantity: 5 },
            { name: "핸드폰", quantity: 5 },
            { name: "과자", quantity: 5 }
        ]
    ];

    const handleIncrease = () => {
        if (quantity < selectedItem.quantity) {
            setQuantity(prevQuantity => prevQuantity + 1);
            setWarning('')
        }
    };

    const handleDecrease = () => {
        if (quantity > 0) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    return (
        <div className="outer-box">
            <p>사물함</p>
            <table className="responsive-table">
                <tbody>
                    {tableData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} onClick={() => handleShow(cell)}>
                                    {cell.name} ({cell.quantity}개)
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedItem && (
                <Modal 
                    show={show} 
                    onHide={handleCloseWithoutAddToCart} 
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{modalContent} 예약하기</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>현재 선택된 수량: {quantity}개</p>
                        <div className="quantity-controls">
                            <Button variant="outline-primary" onClick={handleDecrease}>-</Button>
                            <span>{quantity}</span>
                            <Button variant="outline-primary" onClick={handleIncrease}>+</Button>
                        </div>
                        {warning && <p className="text-danger">{warning}</p>} {/* 경고 메시지 표시 */}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleAddToCart}>
                            담기
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
}

export default Locker;
