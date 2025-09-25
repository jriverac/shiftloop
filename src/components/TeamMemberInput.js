import React from 'react';
import './TeamMemberInput.css';

const TeamMemberInput = ({
  value,
  onChange,
  onAdd,
  placeholder = "Enter name",
  buttonText = "Add",
  className = '',
  disabled = false
}) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !disabled) {
      onAdd();
    }
  };

  const handleAdd = () => {
    if (!disabled) {
      onAdd();
    }
  };

  return (
    <div className={`team-member-input ${className}`}>
      <div className="input-group mb-3">
        <input 
          type="text" 
          className="form-control" 
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={disabled}
        />
        <button 
          className="btn btn-success" 
          type="button"
          onClick={handleAdd}
          disabled={disabled || !value.trim()}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default TeamMemberInput;