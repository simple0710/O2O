import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/MainPageApp.css";
import "../../style/Locker.css";
import { Modal, Button, Table } from "react-bootstrap";
import { CartContext } from "./CartContext";
import Swal from "sweetalert2";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';
import axiosInstance from '../../utils/axiosInstance'
import ButtonComponent from "../../components/ButtonComponent";

const Locker = () => {
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const { cart, setCart, addToCart } = useContext(CartContext); // Update useContext to include addToCart
  const [lockersData, setLockersData] = useState([]);
  const [selectedLockerBody, setSelectedLockerBody] = useState(null);
  const [additionalLockersData, setAdditionalLockersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [firstLockerBodyId, setFirstLockerBodyId] = useState(null); // 상태 변수 추가
  
  useEffect(() => {
    const fetchLockerData = async () => {
      try {
        const response = await axiosInstance.get("/lockers/names");
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
      const response = await axiosInstance.get(`/lockers?locker_body_id=${bodyId}`);
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
  
    // 테이블을 동적으로 생성
    const table = Array(selectedLockerBody.row)
      .fill()
      .map(() => Array(selectedLockerBody.column).fill(null));
  
    // 추가적인 락커 데이터를 테이블 셀에 배치
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
                      <div className='user-spinner'>
                        <ScaleLoader 
                          color='gray'
                          size='50'
                        />
                      </div>
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

  const handleAddToCart = () => {
    if (quantity > 0 && selectedItem) {
      const existingItem = cart.find(item => 
        item.name === selectedItem.product_nm &&
        item.location.locker_body_id === selectedLockerBody.locker_body_id
      );
  
      if (existingItem) {
        const totalQuantity = existingItem.quantity + quantity;
  
        if (totalQuantity > selectedItem.product_cnt) {
          Swal.fire({
            title: "재고가 부족합니다.",
            text: "장바구니에 물품이 있는지 확인해주세요.",
            icon: "warning",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "확인",
          });
        } else {
          const updatedItem = {
            ...existingItem,
            quantity: totalQuantity,
            location: {
              lockerBody: selectedLockerBody.locker_body_name,
              row: selectedItem.locker_row,
              column: selectedItem.locker_column,
              locker_body_id: selectedLockerBody.locker_body_id
            }
          };
          setCart(prevCart => 
            prevCart.map(item => item.name === selectedItem.product_nm && item.location.locker_body_id === selectedLockerBody.locker_body_id
              ? updatedItem
              : item
            )
          );
          setAdditionalLockersData(prevData =>
            prevData.map(item => item.product_nm === selectedItem.product_nm
              ? { ...item, product_cnt: item.product_cnt - quantity }
              : item
            )
          );
          setShow(false);
        }
      } else {
        const newItem = {
          name: selectedItem.product_nm,
          quantity,
          location: {
            lockerBody: selectedLockerBody.locker_body_name,
            row: selectedItem.locker_row,
            column: selectedItem.locker_column,
            locker_body_id: selectedLockerBody.locker_body_id
          },
          product_id: selectedItem.product_id,
          locker_id: additionalLockersData.find(locker => locker.product_id === selectedItem.product_id)?.locker_id || null
        };
        addToCart(newItem);
        setFirstLockerBodyId(selectedLockerBody.locker_body_id);
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

  const handleCancel = (productId, quantity) => {
    // Find the locker item with the given productId
    const lockerItem = additionalLockersData.find(item => item.product_id === productId);
    
    if (lockerItem) {
      // Update locker data to reflect the returned quantity
      setAdditionalLockersData(prevData =>
        prevData.map(item =>
          item.product_id === productId
            ? { ...item, product_cnt: item.product_cnt + quantity }
            : item
        )
      );
    }
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
            <ScaleLoader color='gray' size={50} />
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
              <ButtonComponent onClick={handleDecrease} style={{ marginRight: '10px' }}>-</ButtonComponent>
              <span>{quantity}</span>
              <ButtonComponent onClick={handleIncrease} style={{ marginLeft: '10px' }}>+</ButtonComponent>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <ButtonComponent onClick={handleAddToCart}>담기</ButtonComponent>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Locker;
