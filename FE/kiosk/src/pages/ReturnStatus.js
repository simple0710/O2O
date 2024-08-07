import React from 'react'
import Instruction from '../components/returnstatus/Instruction';
import ItemList from '../components/returnstatus/ItemList';
import Camera from '../components/returnstatus/Camera';
import Button from '../components/returnstatus/Button';
import '../styles/returnstatus/returnstatus.css';
import { useNavigate } from 'react-router-dom';
import New from '../components/returnstatus/New';



function ReturnStatus(){
	const navigate = useNavigate();
    return(
		<div className='frame-container'>
			<button className="btn-main" onClick={() => navigate('/')}>
          메인 페이지
      </button>
		<Instruction/>
	
		<Camera/>
		
		<New />
		{/* <ItemList/>
	
		<Button/> */}
		</div>	
    )
}


export default ReturnStatus;