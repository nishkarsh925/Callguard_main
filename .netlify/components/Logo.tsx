import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <img
      src="/kalka.png"
      alt="Kalka Crane Service Logo"
      className={className}
    />
  );
};

export default Logo;

