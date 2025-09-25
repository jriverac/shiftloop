import React from 'react';
import './StatCard.css';

const StatCard = ({
  title,
  value,
  goodThreshold,
  warningThreshold,
  compareFunc = 'greater', // 'greater', 'less', 'equal', 'custom'
  customCondition = null,
  precision = 2,
  className = '',
  size = 'normal' // 'small', 'normal', 'large'
}) => {
  const getCardStatus = () => {
    if (customCondition) {
      return customCondition(value) ? 'danger' : 'success';
    }
    
    switch (compareFunc) {
      case 'greater':
        if (value > warningThreshold) return 'danger';
        if (value > goodThreshold) return 'warning';
        return 'success';
      case 'less':
        if (value < warningThreshold) return 'danger';
        if (value < goodThreshold) return 'warning';
        return 'success';
      case 'equal':
        if (value === goodThreshold) return 'success';
        return 'danger';
      default:
        return 'primary';
    }
  };

  const getDisplayClasses = () => {
    const status = getCardStatus();
    const sizeClass = size === 'small' ? 'display-6' : size === 'large' ? 'display-4' : 'display-5';
    
    let baseClasses = `card text-center shadow stat-card stat-card-${size}`;
    
    switch (status) {
      case 'danger':
        baseClasses += ' bg-danger text-white';
        break;
      case 'warning':
        baseClasses += ' bg-warning text-dark';
        break;
      case 'success':
        baseClasses += ' bg-success text-white';
        break;
      default:
        baseClasses += ' bg-primary text-white';
    }
    
    return { baseClasses, sizeClass };
  };

  const { baseClasses, sizeClass } = getDisplayClasses();
  const displayValue = typeof value === 'number' ? value.toFixed(precision) : value;

  return (
    <div className={`${baseClasses} ${className}`}>
      <div className="card-body p-4">
        <div className="card-title h6 mb-2">{title}</div>
        <span className={`${sizeClass} fw-bold`}>{displayValue}</span>
      </div>
    </div>
  );
};

export default StatCard;