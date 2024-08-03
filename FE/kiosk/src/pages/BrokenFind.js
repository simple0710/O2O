import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/BrokenFind.css';
import { getCurrentProducts } from '../api/brokenfind.js';

// const items = [
//   { id: 1, name: '가위', icon: '✂️' },
//   { id: 2, name: '잉크', icon: '🖋️' },
//   { id: 3, name: '연필', icon: '✏️' },
//   { id: 4, name: '카메라', icon: '📷' },
// ];



// 임시 유저 아이디
const userId = 4;

function BrokenFind() {
  const navigate = useNavigate();
  // const [quantities, setQuantities] = useState(items.reduce((acc, item) => {
  //   acc[item.id] = { broken: 0, missing: 0 };
  //   return acc;
  // }, {}));

  const [items, setItems]  = useState([]);

  const increaseQuantity = (ind, type) => {
    console.log("hi " , ind);
    // setQuantities(prev => ({ ...prev, [id]: { ...prev[id], [type]: prev[id][type] + 1 } }));
    setItems(prevItems => 
      prevItems.map((item, index) => 
        // 임시로 min으로 막아두긴 했는데 broken+missing이 cnt 넘지 않게 해야댐 
        ind === index ? { ...item, [type]: Math.min(item[type] + 1, item.cnt)} : item
      )
    );
    console.log(items);
  };

  const decreaseQuantity = (ind, type) => {
    // setQuantities(prev => ({ ...prev, [id]: { ...prev[id], [type]: prev[id][type] > 0 ? prev[id][type] - 1 : 0 } }));
    setItems(prevItems => 
      prevItems.map((item, index) => 
        ind === index ? { ...item, [type]: Math.max(item[type] - 1, 0)} : item
      )
    );
  };

  // 의존성을 빈 배열로 주면 페이지 로딩될 때 최초 1회만 실행 
  useEffect(()=> {
    getBrokenValues();
  }, [])

  const reportItems = () => {
    console.log(items);
    console.log(items);
    // 분실 목록
    // filter -> map 순서 (그런데 지금 구조 수정하지 않아도 될 듯)
    const missingItems = items
      .filter(item => item.missing > 0);
    const brokenItems = items
      .filter(item => item.broken > 0);

    const reportedItems = [...missingItems, ...brokenItems];
    console.log("신고된 아이템:", reportedItems, missingItems, brokenItems);
    // console.log(reportedItems[0].name)
    // post 후 이동 
    navigate('/registerbroken', { state: { reportedItems } });
  };

  // ------------- API 연결
  const getBrokenValues = async () => {
    const data = await getCurrentProducts(userId, 1, 10);
    console.log("data ", data);
    if(data != null){
      const productsData = [];
      console.log("data.rents "+data.rents)
      for(let rent of data.rents) {
        console.log("Rent" + rent);
          for(let product of rent.products){
            if(product.status[1].product_cnt == 0) continue;
            productsData.push({
              id: product.product_id,
              name: product.product_name,
              cnt: product.status[1].product_cnt,
              date: rent.rent_dt,
              broken: 0, 
              missing: 0,
              icon: "🕶",
              locker_id: product.locker_id, // BE 수정 예정 
            })
          }
      }
      console.log(productsData);
      setItems(productsData);
    }
  }

  return (
    <div className='frame-container'>
    <div className="cart-container">
      <h2>대여물품조회</h2>
      <div className="items">
        {items.map((item, ind) => ( // ind 사용하여 product 구분 (product_id가 고유하지 않을 수도 있음)
          <div key={ind} className="item"> 
            <div className="item-header">
              <span className="item-icon">{item.icon}</span>
              <span className="item-name">{item.name}</span>
            </div>
            <div className="item-controls">
            <div className="control">
              <span className="preserve-horizontal-text">파손</span>
              <button className="btn btn-sm mx-1" onClick={() => decreaseQuantity(ind, 'broken')}>-</button>
              <span className="mx-1">{item.broken}</span>
              <button className="btn btn-sm mx-1" onClick={() => increaseQuantity(ind, 'broken')}>+</button>
            </div>
            <div className="control">
              <span className="preserve-horizontal-text">분실</span>
              <button className="btn btn-sm mx-1" onClick={() => decreaseQuantity(ind, 'missing')}>-</button>
              <span className="mx-1">{item.missing}</span>
              <button className="btn btn-sm mx-1" onClick={() => increaseQuantity(ind, 'missing')}>+</button>
            </div>
            </div>
          </div>
        ))}
      </div>
      <button className="report-button" onClick={reportItems}>신고하기</button>
    </div>
    </div>
  );
}

export default BrokenFind;
