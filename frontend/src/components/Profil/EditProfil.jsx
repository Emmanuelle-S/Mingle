import React from "react";
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import { validerServices } from './path/to/your/function';  // Importez la fonction de validation

const validationSchema = Yup.object({
  username: Yup.string().required('Champs obligatoire'),
  mail: Yup.string().email('Adresse mail invalide').required('Champs obligatoire'),
  localisation: Yup.string().required('Champs obligatoire'),
  biographie: Yup.string(),
  service_type: Yup.string().required('Champs obligatoire').test(
    'is-valid-service',
    'Type de service invalide',
    value => validerServices(value)
  ),
  avatar: Yup.mixed(),
});

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
    const file = e.currentTarget.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setValue(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
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
      {field.value && (
        <div className="text-sm mt-2">{typeof field.value === 'string' ? 'Image sélectionnée' : field.value.name}</div>
      )}
    </div>
  );
};

const EditProfil = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userData } = location.state || { userData: {} };

  const initialValues = {
    username: userData.username || '',
    mail: userData.mail || '',
    localisation: userData.localisation || '',
    biographie: userData.biographie || '', 
    service_type: userData.service_type || '',
    avatar: userData.avatar || '',
  };

  const handleSubmit = async (values) => {
    try {
      const payload = {
        username: values.username,
        mail: values.mail,
        localisation: values.localisation,
        biographie: values.biographie, 
        service_type: values.service_type,
        avatar: values.avatar,
      };

      if (values.user_pass) {
        payload.user_pass = values.user_pass;
      }

      const userId = localStorage.getItem('userId');

      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}`, payload, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Réponse de l\'API:', response);

      if (response.status === 204) {
        console.log('Profil mis à jour avec succès.');
        navigate(`/profil/${userId}`);
      } else {
        console.log('Réponse de l\'API:', response);

        if (!response.data.success) {
          throw new Error('Erreur lors de la mise à jour du profil');
        }

        console.log('Profil mis à jour avec succès:', response.data.message);
      }

    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
    }
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
              <MyTextInput label="Nom" name="username" type="text"/>
              <MyTextInput label="Email" name="mail" type="email" />
              <MyTextInput label="Ville" name="localisation" type="text"/>
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
              <MyFileInput label="Changer de photo de profil" name="avatar" />
            </div>
          </div>

          <div className="mb-8 bg-white rounded-lg p-4 border border-gray-300 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-darkslategray text-center">Biographie</h2>
            <MyTextarea label="" name="biographie" />
          </div>

          <div className="mb-8 bg-white rounded-lg p-4 border border-gray-300 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-darkslategray text-center">Types de services proposés</h2>
            <MyTextarea label="" name="service_type" />
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
