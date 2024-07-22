import React from 'react'
import Instruction from '../components/returnstatus/Instruction';
import ItemList from '../components/returnstatus/ItemList';
import Camera from '../components/returnstatus/Camera';
import Button from '../components/returnstatus/Button';
import '../styles/returnstatus/returnstatus.css';

function ReturnStatus(){
    return(
		<div className='frame-container'>
	
		<Instruction/>
	
		<Camera/>
	
		<ItemList/>
	
		<Button/>
		</div>	
    )
}


export default ReturnStatus;