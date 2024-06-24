import React, { useState } from 'react';

const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const onItemClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto self-center">
      {items.map((item, index) => (
        <div key={index} className="mb-4 border border-gray-200 rounded">
          <div
            className={`flex justify-between items-center p-4 cursor-pointer ${
              index === activeIndex ? 'bg-white' : 'bg-gray-200'
            }`}
            onClick={() => onItemClick(index)}
          >
            <span className="text-lg font-semibold">{item.title}</span>
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {index === activeIndex ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 15l7-7 7 7"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              )}
            </svg>
          </div>
          {index === activeIndex && (
            <div className="p-4 border-t border-gray-200 bg-gray-100">
              <p>{item.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
