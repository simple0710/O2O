import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/finish/finish.css';

const textVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 1, 
      ease: 'easeInOut' 
    }
  }
};

function Instruction() {
  return (
    <motion.b 
      className='instruction' 
      variants={textVariants}
      initial="hidden"
      animate="visible"
    >
      대여가 완료되었습니다.
    </motion.b>
  );
}

export default Instruction;
