import '../../App.css';
import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Champs obligatoire'),
  email: Yup.string().email('Adresse mail invalide').required('Champs obligatoire'),
  phone: Yup.string().required('Champs obligatoire'),
  address: Yup.string().required('Champs obligatoire'),
  bio: Yup.string(),
  services: Yup.string().required('Champs obligatoire'),
  profilePicture: Yup.mixed().required('Champs obligatoire'),
});

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={props.id || props.name}>{label}</label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-xs italic">{meta.error}</div>
      ) : null}
    </div>
  );
};

const MyTextarea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={props.id || props.name}>{label}</label>
      <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...field} {...props} />
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
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={props.id || props.name}>{label}</label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="file" onChange={handleChange} />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-xs italic">{meta.error}</div>
      ) : null}
    </div>
  );
};


const EditProfil = () => {
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        phone: '',
        address: '',
        bio: '',
        services: '',
        profilePicture: null,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <Form className="max-w-lg mx-auto p-4">
        <h1>Votre profil Mingle</h1>
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4 text-darkslategray">Informations personnelles</h2>
            <MyTextInput label="Nom" name="name" type="text" />
            <MyTextInput label="Email" name="email" type="email" />
            <MyTextInput label="Téléphone" name="phone" type="text" />
            <MyTextInput label="Adresse" name="address" type="text" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4">Photo de profil et biographie</h2>
            <MyFileInput label="Photo de profil" name="profilePicture" />
            <MyTextarea label="Biographie" name="bio" />
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Types de services proposer</h2>
          <MyTextarea label="Types de services proposer" name="services" />
        </div>
        <div className="mt-4">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Enregistrer
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default EditProfil;