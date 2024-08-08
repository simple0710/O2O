import React, {useEffect} from 'react';
import '../../styles/returnstatus/ItemList.css';

function ItemList({reportedItems}) {
    // const items = [
    //     { id: 1, name: '가위', icon: '✂️', count: 1 },
    //     { id: 2, name: '잉크', icon: '🖋️', count: 2 },
    //     { id: 3, name: '연필', icon: '✏️' , count: 7},
    //     { id: 4, name: '카메라', icon: '📷', count: 3 }
    // ];
    useEffect(() => {
        console.log('반납 선택 물품 전달:', reportedItems);
    }, [reportedItems]);


    return (
        <>
            <div className='item-list1'>
                <div>
                    {/* 아이템 리스트를 동적으로 렌더링 */}
                    {/* {items.map(item => (
                        <div key={item.id} className='item1'>
                            <span className='item-icon1'>{item.icon}</span>
                            <span className='item-name1'>{item.name}</span>
                            <span className='item-count1'>{item.count}</span>
                        </div>
                    ))} */}
                {reportedItems && reportedItems.map(item => (
                    <div key={item.id} className='item1'>
                        {/* <span className='item-icon'></span> */}
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
