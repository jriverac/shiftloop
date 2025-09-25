import React from 'react';
import StatCard from './StatCard';

const MeanCard = ({
  value,
  goodThreshold = 15,
  warningThreshold = 20,
  className = '',
  size = 'normal'
}) => {
  return (
    <StatCard
      title="Mean Weekend Days"
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

export default MeanCard;