import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


// Schéma de validation
const validationFormulaire = Yup.object({
  email: Yup.string().email('Adresse mail invalide').required('Saisissez votre adresse mail'),
  password: Yup.string()
    .min(6, 'Le mot de passe doit contenir 6 caractères minimum')
    .matches(/[^A-Za-z0-9]/, 'Saisissez l objet de votre message')
    .required('Saisissez votre objet'),
  message: Yup.string().required('Que puis-je faire pour vous ?'),
});

const Formulaire = () => {
  return (
    <Formik
      initialValues={{ email: '', password: '', message: '' }}
      validationSchema={validationFormulaire}
      onSubmit={(values, { setSubmitting }) => {
        console.log('Form data', values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <div className="flex items-center justify-center min-h-screen ">
          <Form className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
            <div className="flex flex-col items-center">
              <article className="w-full p-4">
                <h2 className="text-lg font-bold mb-4 text-gray-700 text-center">Formulaire de contact</h2>
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
                  <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Objet</label>
                  <Field
                    type="string"
                    name="string"
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
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
              >
                Envoyer
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Formulaire;
