// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Modal, Button } from 'react-bootstrap';
// import '../../MainPageApp.css';
// import '../../Locker.css';
// import Cart from '../user/Cart'; // Cart 컴포넌트의 경로를 수정하세요.

// const Locker = () => {
//     const [show, setShow] = useState(false);
//     const [modalContent, setModalContent] = useState('');
//     const [selectedItem, setSelectedItem] = useState(null);
//     const [quantity, setQuantity] = useState(0);
//     const [cart, setCart] = useState([]);

//     const handleClose = () => {
//         const itemDetails = [{ name: modalContent, quantity }];
//         console.log(itemDetails);
//         setShow(false);
//     };

//     const handleShow = (item) => {
//         setSelectedItem(item);
//         setQuantity(0); // 수량을 0으로 초기화
//         setModalContent(item.name);
//         setShow(true);
//     };

//     const tableData = [
//         [
//             { name: "가위", quantity: 4 },
//             { name: "풀", quantity: 5 },
//             { name: "잉크", quantity: 5 }
//         ],
//         [
//             { name: "종이", quantity: 5 },
//             { name: "핸드크림", quantity: 5 },
//             { name: "이어폰", quantity: 5 }
//         ],
//         [
//             { name: "주스", quantity: 5 },
//             { name: "핸드폰", quantity: 5 },
//             { name: "과자", quantity: 5 }
//         ]
//     ];

//     const handleIncrease = () => {
//         if (quantity < selectedItem.quantity) {
//             setQuantity(prevQuantity => prevQuantity + 1);
//         }
//     };

//     const handleDecrease = () => {
//         if (quantity > 0) {
//             setQuantity(prevQuantity => prevQuantity - 1);
//         }
//     };

//     const handleAddToCart = () => {
//         if (quantity > 0 && selectedItem) {
//             setCart(prevCart => [...prevCart, { name: modalContent, quantity }]);
//             handleClose(); // 모달 닫기
//         }
//     };

//     return (
//         <div className="outer-box">
//             <p>사물함</p>
//             <table className="responsive-table">
//                 <tbody>
//                     {tableData.map((row, rowIndex) => (
//                         <tr key={rowIndex}>
//                             {row.map((cell, cellIndex) => (
//                                 <td key={cellIndex} onClick={() => handleShow(cell)}>
//                                     {cell.name} ({cell.quantity}개)
//                                 </td>
//                             ))}
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {selectedItem && (
//                 <Modal 
//                     show={show} 
//                     onHide={handleClose} 
//                     centered
//                 >
//                     <Modal.Header closeButton>
//                         <Modal.Title>{modalContent} 예약하기</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <p>현재 선택된 수량: {quantity}개</p>
//                         <div className="quantity-controls">
//                             <Button variant="outline-primary" onClick={handleDecrease}>-</Button>
//                             <span>{quantity}</span>
//                             <Button variant="outline-primary" onClick={handleIncrease}>+</Button>
//                         </div>
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={handleAddToCart}>
//                             담기
//                         </Button>
//                     </Modal.Footer>
//                 </Modal>
//             )}
//         </div>
//     );
// }

// export default Locker;


// Locker.js
import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import '../../MainPageApp.css';
import '../../Locker.css';
import { CartContext } from './CartContext'; // CartContext 경로를 수정하세요.

const Locker = () => {
    const [show, setShow] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const { cart, setCart } = useContext(CartContext);

    const handleClose = () => {
        const itemDetails = { name: modalContent, quantity };
        console.log(itemDetails);
        setCart(prevCart => [...prevCart, itemDetails]);
        setShow(false);
    };

    const handleShow = (item) => {
        setSelectedItem(item);
        setQuantity(0); // 수량을 0으로 초기화
        setModalContent(item.name);
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
        }
    };

    const handleDecrease = () => {
        if (quantity > 0) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const handleAddToCart = () => {
        if (quantity > 0 && selectedItem) {
            handleClose(); // 모달 닫기
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
                    onHide={handleClose} 
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
