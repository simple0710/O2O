import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/mainpage/Button.css';




// Button 컴포넌트를 수정하여 icon prop을 React 컴포넌트로 받도록 변경
function Button({ icon:Icon, label, onClick }) {
  return (
    <div className='button-container' onClick={onClick}>
      {Icon && <Icon className='button-icon' />} {/* 아이콘 렌더링 */}
      <div className="button-label">{label}</div>
    </div>
  );
}

Button.defaultProps = {
  icon: null,
}


Button.propTypes = {
  icon: PropTypes.elementType, // PropTypes를 elementType으로 변경
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Button;
