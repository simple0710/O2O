import React, {useState} from 'react';
import Sidebar from "./Sidebar";
import Nav from './Nav';
import '../../style/RequestItme.css'
import {postRequest} from '../../api/userpost'

const RequestItem = () => {

    const [formData, setFormData] = useState({
        user_id: 7,
        itemname: '',
        requestreason : '',
        itemlink : '',
        itemcnt: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        try{
            await postRequest(formData);
            console.log("Success")
        } catch(e){
            console.error(e)
        }
    };

  


    return (
        <div>
            <Nav/>
            <div className="content-container">
                <Sidebar/>
                <div className='content'>
                    <h2>물품 요청</h2>
                    <div className='user-form'>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="itemname" className='form-label'>물품명: </label>
                                <input
                                    type="itemname"
                                    className='form-control'
                                    id='itemname'
                                    name='itemname'
                                    value={formData.itemname}
                                    onChange={handleChange}
                                    required
                                    placeholder='요청 물품명을 적어주세요.'
                                />
                            </div>
                            <div>
                            <label htmlFor="requestreason" className='form-label'>신청 사유: </label>
                                <input
                                    type="requestreason"
                                    className='form-control'
                                    id='requestreason'
                                    name='requestreason'
                                    value={formData.requestreason}
                                    onChange={handleChange}
                                    required
                                    placeholder='물품 신청 사유를 적어주세요.'
                                />
                            </div>
                            <div>
                            <label htmlFor="itemlink" className='form-label'>물품 링크: </label>
                                <input
                                    type="itemlink"
                                    className='form-control'
                                    id='itemlink'
                                    name='itemlink'
                                    value={formData.itemlink}
                                    onChange={handleChange}
                                    required
                                    placeholder='물품 링크를 입력해주세요.'
                                />
                            </div>
                            <div>
                            <label htmlFor="itemcnt" className='form-label'>물품 개수: </label>
                                <input
                                    type="itemcnt"
                                    className='form-control'
                                    id='itemcnt'
                                    name='itemcnt'
                                    value={formData.itemcnt}
                                    onChange={handleChange}
                                    required
                                    placeholder='물품 개수를 입력해주세요. (숫자만 입력해주세요)'
                                />
                            </div>
                            <button type="submit" className="add-btn">요청하기</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default RequestItem;