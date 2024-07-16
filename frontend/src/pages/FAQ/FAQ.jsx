import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Accordion from './Accordion.jsx';

const FAQ = () => {
  const [accordionItems, setAccordionItems] = useState([]);
  const [isAdmin, setIsAdmin] = useState(true); // Remplacer par une vérification d'admin réelle
  const [newItem, setNewItem] = useState({ title: '', content: '' });

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/faq`);
        setAccordionItems(response.data);
      } catch (err) {
        console.error('Error fetching FAQs:', err);
      }
    };
    fetchFAQs();
  }, [accordionItems]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/faq/${id}`);
      setAccordionItems(accordionItems.filter((item) => item.id !== id));
    } catch (err) {
      console.error('Error deleting FAQ:', err);
    }
  };

  const handleEdit = async (id, updatedItem) => {
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/faq/${id}`, updatedItem);
      setAccordionItems(
        accordionItems.map((item) => (item.id === id ? updatedItem : item))
      );
    } catch (err) {
      console.error('Error updating FAQ:', err);
    }
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Titre requis'),
    content: Yup.string().required('Contenu requis'),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/faq`, values);
      setAccordionItems([...accordionItems, response.data]);
      setNewItem({ title: '', content: '' }); // Réinitialiser newItem après soumission
      resetForm();
    } catch (err) {
      console.error('Error adding FAQ:', err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-lg md:text-2xl text-center py-8 md:p-16">
        Les réponses à toutes vos questions sur votre Plateforme collaborative préférée :
      </h1>
      {isAdmin && (
        <Formik
          initialValues={newItem}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Ajouter une nouvelle question FAQ :</h2>
            <Field
              type="text"
              name="title"
              placeholder="Titre"
              className="border border-gray-300 rounded px-2 py-1 mr-2"
            />
            <ErrorMessage name="title" component="div" className="text-red-500" />

            <Field
              as="textarea"
              name="content"
              placeholder="Contenu"
              className="border border-gray-300 rounded px-2 py-1"
            />
            <ErrorMessage name="content" component="div" className="text-red-500" />

            <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded ml-2">
              Ajouter
            </button>
          </Form>
        </Formik>
      )}
      <Accordion
        items={accordionItems}
        isAdmin={isAdmin}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default FAQ;
