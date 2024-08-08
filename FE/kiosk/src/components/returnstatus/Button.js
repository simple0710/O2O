import React from 'react';
import '../../styles/returnstatus/Button.css'
import { useNavigate } from 'react-router-dom';

function Button({onClick}) {
    // const navigate = useNavigate();

    // const returnlokcer = () => {
    //     navigate('/returnlocker')
    // }
    return (
        <div className='buttonGroup'>
            <button className='button'>다시 인식하기</button>
            <button className='button1' onClick={onClick}>반납하기</button>
        </div>
    );
}

export default Button;
