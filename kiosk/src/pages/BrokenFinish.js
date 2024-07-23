import React from 'react'
import Checkmark from '../components/finish/Checkmark'
import BrokenInst from '../components/finish/BrokenInst';
import '../styles/finish/finish.css';

function Finish(){
  return(
    <div className='frame-container'>
        <div className='instruction'>
            <BrokenInst/>
        </div>
        <div>
            <Checkmark/>
        </div>
    </div>
    
  )

}


export default Finish;