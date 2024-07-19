import React, { useState } from 'react'; // React와 useState 훅을 import합니다.
import { useNavigate } from 'react-router-dom'; // useNavigate 훅을 import합니다.
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap의 CSS 파일을 import합니다.
import '../styles/Cart.css'; // 커스텀 CSS 파일을 import합니다.

// 아이템 배열을 정의합니다. 각 아이템은 id, name, icon 속성을 가집니다.
const items = [
  { id: 1, name: '가위', icon: '✂️' },
  { id: 2, name: '잉크', icon: '🖋️' },
  { id: 3, name: '연필', icon: '✏️' },
  { id: 4, name: '카메라', icon: '📷' },
];

function Cart() {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 가져옵니다.

  // 각 아이템의 수량을 추적하는 상태를 초기화합니다.
  const [quantities, setQuantities] = useState(items.reduce((acc, item) => {
    acc[item.id] = 0; // 모든 아이템의 초기 수량은 0으로 설정합니다.
    return acc;
  }, {}));

  // 특정 아이템의 수량을 증가시키는 함수입니다.
  const increaseQuantity = (id) => {
    setQuantities(prev => ({ ...prev, [id]: prev[id] + 1 })); // id에 해당하는 아이템의 수량을 1 증가시킵니다.
  };

  // 특정 아이템의 수량을 감소시키는 함수입니다.
  const decreaseQuantity = (id) => {
    setQuantities(prev => ({ ...prev, [id]: prev[id] > 0 ? prev[id] - 1 : 0 })); // id에 해당하는 아이템의 수량이 0보다 큰 경우 1 감소시킵니다.
  };

  // 수량이 0보다 큰 아이템들만 필터링하여 장바구니에 담긴 아이템 리스트를 만듭니다.
  const cartItems = items.filter(item => quantities[item.id] > 0);

  // 장바구니 아이템을 콘솔에 출력하는 함수입니다.
  const logCartItems = () => {
    console.log("장바구니 아이템:", cartItems.map(item => ({
      name: item.name, // 아이템의 이름
      quantity: quantities[item.id] // 아이템의 수량
    })));
    navigate('/locker'); // 사물함 페이지로 이동합니다.
  };

  return (
    <div className="App container mt-4"> {/* App 컴포넌트의 최상위 div로 Bootstrap의 컨테이너 클래스를 사용합니다. */}
      <header className="text-center mb-4"> {/* 헤더 섹션을 정의합니다. 텍스트를 가운데 정렬하고 마진을 추가합니다. */}
        <h1>물품 리스트</h1> {/* 헤더 타이틀입니다. */}
      </header>
      <div className="item-list mb-4"> {/* 아이템 리스트를 담을 div입니다. */}
        {items.map(item => ( // 각 아이템을 반복하여 출력합니다.
          <div key={item.id} className="item card mb-3"> {/* 각 아이템을 카드 형식으로 표시합니다. */}
            <div className="card-body d-flex align-items-center"> {/* 카드의 본문을 flex로 정렬합니다. */}
              <div className="item-icon mr-3">{item.icon}</div> {/* 아이템의 아이콘을 표시합니다. */}
              <div className="item-name flex-grow-1">{item.name}</div> {/* 아이템의 이름을 표시합니다. */}
              <div className="item-controls d-flex align-items-center"> {/* 아이템의 수량을 조절하는 버튼들을 flex로 정렬합니다. */}
                <button className="btn btn-primary btn-sm ml-2" onClick={() => decreaseQuantity(item.id)}>-</button> {/* 수량 감소 버튼 */}
                <span>{quantities[item.id]}</span> {/* 현재 수량을 표시합니다. */}
                <button className="btn btn-primary btn-sm mr-2" onClick={() => increaseQuantity(item.id)}>+</button> {/* 수량 증가 버튼 */}
              </div>
            </div>
          </div>
        ))}
      </div>
      <footer className="footer"> {/* 푸터 섹션을 정의합니다. */}
        <div className="cart mb-4"> {/* 장바구니 섹션입니다. */}
          <h2 className="h5">장바구니</h2> {/* 장바구니 타이틀입니다. */}
          {cartItems.length === 0 ? ( // 장바구니가 비어 있는지 확인합니다.
            <p>장바구니가 비어 있습니다.</p> // 장바구니가 비어 있을 경우 메시지를 표시합니다.
          ) : (
            <ul className="list-group"> {/* 장바구니에 아이템이 있을 경우 리스트로 표시합니다. */}
              {cartItems.map(item => ( // 각 장바구니 아이템을 반복하여 출력합니다.
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                  {item.icon} {item.name} {/* 아이템의 아이콘과 이름을 표시합니다. */}
                  <span className="badge badge-primary badge-pill">{quantities[item.id]}</span> {/* 아이템의 수량을 배지로 표시합니다. */}
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* '더하기' 버튼을 클릭할 때 장바구니 아이템을 콘솔에 출력하고 Locker 페이지로 이동합니다. */}
        <button className="btn btn-success btn-block" onClick={logCartItems}>더하기</button>
      </footer>
    </div>
  );
}

export default Cart; // Cart 컴포넌트를 export하여 다른 파일에서 사용할 수 있게 합니다.
