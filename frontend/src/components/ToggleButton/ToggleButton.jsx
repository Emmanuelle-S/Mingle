import React, { useState } from 'react';

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
        className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out ${
          isOn ? 'bg-green-400' : 'bg-gray-300'
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
            isOn ? 'translate-x-6' : ''
          }`}
        ></div>
      </button>
    </div>
  );
};

export default ToggleButton;
