import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/BrokenFind.css';
import '../styles/common/Common.css';
import { getCurrentProducts } from '../api/brokenfind.js';
import IncreaseDecreaseButton from '../components/common/IncreaseDecreaseButton.js'
import { formatDateSimple } from '../util/dateUtil.js'
import { getUserIdFromSession } from '../util/sessionUtils.js'

// const items = [
//   { id: 1, name: '가위', icon: '✂️' },
//   { id: 2, name: '잉크', icon: '🖋️' },
//   { id: 3, name: '연필', icon: '✏️' },
//   { id: 4, name: '카메라', icon: '📷' },
// ];



// 임시 유저 아이디
const userId = getUserIdFromSession();

function BrokenFind() {
  const navigate = useNavigate();
  // const [quantities, setQuantities] = useState(items.reduce((acc, item) => {
  //   acc[item.id] = { broken: 0, missing: 0 };
  //   return acc;
  // }, {}));

  const [items, setItems] = useState([[]]);

  const increaseQuantity = (rentIndex, productIndex, type) => {
    // setQuantities(prev => ({ ...prev, [id]: { ...prev[id], [type]: prev[id][type] + 1 } }));
    // console.log(items[rentIndex][productIndex]);
    setItems(prevItems =>
      prevItems.map((rent, rInd) =>
        rInd === rentIndex
          ? rent.map((item, pInd) =>
            pInd === productIndex
              ? { ...item, [type]: 
                    (item.cnt - (item.broken + item.missing)) == 0?
                       item[type]: item[type] + 1 }
              : item
          )
          : rent
      )
    );
    // console.log(items[rentIndex][productIndex]);
  };

  const decreaseQuantity = (rentIndex, productIndex, type) => {
    // setQuantities(prev => ({ ...prev, [id]: { ...prev[id], [type]: prev[id][type] > 0 ? prev[id][type] - 1 : 0 } }));
    setItems(prevItems =>
      prevItems.map((rent, rInd) =>
        rInd === rentIndex
          ? rent.map((item, pInd) =>
            pInd === productIndex
              ? { ...item, [type]: Math.max(item[type] - 1, 0) }
              : item
          )
          : rent
      )
    );
  };

  // 의존성을 빈 배열로 주면 페이지 로딩될 때 최초 1회만 실행 
  useEffect(() => {
    getBrokenValues();
  }, [])

  const reportItems = () => {
    console.log(items);
    console.log(items);
    // 분실 목록
    // filter -> map 순서 
    const reportedItems = [];
    items.map(rent => 
      rent.map(item => {
        if(item.missing > 0 || item.broken > 0){
          reportedItems.push(item);
        }
      })
    );
    console.log("신고된 아이템:", reportedItems);
    // console.log(reportedItems[0].name)
    // post 후 이동 
    navigate('/registerbroken', { state: { reportedItems } });
  };

  // ------------- API 연결
  const getBrokenValues = async () => {
    const data = await getCurrentProducts(userId, 1, 5);
    console.log("data ", data);
    if (data != null) {
      const rentsData = [];
      console.log("data.rents " + data.rents)
      for (let rent of data.rents) {
        console.log("Rent" + rent);
        const productsData = [];
        for (let product of rent.products) {
          if (product.status[1].product_cnt == 0) continue;
          productsData.push({
            id: product.product_id,
            name: product.product_name,
            cnt: product.status[1].product_cnt,
            date: rent.rent_dt,
            broken: 0,
            missing: 0,
            icon: "🕶",
            locker_id: product.locker_id,
          })
        }
        rentsData.push(productsData);
      }
      console.log(rentsData);
      setItems(rentsData);
    }
  }

  return (
    <div className='frame-container'>
      <div className="cart-container">
        <h2>대여물품조회</h2>
        <div className="items">
          {items.map((rent, rInd) => (
            <div key={rInd} className="rent">
              <div>
                <p className="item-date small-font">대여 일시: {formatDateSimple(rent[0]?.date)}</p>
              </div>
              {rent.map((item, pInd) => ( // `rent` 배열을 `map`으로 순회
                <div key={rInd + "." + pInd} className="item">
                  <div className="item-header">
                    <span className="item-icon">{item.icon}</span>
                    <span>
                      <p className="item-name">{item.name}</p>
                    </span>
                  </div>
                  <div className="item-controls">
                    <div className="control">
                      <span className="preserve-horizontal-text extreme-small-font">파손</span>
                      {/* <button className="btn btn-sm mx-1" onClick={() => decreaseQuantity(item.id, 'broken')}>-</button>
              <span className="mx-1">{quantities[item.id].broken}</span>
              <button className="btn btn-sm mx-1" onClick={() => increaseQuantity(item.id, 'broken')}>+</button> */}
                      <IncreaseDecreaseButton
                        increaseQuantity={increaseQuantity}
                        decreaseQuantity={decreaseQuantity}
                        count={item.broken}
                        rIndex={rInd}
                        pIndex={pInd}
                        type='broken'
                      />
                    </div>
                    <div className="control">
                      <span className="preserve-horizontal-text extreme-small-font">분실</span>
                      <IncreaseDecreaseButton
                        increaseQuantity={increaseQuantity}
                        decreaseQuantity={decreaseQuantity}
                        count={item.missing}
                        rIndex={rInd}
                        pIndex={pInd}
                        type='missing'
                      />
                    </div>
                  </div>
                </div>
                 ))}
              </div>
            ))}
        </div>
        <button className="report-button" onClick={reportItems}>신고하기</button>
      </div>
    </div>
  );
}

export default BrokenFind;
