import React from 'react';
import '../style/ButtonComponent.css';

const ButtonComponent = ({ onClick, children, type, disabled = false, style }) => {
  return (
    <button
      onClick={onClick}
      className="custom-button"
      type={type}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;