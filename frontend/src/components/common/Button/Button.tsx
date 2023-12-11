import React from 'react';
import './Button.css';

// we can add/change variants if necessary
type ButtonVariant = 'default' | 'blue' | 'round' | 'transparent';

type ButtonProps = {
  label?: string;
  icon?: React.ReactElement<SVGElement>;
  variant: ButtonVariant;
  onClick: () => void;
}

function Button({ label, icon, variant = 'default', onClick }: ButtonProps) {

  // attach proper CSS class based on variant prop
  const getButtonClass = () => {
    switch (variant) {
      case 'blue':
        return 'btn-blue';
      case 'round':
        return 'btn-round';
      case 'transparent':
        return 'btn-transparent';
      default:
        return 'btn-default';
    }
  };

  return (
    // rendering button conditionally based on passed ButtonProps
    <button
      className={`button ${getButtonClass()}`}
      onClick={onClick}
      aria-label={label}>
      {icon && <span className="button-icon">{icon}</span>}
      {label && <span className="button-label">{label}</span>}
    </button>
  );
}

export default Button
