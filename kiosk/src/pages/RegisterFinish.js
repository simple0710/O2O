import React from 'react'
import Checkmark from '../components/finish/Checkmark'
import RegisterInst from '../components/finish/RegisterInst';
import '../styles/finish/finish.css';

function Finish(){
  return(
    <div className='frame-container'>
        <div className='instruction'>
            <RegisterInst/>
        </div>
        <div>
            <Checkmark/>
        </div>
    </div>
    
  )

}


export default Finish;