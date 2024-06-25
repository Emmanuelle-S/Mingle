import React from "react";
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { useLocation } from 'react-router-dom';

// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required('Champs obligatoire'),
  email: Yup.string().email('Adresse mail invalide').required('Champs obligatoire'),
  ville: Yup.string().required('Champs obligatoire'),
  bio: Yup.string(),
  services: Yup.string().required('Champs obligatoire'),
  profilPic: Yup.mixed(),
});

// Custom input components
const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-4">
      <label className="block text-darkslategray text-sm font-bold mb-2" htmlFor={props.id || props.name}>{label}</label>
      <input
        className="mt-1 text-m rounded-lg border border-darkslategray p-1 w-full max-w-lg"
        {...field} {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-xs italic">{meta.error}</div>
      ) : null}
    </div>
  );
};

const MyTextarea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-4 mx-auto flex justify-center">
      <label className="block text-darkslategray text-sm font-bold mb-2" htmlFor={props.id || props.name}>{label}</label>
      <textarea
        className="mt-1 text-m rounded-lg border border-darkslategray p-1 w-full max-w-lg"
        {...field} {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-xs italic">{meta.error}</div>
      ) : null}
    </div>
  );
};

const MyFileInput = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  const handleChange = (e) => {
    setValue(e.currentTarget.files[0]);
  };

  return (
    <div className="mb-4">
      <label className="block text-darkslategray text-sm font-bold mb-2" htmlFor={props.id || props.name}>{label}</label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-darkslategray leading-tight focus:outline-none focus:shadow-outline"
        type="file"
        onChange={handleChange}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-xs italic">{meta.error}</div>
      ) : null}
      {field.value && typeof field.value === 'object' && (
        <div className="text-sm mt-2">{field.value.name}</div>
      )}
    </div>
  );
};

const EditProfil = () => {
  const location = useLocation();
  const { userData } = location.state || { userData: {} };

  const initialValues = {
    name: userData.username || '',
    email: userData.mail || '',
    ville: userData.localisation || '',
    bio: userData.biographie || '',
    services: userData.service_type || '',
    profilPic: null,
  };

  const handleSubmit = (values) => {
    const formattedValues = {
      ...values,
      services: values.services,  // Just a string, no need to transform
    };
    console.log(formattedValues);
    // Send formattedValues to the server here
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values }) => (
        <Form className="max-w-screen-lg mx-auto px-6 py-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center text-darkslategray">Editer le profil</h1>

          <div className="md:flex md:space-x-8 mb-8 bg-white p-4 rounded-lg border border-gray-300 shadow-2xl">
            <div className="md:w-1/2 bg-white rounded-lg p-4">
              <h2 className="text-2xl font-bold mb-4 text-darkslategray text-center">Informations personnelles</h2>
              <MyTextInput label="Nom" name="name" type="text"/>
              <MyTextInput label="Email" name="email" type="email" />
              <MyTextInput label="Ville" name="ville" type="text"/>
            </div>
            <div className="md:w-1/2 mt-6 md:mt-0 bg-white rounded-lg p-4">
              <h2 className="text-2xl font-bold mb-4 text-darkslategray text-center">Photo de profil</h2>
              {userData.avatar && (
                <div className="text-center mb-4">
                  <img
                    src={userData.avatar}
                    alt="Photo de profil"
                    className="rounded-full mx-auto mb-2 max-w-full h-auto"
                  />
                </div>
              )}
              <MyFileInput label="Changer de photo de profil" name="profilPic" />
            </div>
          </div>

          <div className="mb-8 bg-white rounded-lg p-4 border border-gray-300 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-darkslategray text-center">Biographie</h2>
            <MyTextarea label="" name="bio" />
          </div>

          <div className="mb-8 bg-white rounded-lg p-4 border border-gray-300 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-darkslategray text-center">Types de services proposés</h2>
            <MyTextarea label="" name="services" />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-accent hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline"
            >
              Enregistrer
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditProfil;
