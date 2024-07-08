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
        const response = await axios.get('http://localhost:5000/faq');
        setAccordionItems(response.data);
      } catch (err) {
        console.error('Error fetching FAQs:', err);
      }
    };
    fetchFAQs();
  }, [accordionItems]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/faq/${id}`);
      setAccordionItems(accordionItems.filter((item) => item.id !== id));
    } catch (err) {
      console.error('Error deleting FAQ:', err);
    }
  };

  const handleEdit = async (id, updatedItem) => {
    try {
      await axios.put(`http://localhost:5000/faq/${id}`, updatedItem);
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
      const response = await axios.post('http://localhost:5000/faq', values);
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
          <Form className="flex flex-col max-w-lg p-2 bg-white rounded-lg shadow-lg text-black mb-8 m-auto">
            <h2 className="text-lg font-semibold mb-2">Ajouter une nouvelle question FAQ :</h2>
            <Field
              type="text"
              name="title"
              placeholder="Titre"
              className="border-solid border-2 rounded-md border-dark bg-white box-border py-2 px-2 mb-4"
            />
            <ErrorMessage name="title" component="div" className="text-red-500" />

            <Field
              as="textarea"
              name="content"
              placeholder="Contenu"
              className="border-solid border-2 rounded-md border-dark bg-white box-border py-2 px-2 mb-4"
              rows={4}
            />
            <ErrorMessage name="content" component="div" className="text-red-500" />

            <button type="submit" className="m-auto bg-accent text-white px-4 py-1 rounded ml-2">
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
