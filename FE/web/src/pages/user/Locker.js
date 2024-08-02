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
  const [modalContent, setModalContent] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [warning, setWarning] = useState("");
  const { cart, setCart } = useContext(CartContext);
  const [lockersData, setLockersData] = useState([]);
  const [selectedLockerBody, setSelectedLockerBody] = useState(null);
  const [lockerOptions, setLockerOptions] = useState([]);
  const [additionalLockersData, setAdditionalLockersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const lockerBodyId = queryParams.get('locker_body_id');

    axios
      .get("/lockers/names")
      .then((response) => {
        const data = response.data.data;
        setLockersData(data);

        const options = data.map((lockerBody) => ({
          value: lockerBody.locker_body_name,
          label: lockerBody.locker_body_name,
          id: lockerBody.locker_body_id,
        }));
        setLockerOptions(options);

        const initialSelectedBody = lockerBodyId 
          ? data.find(body => body.locker_body_id.toString() === lockerBodyId) 
          : data[0];

        if (initialSelectedBody) {
          setSelectedLockerBody(initialSelectedBody);
          fetchLockerDetails(initialSelectedBody.locker_body_id);
        }
      })
      .catch((error) => console.error("Failed to load locker data:", error));
  }, [location.search]);

  const fetchLockerDetails = (bodyId) => {
    setLoading(true);
    axios
      .get(`/lockers?locker_body_id=${bodyId}`)
      .then((response) => {
        const lockers = response.data.data;
        setLockerDetails(lockers);
      })
      .catch((error) => console.error("Failed to load locker details:", error))
      .finally(() => setLoading(false));
  };

  const setLockerDetails = (details) => {
    setAdditionalLockersData(details);
  };

  const handleLockerChange = (event) => {
    const lockerBodyName = event.target.value;
    const selectedBody = lockersData.find(
      (body) => body.locker_body_name === lockerBodyName
    );
    setSelectedLockerBody(selectedBody);

    if (selectedBody) {
      setLoading(true); // Show spinner on locker change
      setTimeout(() => {
        fetchLockerDetails(selectedBody.locker_body_id);
      }, 600);
    }
  };

  const renderTable = () => {
    if (!selectedLockerBody) return null;

    const { row, column } = selectedLockerBody;

    const table = Array.from({ length: row }, () =>
      Array.from({ length: column }).fill(null)
    );

    additionalLockersData.forEach((locker) => {
      if (locker.body_id === selectedLockerBody.locker_body_id) {
        const { locker_row, locker_column, product_nm, total_cnt, product_cnt } = locker;
        table[locker_row - 1][locker_column - 1] = {
          product_nm,
          total_cnt,
          product_cnt,
        };
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
                    <div
                      className="rounded-content"
                      onClick={() => handleShow(cell)}
                    >
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
    if (item) {
      setSelectedItem(item);
      setQuantity(0);
      setModalContent(item.product_nm);
      setWarning("");
      setShow(true);
    }
  };

  const handleAddToCart = () => {
    if (quantity > 0 && selectedItem) {
      const existingItemIndex = cart.findIndex(
        (item) => item.name === modalContent
      );
      const existingQuantity =
        existingItemIndex >= 0 ? cart[existingItemIndex].quantity : 0;
      const totalQuantity = existingQuantity + quantity;

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
        const itemDetails = { name: modalContent, quantity };

        if (existingItemIndex >= 0) {
          const updatedCart = cart.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
          setCart(updatedCart);
        } else {
          setCart((prevCart) => [...prevCart, itemDetails]);
        }

        const updatedLockersData = additionalLockersData.map((item) => {
          if (item.product_nm === selectedItem.product_nm) {
            return {
              ...item,
              product_cnt: item.product_cnt - quantity,
            };
          }
          return item;
        });
        setAdditionalLockersData(updatedLockersData);
        setShow(false);
      }
    } else {
      setWarning("수량을 선택해주세요.");
    }
  };

  const handleIncrease = () => {
    if (quantity < selectedItem.product_cnt) {
      setQuantity((prevQuantity) => prevQuantity + 1);
      setWarning("");
    }
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <div className="outer-box">
      <select onChange={handleLockerChange} className="locker-select" value={selectedLockerBody ? selectedLockerBody.locker_body_name : ''}>
        {lockerOptions.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {loading ? (
        <ScaleLoader 
        color='lightblue'
        size='50' />
      ) : (
        selectedLockerBody && <div>{renderTable()}</div>
      )}

      {selectedItem && (
        <Modal show={show} onHide={() => setShow(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>{modalContent} 예약하기</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>현재 선택된 수량: {quantity}개</p>
            <div className="quantity-controls">
              <Button variant="outline-primary" onClick={handleDecrease}>
                -
              </Button>
              <span>{quantity}</span>
              <Button variant="outline-primary" onClick={handleIncrease}>
                +
              </Button>
            </div>
            {warning && <p className="text-danger">{warning}</p>}
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
};

export default Locker;
