import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/MainPageApp.css";
import "../../style/Locker.css";
import { Modal, Button } from "react-bootstrap";
import { CartContext } from "./CartContext";
import Swal from "sweetalert2";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';

const Locker = () => {
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const { cart, setCart } = useContext(CartContext);
  const [lockersData, setLockersData] = useState([]);
  const [selectedLockerBody, setSelectedLockerBody] = useState(null);
  const [additionalLockersData, setAdditionalLockersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchLockerData = async () => {
      try {
        const response = await axios.get("/lockers/names");
        const data = response.data.data;
        setLockersData(data);
        const queryParams = new URLSearchParams(window.location.search);
        const lockerBodyId = queryParams.get('locker_body_id');
        const initialSelectedBody = lockerBodyId 
          ? data.find(body => body.locker_body_id.toString() === lockerBodyId) 
          : data[0];
        
        if (initialSelectedBody) {
          setSelectedLockerBody(initialSelectedBody);
          fetchLockerDetails(initialSelectedBody.locker_body_id);
        }
      } catch (error) {
        console.error("Failed to load locker data:", error);
      }
    };

    fetchLockerData();
  }, [location.search]);

  const fetchLockerDetails = async (bodyId) => {
    setLoading(true);
    try {
      const response = await axios.get(`/lockers?locker_body_id=${bodyId}`);
      setAdditionalLockersData(response.data.data);
      console.log(response.data.data)
    } catch (error) {
      console.error("Failed to load locker details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLockerChange = (event) => {
    const lockerBodyName = event.target.value;
    const selectedBody = lockersData.find(body => body.locker_body_name === lockerBodyName);
    setSelectedLockerBody(selectedBody);
    if (selectedBody) {
      fetchLockerDetails(selectedBody.locker_body_id);
    }
  };

  const renderTable = () => {
    if (!selectedLockerBody) return null;

    const table = Array(selectedLockerBody.row).fill().map(() => Array(selectedLockerBody.column).fill(null));

    additionalLockersData.forEach((locker) => {
      if (locker.body_id === selectedLockerBody.locker_body_id) {
        table[locker.locker_row - 1][locker.locker_column - 1] = locker;
      }
    });

    return (
      <table className="locker-table">
        <tbody>
          {table.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex} className="locker-cell">
                  {cell ? (
                    <div className="rounded-content" onClick={() => handleShow(cell)}>
                      <div>{cell.product_nm}</div>
                      <div>({cell.product_cnt}/{cell.total_cnt})</div>
                    </div>
                  ) : (
                    <div className="rounded-content">
                      <div>none</div>
                      <div>0/0</div>
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const handleShow = (item) => {
    setSelectedItem(item);
    setQuantity(0);
    setShow(true);
  };

  // const handleAddToCart = () => {
  //   if (quantity > 0 && selectedItem) {
  //     const existingItem = cart.find(item => item.name === selectedItem.product_nm);
  //     const totalQuantity = (existingItem ? existingItem.quantity : 0) + quantity;

  //     if (totalQuantity > selectedItem.product_cnt) {
  //       Swal.fire({
  //         title: "재고가 부족합니다.",
  //         text: "장바구니에 물품이 있는지 확인해주세요.",
  //         icon: "warning",
  //         confirmButtonColor: "#3085d6",
  //         confirmButtonText: "확인",
  //       });
  //       setShow(false);
  //     } else {
        
  //       const updatedCart = existingItem
  //         ? cart.map(item => item.name === selectedItem.product_nm 
  //             ? { ...item, quantity: totalQuantity,
  //                location: { lockerBody: selectedLockerBody.locker_body_name, row: selectedItem.locker_row, column: selectedItem.locker_column,  locker_body_id: selectedLockerBody.locker_body_id  }, 
  //               product_id: selectedItem.product_id,
  //               locker_id: additionalLockersData.locker_id } 
  //             : item
  //           )
  //         : [...cart, { 
  //             name: selectedItem.product_nm, 
  //             quantity, 
  //             location: { lockerBody: selectedLockerBody.locker_body_name, row: selectedItem.locker_row, column: selectedItem.locker_column, locker_body_id: selectedLockerBody.locker_body_id },
  //             product_id: selectedItem.product_id,
  //             locker_id: additionalLockersData.locker_id
  //           }];

  //       setCart(updatedCart);
  //       setAdditionalLockersData(prevData =>
  //         prevData.map(item => item.product_nm === selectedItem.product_nm
  //           ? { ...item, product_cnt: item.product_cnt - quantity }
  //           : item
  //         )
  //       );
  //       setShow(false);
  //     }
  //   }
  // };


  const handleAddToCart = () => {
    if (quantity > 0 && selectedItem) {
      const existingItem = cart.find(item => item.name === selectedItem.product_nm);
      const totalQuantity = (existingItem ? existingItem.quantity : 0) + quantity;
  
      if (totalQuantity > selectedItem.product_cnt) {
        Swal.fire({
          title: "재고가 부족합니다.",
          text: "장바구니에 물품이 있는지 확인해주세요.",
          icon: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "확인",
        });
        setShow(false);
      } else {
        const locker = additionalLockersData.find(locker => locker.product_id === selectedItem.product_id);
        
        const updatedCart = existingItem
          ? cart.map(item => item.name === selectedItem.product_nm 
              ? { 
                  ...item, 
                  quantity: totalQuantity,
                  location: { 
                    lockerBody: selectedLockerBody.locker_body_name, 
                    row: selectedItem.locker_row, 
                    column: selectedItem.locker_column,  
                    locker_body_id: selectedLockerBody.locker_body_id  
                  }, 
                  product_id: selectedItem.product_id,
                  locker_id: locker ? locker.locker_id : null // Updated line
                } 
              : item
            )
          : [...cart, { 
              name: selectedItem.product_nm, 
              quantity, 
              location: { 
                lockerBody: selectedLockerBody.locker_body_name, 
                row: selectedItem.locker_row, 
                column: selectedItem.locker_column, 
                locker_body_id: selectedLockerBody.locker_body_id 
              },
              product_id: selectedItem.product_id,
              locker_id: locker ? locker.locker_id : null // Updated line
            }];
  
        setCart(updatedCart);
        setAdditionalLockersData(prevData =>
          prevData.map(item => item.product_nm === selectedItem.product_nm
            ? { ...item, product_cnt: item.product_cnt - quantity }
            : item
          )
        );
        setShow(false);
      }
    }
  };
  
  const handleIncrease = () => {
    if (quantity < selectedItem.product_cnt) setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 0) setQuantity(quantity - 1);
  };

  return (
    <div className="outer-box">
      <select onChange={handleLockerChange} className="locker-select" value={selectedLockerBody ? selectedLockerBody.locker_body_name : ''}>
        {lockersData.map((lockerBody) => (
          <option key={lockerBody.locker_body_id} value={lockerBody.locker_body_name}>
            {lockerBody.locker_body_name}
          </option>
        ))}
      </select>

      <div className="table-container">
        {loading ? (
          <div className="spinner">
            <ScaleLoader color='lightblue' size={50} />
          </div>
        ) : (
          renderTable()
        )}
      </div>

      {selectedItem && (
        <Modal show={show} onHide={() => setShow(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedItem.product_nm} 예약하기</Modal.Title>
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
            <Button variant="secondary" onClick={handleAddToCart}>담기</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Locker;
