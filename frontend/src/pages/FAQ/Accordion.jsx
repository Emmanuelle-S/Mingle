import React, { useState } from "react";

const Accordion = ({ items, isAdmin, onDelete, onEdit }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(null);
  const [editedItem, setEditedItem] = useState({ title: "", content: "" });

  const onItemClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const handleEditClick = (index, item) => {
    setIsEditing(index);
    setEditedItem(item);
  };

  const handleSaveClick = (id) => {
    onEdit(id, editedItem);
    setIsEditing(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto self-center">
      {items.map((item) => (
        <div key={item.faq_id} className="mb-4 border border-gray-200 rounded">
          <div
            className={`flex justify-between items-center p-4 cursor-pointer ${
              item.faq_id === activeIndex ? "bg-white" : "bg-gray-200"
            }`}
            onClick={() => onItemClick(item.faq_id)}
          >
            <span className="text-lg font-semibold">{item.title}</span>
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {item.faq_id === activeIndex ? (
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
            {isAdmin && (
              <div className="flex">
                <button onClick={() => handleEditClick(item.faq_id, item)} className="mr-2">
                  Modifier
                </button>
                <button onClick={() => onDelete(item.faq_id)}>Supprimer</button>
              </div>
            )}
          </div>
          {item.faq_id === activeIndex && (
            <div className="p-4 border-t border-gray-200 bg-gray-100">
              {isEditing === item.faq_id ? (
                <div>
                  <input
                    type="text"
                    value={editedItem.title}
                    onChange={(e) =>
                      setEditedItem({ ...editedItem, title: e.target.value })
                    }
                  />
                  <textarea
                    value={editedItem.content}
                    onChange={(e) =>
                      setEditedItem({ ...editedItem, content: e.target.value })
                    }
                  />
                  <button onClick={() => handleSaveClick(item.faq_id)}>
                    Sauvegarder
                  </button>
                </div>
              ) : (
                <p>{item.content}</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
