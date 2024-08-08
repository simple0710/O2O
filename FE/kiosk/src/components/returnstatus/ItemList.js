import React, {useEffect} from 'react';
import '../../styles/returnstatus/ItemList.css';

function ItemList({reportedItems}) {
  
    useEffect(() => {
        console.log('반납 선택 물품 전달:', reportedItems);
    }, [reportedItems]);

    // const returnData = reportedItems.map(item => ({
    //     rent_id: item.rent_id,
    //     products: [
    //         {
    //           product_id: item.id,
    //           product_cnt: item.cnt,
    //           locker_id: item.locker_id,
    //           status_id: 2 // 반납: 2 (2로 고정)
    //         }
    //       ]
    // }))


    return (
        <>
            <div className='item-list1'>
                <div>
                {reportedItems && reportedItems.map(item => (
                    <div key={item.id} className='item1'>
                        <span className='item-icon'>✂️</span>
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
