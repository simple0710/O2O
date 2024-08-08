import React from 'react'
import Instruction from '../components/returnstatus/Instruction';
import ItemList from '../components/returnstatus/ItemList';
import Camera from '../components/returnstatus/Camera';
import Button from '../components/returnstatus/Button';
import '../styles/returnstatus/returnstatus.css';
import { useNavigate } from 'react-router-dom';



function ReturnStatus(){
	const navigate = useNavigate();
    return(
		<div className='frame-container'>
			<button className="btn-main" onClick={() => navigate('/')}>
          HOME
      </button>
		<Instruction/>
	
		<Camera/>
	
		<ItemList/>
	
		<Button/>
		</div>	
    )
}


export default ReturnStatus;