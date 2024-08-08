import React, {useEffect} from 'react'
import Instruction from '../components/returnstatus/Instruction';
import ItemList from '../components/returnstatus/ItemList';
import Camera from '../components/returnstatus/Camera';
import Button from '../components/returnstatus/Button';
import '../styles/returnstatus/returnstatus.css';
import { useNavigate, useLocation } from 'react-router-dom';



function ReturnStatus(){
	const navigate = useNavigate();
	const location = useLocation();
	const {reportedItems} = location.state || {};

	useEffect(() => {
        console.log('반납 선택 물품 :', reportedItems);
    }, [reportedItems]);

    return(
		<div className='frame-container'>
			<button className="btn-main" onClick={() => navigate('/')}>
          메인 페이지
      </button>reportedItems
		<Instruction reportedItems={reportedItems}/>
	
		<Camera reportedItems={reportedItems}/>
	
		<ItemList reportedItems={reportedItems}/>
	
		<Button reportedItems={reportedItems}/>
		</div>	
    )
}


export default ReturnStatus;