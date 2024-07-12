// npm install classnames

import React, { useState } from 'react';
import classNames from 'classnames'; 

const ToggleButton = ({ label }) => {
  const [isOn, setIsOn] = useState(false);

  const toggle = () => {
    setIsOn(!isOn);
  };

  return (
    <div className="flex items-center space-x-2 mr-10">
      <span>{label}</span>
      <button
        onClick={toggle}
        className={classNames(
          'w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out',
          { 'bg-green-400': isOn, 'bg-gray-300': !isOn }
        )}
        aria-label={isOn ? 'Switch off' : 'Switch on'}
      >
        <div
          className={classNames(
            'bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out',
            { 'translate-x-6': isOn }
          )}
        ></div>
      </button>
    </div>
  );
};

export default ToggleButton;
