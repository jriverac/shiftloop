import React from 'react';
import StatCard from './StatCard';

const StdDevCard = ({
  value,
  goodThreshold = 1,
  warningThreshold = 3,
  className = '',
  size = 'normal'
}) => {
  return (
    <StatCard
      title="Standard Deviation"
      value={value}
      goodThreshold={goodThreshold}
      warningThreshold={warningThreshold}
      compareFunc="greater"
      precision={2}
      className={className}
      size={size}
    />
  );
};

export default StdDevCard;