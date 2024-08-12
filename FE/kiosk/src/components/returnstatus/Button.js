import React from 'react';
import '../../styles/returnstatus/Button.css'
import { useNavigate } from 'react-router-dom';

function Button({onClick, onRetry}) {
    // const navigate = useNavigate();

    // const returnlokcer = () => {
    //     navigate('/returnlocker')
    // }
    return (
        <div className='buttonGroup'>
            <button className='button1' onClick={onClick}>반납하기</button>
        </div>
    );
}

export default Button;
