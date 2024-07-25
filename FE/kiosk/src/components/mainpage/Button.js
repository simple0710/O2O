// Button.js
import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/mainpage/Button.css';

function Button({ icon, label, onClick }) {
  return (
    <div className='button-container' onClick={onClick}>
      <img src={icon} alt={label} className='button-icon' />
      <div className="button-label">{label}</div>
    </div>
  );
}

Button.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Button;
