import React from 'react';
import {Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { useLocation } from 'react-router-dom';

const validationSchema = Yup.object({
    name: Yup.string().required('Champs obligatoire'),
    email: Yup.string().email('Adresse mail invalide').required('Champs obligatoire'),
    phone: Yup.string().required('Champs obligatoire'),
    address: Yup.string().required('Champs obligatoire'),
    bio: Yup.string(),
    services: Yup.string().required('Champs obligatoire'),
    profilPic: Yup.mixed().required('Champs obligatoire'),
});

const MyTextInput = ({ label, ...props }) => {
  // = fonction fléchée qui prend comme argument un objet destructuré (permet d'extraire les données): contient au moins une propriété label, ainsi que toutes les autres propriétés (props) qui peuvent être passées à l'élément <input>.
    const [field, meta] = useField(props);
// utilise le hook useField fourni par Formik pour lier les champs de formulaire (field) et les métadonnées (meta) à props (inclut la gestion de valeur du champ, évènement de changement, de validation ...)

    return (
        <div className="mb-4">
            <label className="block text-darkslategray text-sm font-bold mb-2" htmlFor={props.id || props.name}>{label}</label>
             {/* htmlFor : défini avec la valeur props.id ou props.name pour associer le label à l'élément <input> correspondant. */}

            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-darkslategray leading-tight focus:outline-none focus:shadow-outline"
                {...field}
                {...props}
                // Les propriétés de field (comme value, onChange, etc.) et toutes les autres props sont étendues à l'élément <input> => transmettre toutes les fonctionnalités et les configurations nécessaires au champ de formulaire.

            />
            {meta.touched && meta.error ? (
                <div className="text-red-500 text-xs italic">{meta.error}</div>
            ) : null}
        </div>
    );
};

const MyTextarea = ({ label, ...props }) => {
   // fonction fléchée qui prend comme argument un objet destructuré (permet d'extraire les données), qui contient au moins une propriété label, ainsi que toutes les autres propriétés (props) qui peuvent être passées à l'élément <textarea>.

    const [field, meta] = useField(props);
     // utilise le hook useField fourni par Formik pour lier les champs de formulaire (field) et les métadonnées (meta) à props (inclut la gestion de la valeur du champ, des événements de changement, de la validation...)

    return (
        <div className="mb-4">
            <label className="block text-darkslategray text-sm font-bold mb-2" htmlFor={props.id || props.name}>{label}</label>
            {/* htmlFor = défini avec la valeur props.id ou props.name pour associer le label à l'élément <textarea> correspondant. */}

            <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-darkslategray leading-tight focus:outline-none focus:shadow-outline"
                {...field}
                {...props}
                // Les propriétés de field (comme value, onChange, etc.) et toutes les autres props sont étendues à l'élément <input> => transmettre toutes les fonctionnalités et les configurations nécessaires au champ de formulaire.

            />
            {meta.touched && meta.error ? (
                <div className="text-red-500 text-xs italic">{meta.error}</div>
            ) : null}
        </div>
    );
};

const MyFileInput = ({ label, ...props }) => {
  // fonction fléchée qui prend comme argument un objet destructuré (permet d'extraire les données), qui contient au moins une propriété label, ainsi que toutes les autres propriétés (props) qui peuvent être passées à l'élément <textarea>.
    const [field, meta, helpers] = useField(props);
    const { setValue } = helpers;
     // utilise le hook useField fourni par Formik pour lier les champs de formulaire (field), les métadonnées (meta) et les fonctions d'assistance (helpers) à props. 
  // setValue = extraite de helpers pour mettre à jour la valeur du champ.
  // Rappel helpers :  fonctions d'assistance qui permettent de manipuler directement la valeur et l'état du champ. Ici utilisé pour extraire la fonction setValue


    const handleChange = (e) => {
        setValue(e.currentTarget.files[0]);
    };
    // appelée lorsque l'utilisateur sélectionne un fichier. Elle récupère le premier fichier sélectionné met à jour la valeur du champ de formulaire avec ce fichier en utilisant setValue.


    return (
        <div className="mb-4">
            <label className="block text-darkslategray text-sm font-bold mb-2" htmlFor={props.id || props.name}>{label}</label>
             {/* htmlFor = défini avec la valeur props.id ou props.name pour associer le label à l'élément <input> correspondant. */}
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-darkslategray leading-tight focus:outline-none focus:shadow-outline"
                type="file"
                onChange={handleChange}
                // fonction handleChange = assignée à l'événement onChange pour gérer la sélection du fichier.

            />
            {meta.touched && meta.error ? (
                <div className="text-red-500 text-xs italic">{meta.error}</div>
            ) : null}
            {field.value && typeof field.value === 'object' && (
                <div className="text-sm mt-2">{field.value.name}</div>
                // Si une valeur est présente dans field.value et que cette valeur est un objet, alors un élément <div> est rendu pour afficher le nom du fichier (field.value.name).

            )}
        </div>
    );
};

const EditProfil = () => {
    const location = useLocation(); 
    // Utilisation du hook useLocation pour accéder aux données passées via la navigation (Profil.jsx)
    const { userData } = location.state || { userData: {} };
    // Extraction des données utilisateur de l'état de la navigation, ou définition d'un objet vide par défaut

    const initialValues = {
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        address: userData.address || '',
        bio: userData.bio || '',
        services: (Array.isArray(userData.services) ? userData.services.join(', ') : userData.services) || '',
        profilPic: null,
    };

    const handleSubmit = (values) => {
        const formattedValues = {
            ...values,
            services: values.services.split(',').map(service => service.trim())
            // Transformation de la chaîne de services en tableau en les séparant par des virgules et en supprimant les espaces superflus, permet de retourner les valeurs extraite du tableau sous forme string, ce qui est attendu lors de la soumission du formulaire
        };
        console.log(formattedValues);
        //pour l'instant elle logue les valeurs du formulaire dans la console, à remplacer avec les données du BACKEND

    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            <Form className="max-w-screen-lg mx-auto px-6 py-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-center text-darkslategray">Editer le profil</h1>

                <div className="md:flex md:space-x-8 mb-8 bg-white p-4 rounded-lg  border border-gray-300 shadow-2xl">
                    <div className="md:w-1/2 bg-white rounded-lg p-4">
                        <h2 className="text-2xl font-bold mb-4 text-darkslategray text-center">Informations personnelles</h2>
                        <MyTextInput label="Nom" name="name" type="text" />
                        <MyTextInput label="Email" name="email" type="email" />
                        <MyTextInput label="Téléphone" name="phone" type="text" />
                        <MyTextInput label="Adresse" name="address" type="text" />
                    </div>
                    <div className="md:w-1/2 mt-6 md:mt-0 bg-white rounded-lg p-4">
                        <h2 className="text-2xl font-bold mb-4 text-darkslategray text-center">Photo de profil</h2>
                        <MyFileInput label="Photo de profil" name="profilPic" />
                    </div>
                </div>

                <div className="mb-8 bg-white rounded-lg p-4 border border-gray-300 shadow-2xl">
                    <h2 className="text-2xl font-bold mb-4 text-darkslategray text-center">Biographie</h2>
                    <MyTextarea label="Biographie" name="bio" />
                </div>

                <div className="mb-8 bg-white rounded-lg p-4 border border-gray-300 shadow-2xl">
                    <h2 className="text-2xl font-bold mb-4 text-darkslategray text-center">Types de services proposés</h2>
                    <MyTextarea label="Services proposés" name="services" />
                </div>

                <div className="mt-4 text-center">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-4 px-12 rounded-lg text-xl font-medium focus:outline-none focus:shadow-outline">
                        Enregistrer
                    </button>
                </div>
            </Form>
        </Formik>
    );
};

export default EditProfil;
