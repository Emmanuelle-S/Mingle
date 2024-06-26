import React from "react";
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { useLocation } from 'react-router-dom';
import axios from "axios";

// Validation schema using Yup
const validationSchema = Yup.object({
  username: Yup.string().required('Champs obligatoire'),
  mail: Yup.string().email('Adresse mail invalide').required('Champs obligatoire'),
  localisation: Yup.string().required('Champs obligatoire'),
  biographie: Yup.string(),
  service_type: Yup.string().required('Champs obligatoire'),
  avatar: Yup.mixed(),
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
  const { userData } = location.state || { userData: {} };

  const initialValues = {
    username: userData.username || '',
    mail: userData.mail || '',
    localisation: userData.localisation || '',
    biographie: userData.biographie || '', // Corrigé de 'biographiegraphie'
    service_type: userData.service_type || '',
    avatar: userData.avatar || '',
  };

  const handleSubmit = async (values) => {
    try {
      // Créer l'objet payload pour envoyer les données y compris le fichier (si présent)
      const payload = {
        username: values.username,
        mail: values.mail,
        localisation: values.localisation,
        biographie: values.biographie, // Corrigé de 'biographiegraphie'
        service_type: values.service_type,
        avatar: values.avatar,
      }; 

      // Récupérer l'ID de l'utilisateur depuis le localStorage
      const userId = localStorage.getItem('userId');

      // Utiliser Axios pour envoyer les données au serveur via PUT
      const response = await axios.put(`http://localhost:5000/users/${userId}`, payload, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Ajouter le token aux en-têtes
          'Content-Type': 'application/json', // Spécifier le type de contenu JSON
        },
      });

      console.log('Réponse de l\'API:', response);

      if (!response.data.success) {
        throw new Error('Erreur lors de la mise à jour du profil');
      }

      // Gérer la réponse du serveur comme nécessaire
      console.log('Profil mis à jour avec succès:', response.data.message);

      // Redirection ou autre logique après la mise à jour réussie
      // history.push('/profil'); // Exemple de redirection après la mise à jour

    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      // Gérer les erreurs et afficher un message à l'utilisateur si nécessaire
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
              <MyTextInput label="Nom" name="username" type="text"/> {/* Corrigé de 'name' */}
              <MyTextInput label="Email" name="mail" type="email" /> {/* Corrigé de 'email' */}
              <MyTextInput label="Ville" name="localisation" type="text"/> {/* Corrigé de 'ville' */}
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
              <MyFileInput label="Changer de photo de profil" name="avatar" /> {/* Corrigé de 'profilPic' */}
            </div>
          </div>

          <div className="mb-8 bg-white rounded-lg p-4 border border-gray-300 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-darkslategray text-center">Biographie</h2>
            <MyTextarea label="" name="biographie" /> {/* Corrigé de 'bio' */}
          </div>

          <div className="mb-8 bg-white rounded-lg p-4 border border-gray-300 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-darkslategray text-center">Types de services proposés</h2>
            <MyTextarea label="" name="service_type" /> {/* Corrigé de 'services' */}
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
