import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Add, NewReleases } from '@mui/icons-material';
import Typography from '@mui/material/Typography'; // @mui/material에서 Typography 가져오기
import { useNavigate } from 'react-router-dom';
import '../styles/ServiceSelection.css';

const ServiceSelection = () => {
  const navigate = useNavigate();

  const register = () => {
    navigate('/ItemRegistration');
  };

  const quan = () => {
    navigate('/QuantityChange')
  }
  return (
    <div className='frame-container'>
      <Container className="service-container">
      <Typography variant="h6" component="h2" className="title" gutterBottom>
        원하는 서비스를 선택해주세요
      </Typography>
      <Row className="justify-content-center">
        <Col xs={5} className="d-flex justify-content-center mb-3">
          <Button className="service-button" onClick={quan}>
            <Add /> 수량 변경
          </Button>
        </Col>
        <Col xs={5} className="d-flex justify-content-center mb-3">
          <Button className="service-button" onClick={register}>
            <NewReleases /> 물품 등록
          </Button>
        </Col>
      </Row>
      </Container>
    </div>
  );
};

export default ServiceSelection;
