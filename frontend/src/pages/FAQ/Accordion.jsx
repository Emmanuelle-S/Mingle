import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Accordion = ({ items, isAdmin, onDelete, onEdit }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const onItemClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const handleEditClick = (index) => {
    // Toggle active index so that clicking "Modifier" does not change open/close behavior
    setActiveIndex(index === activeIndex ? null : index);
  };

  const handleSaveClick = (id, values) => {
    const updatedItem = {
      faq_id: id,
      title: values.title,
      content: values.content,
    };

    onEdit(id, updatedItem);
    setActiveIndex(null); // Assurez-vous de réinitialiser l'index actif après la sauvegarde
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Le titre est requis'),
    content: Yup.string().required('Le contenu est requis'),
  });

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
                <button onClick={() => handleEditClick(item.faq_id)} className="mr-2">
                  Modifier
                </button>
                <button onClick={() => onDelete(item.faq_id)}>Supprimer</button>
              </div>
            )}
          </div>
          {isAdmin && item.faq_id === activeIndex && (
            <div className="p-4 border-t border-gray-200 bg-gray-100">
              <Formik
                initialValues={{ title: item.title, content: item.content }}
                validationSchema={validationSchema}
                onSubmit={(values) => handleSaveClick(item.faq_id, values)}
              >
                {({ getFieldProps, errors, touched }) => (
                  <Form>
                    <div className="mb-2">
                      <label htmlFor={`title_${item.faq_id}`}>Titre</label>
                      <Field
                        id={`title_${item.faq_id}`}
                        type="text"
                        {...getFieldProps('title')}
                        className="border border-gray-300 rounded px-2 py-1 w-full"
                      />
                      <ErrorMessage name="title" component="div" className="text-red-500" />
                    </div>
                    <div className="mb-2">
                      <label htmlFor={`content_${item.faq_id}`}>Contenu</label>
                      <Field
                        id={`content_${item.faq_id}`}
                        as="textarea"
                        {...getFieldProps('content')}
                        className="border border-gray-300 rounded px-2 py-1 w-full"
                        rows={4}
                      />
                      <ErrorMessage name="content" component="div" className="text-red-500" />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">
                      Sauvegarder
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          )}
          {!isAdmin && item.faq_id === activeIndex && (
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
