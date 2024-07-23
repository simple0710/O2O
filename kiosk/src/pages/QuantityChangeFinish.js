import React from 'react'
import Checkmark from '../components/finish/Checkmark'
import QuantityInst from '../components/finish/QuantityInst';
import '../styles/finish/finish.css';

function Finish(){
  return(
    <div className='frame-container'>
        <div className='instruction'>
            <QuantityInst/>
        </div>
        <div>
            <Checkmark/>
        </div>
    </div>
    
  )

}


export default Finish;