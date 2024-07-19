import React from 'react'
import Checkmark from '../components/finishpage/Checkmark'
import Instruction from '../components/finishpage/Instruction';
import '../styles/finish/finish.css';

function Finish(){
  return(
    <div className='frame-container'>
        <div className='instruction'>
            <Instruction/>
        </div>
        <div>
            <Checkmark/>
        </div>
    </div>
    
  )

}


export default Finish;