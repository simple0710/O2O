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
	const {reportedItems} = location.state || [];

	useEffect(() => {
        console.log('반납 선택 물품 :', reportedItems);
    }, [reportedItems]);

	const returnData = reportedItems.reduce((acc, item) => {
		// acc가 빈 객체인 경우 초기화
		if (!acc.rent_id) {
		  acc = {
			rent_id: item.rent_id,
			products: []
		  };
		}
	  
		// 현재 항목의 rent_id와 acc의 rent_id가 일치하는지 확인
		if (acc.rent_id === item.rent_id) {
		  // rent_id가 일치하면 products 배열에 새 제품 추가
		  acc.products.push({
			product_id: item.id,
			product_cnt: item.cnt,
			locker_id: item.locker_id,
			status_id: 2 // 반납: 2 (2로 고정)
		  });
		}
	  
		return acc;
	  }, {});


	const handleNavigate = () => {
        navigate('/returnlocker', { state: { returnData } });
    };

    return(
		<div className='frame-container'>
			<button className="btn-main" onClick={() => navigate('/')}>
          HOME
      </button>
		<Instruction reportedItems={reportedItems}/>
	
		<Camera reportedItems={reportedItems}/>
	
		<ItemList reportedItems={reportedItems}/>
	
		<Button onClick={handleNavigate}/>
		</div>	
    )
}


export default ReturnStatus;