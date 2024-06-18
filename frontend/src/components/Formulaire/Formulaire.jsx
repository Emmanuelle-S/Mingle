import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Schéma de validation
const validationFormulaire = Yup.object({
  email: Yup.string().email('Adresse mail invalide').required('Saisissez une adresse mail'),
  password: Yup.string()
    .min(6, 'Le mot de passe doit contenir 6 caractères minimum')
    .matches(/[^A-Za-z0-9]/, 'Le mot de passe doit contenir au moins un caractère spécial')
    .required('Saisissez votre mot de passe'),
  message: Yup.string().required('Que puis-je faire pour vous ?'),
  linkedin: Yup.string().url('Lien LinkedIn invalide').required('Saisissez un lien LinkedIn'),
  phone: Yup.string().matches(/^[0-9]+$/, 'Le numéro de téléphone doit être valide').required('Saisissez un numéro de téléphone')
});

const Formulaire = () => {
  return (
    <Formik
      initialValues={{ email: '', password: '', message: '', linkedin: '', phone: '' }}
      validationSchema={validationFormulaire}
      onSubmit={(values, { setSubmitting }) => {
        console.log('Form data', values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-12">
          <article>
            <h2 className="text-lg font-bold mb-4 text-gray-700">Formulaire Principal</h2>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
              <Field
                type="email"
                name="email"
                className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Mot de passe</label>
              <Field
                type="password"
                name="password"
                className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
              <Field
                as="textarea"
                name="message"
                className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage name="message" component="div" className="text-red-500 text-xs mt-1" />
            </div>
          </article>

          <article className="p-4 bg-gray-100 rounded-lg shadow-inner mt-6">
            <h2 className="text-lg font-bold mb-4 text-gray-700">Coordonnées</h2>
            <div className="mb-4">
              <label htmlFor="linkedin" className="block text-gray-700 font-bold mb-2">LinkedIn</label>
              <Field
                type="url"
                name="linkedin"
                className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage name="linkedin" component="div" className="text-red-500 text-xs mt-1" />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Téléphone</label>
              <Field
                type="text"
                name="phone"
                className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage name="phone" component="div" className="text-red-500 text-xs mt-1" />
            </div>
          </article>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-6"
          >
            Soumettre
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Formulaire;
