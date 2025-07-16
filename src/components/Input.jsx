import React from 'react';

const Input = ({ label, ...props }) => {
  return (
    <div className="input-container">
      {label && <label className="input-label">{label}</label>}
      <input className="input-field" {...props} />
    </div>
  );
};

export default Input;
