import React, { useState, useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Dropdown } from "react-bootstrap";
import "../../style/MainPageApp.css";
import { Link } from "react-router-dom";
import Profile from "../../images/profile.png";
import Locker from "./Locker";
import Sidebar from "./Sidebar";
import Cart from "./Cart";
import Modals from "./Modals";
import { ReservationProvider } from "./ReservationContext";
import Swal from "sweetalert2";
import Nav from "./Nav";

function MainPage() {
  const [show, setShow] = useState(false);
  const [modalCloseConfirmed, setModalCloseConfirmed] = useState(false);

  const handleShow = () => {
    setShow(true);
    document.body.style.overflow = "hidden"; // 모달 팝업시 배경 움직이지 않도록
  };

  // 확인 버튼 클릭 시만 SweetAlert를 트리거
  const handleClose = (confirmed) => {
    setShow(false);
    document.body.style.overflow = "hidden";
    if (confirmed) {
      setModalCloseConfirmed(true);
    }
  };

  useEffect(() => {
    if (modalCloseConfirmed) {
      Swal.fire({
        title: "요청이 접수되었습니다.",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
      setModalCloseConfirmed(false); // Reset after showing the alert
    }
  }, [modalCloseConfirmed]);

  return (
    <div>
      <Nav />
      <div className="content-container">
        <Sidebar />
        <div className="content">
          <Locker />

          <div className="cart">
            <Cart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
