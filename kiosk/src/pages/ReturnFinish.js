import React from 'react'
import Checkmark from '../components/finish/Checkmark'
import ReturnInst from '../components/finish/ReturnInst';
import '../styles/finish/finish.css';

function Finish(){
  return(
    <div className='frame-container'>
        <div className='instruction'>
            <ReturnInst/>
        </div>
        <div>
            <Checkmark/>
        </div>
    </div>
    
  )

}


export default Finish;