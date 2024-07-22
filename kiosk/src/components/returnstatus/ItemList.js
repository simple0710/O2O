import React from 'react';
import '../../styles/returnstatus/ItemList.css';

function ItemList() {
    const items = [
        { id: 1, name: '가위', icon: '✂️', count: 1 },
        { id: 2, name: '잉크', icon: '🖋️', count: 2 },
        { id: 4, name: '카메라', icon: '📷', count: 3 },
    ];

    return (
        <>
            <div className='item-list'>
                <div>
                    {/* 아이템 리스트를 동적으로 렌더링 */}
                    {items.map(item => (
                        <div key={item.id} className='item'>
                            <span className='item-icon'>{item.icon}</span>
                            <span className='item-name'>{item.name}</span>
                            <span className='item-count'>{item.count}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className='generalListing1'>
                <div className='image1'>
                    {/* 필요시 다른 컨텐츠 추가 */}
                </div>
            </div>
        </>
    );
}

export default ItemList;
