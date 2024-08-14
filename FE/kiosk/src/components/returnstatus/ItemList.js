import React, { useEffect } from 'react';
import '../../styles/returnstatus/ItemList.css';
import { getProductIcon1 } from '../../util/productUtil.js'; // getProductIcon 함수 임포트

function ItemList({ productList }) {
  
    useEffect(() => {
        console.log('반납 선택 물품 전달:', productList);
    }, [productList]);

    return (
        <>
            <div className='item-list1'>
                <div>
                {productList && productList.map(item => (
                    <div key={item.name} className='item1'>
                        <span className='item-icon'>{getProductIcon1(item.name)}</span>
                        
                        <span className='item-name1'>{item.name}</span>
                        <span className='tiem-count1'>{item.cnt}</span>
                    </div>
                ))}
                </div>
            </div>
            <div className='generalListing'>
                <div className='image1'>
                    {/* 필요시 다른 컨텐츠 추가 */}
                </div>
            </div>
        </>
    );
}

export default ItemList;
