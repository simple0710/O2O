import React from 'react';
import { motion } from 'framer-motion';

const circleVariants = {
  hidden: { 
    pathLength: 0, 
    opacity: 0,
    rotate: 0 
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    rotate: 45,
    transition: {
      duration: 1,
      ease: 'easeInOut'
    }
  }
};

const checkmarkVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
      delay: 1 // 원 애니메이션이 끝난 후 체크 애니메이션 시작
    }
  }
};

const Checkmark = () => {
  return (
    <motion.svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      initial="hidden"
      animate="visible"
    >
      {/* 감싸는 원 */}
      <motion.circle
        cx="50"
        cy="50"
        r="45"
        fill="transparent"
        stroke="#d6f5ff"
        strokeWidth="10"
        strokeLinecap="round"
        variants={circleVariants}
        style={{
          transformOrigin: 'center',
          rotate: -90 // 시작 위치를 12시 방향으로 설정
        }}
      />
      {/* 체크 표시 */}
      <motion.path
        d="M30 50 L45 65 L70 35"
        fill="transparent"
        stroke="#d6f5ff"
        strokeWidth="10"
        strokeLinecap="round"
        variants={checkmarkVariants}
      />
    </motion.svg>
  );
};

export default Checkmark;
