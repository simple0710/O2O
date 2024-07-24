import React from 'react';
import '../../style/MainPageApp.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form } from 'react-bootstrap';

const Modals = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>물품 요청하기</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>물품 명</Form.Label>
          <Form.Control placeholder="요청 물품 명을 적어주세요." />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>신청 사유</Form.Label>
          <Form.Control placeholder="물품 신청 사유를 적어주세요." />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>물품 링크</Form.Label>
          <Form.Control placeholder="물품 신청 사유를 적어주세요." />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>물품 개수</Form.Label>
          <Form.Control placeholder="물건 개수를 입력해주세요.(숫자만 입력해주세요)" />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          확인
        </Button>
        <Button variant="primary" onClick={handleClose}>
          취소
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Modals;
