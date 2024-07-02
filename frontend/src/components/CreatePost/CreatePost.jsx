import React, { useContext, useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { format } from 'date-fns';
import { DocumentArrowUpIcon } from '@heroicons/react/20/solid';
import { ServiceContext } from '../../contexts/ServiceContext';
import defaultImage from '../../assets/user-icon.jpg'

const CreatePost = () => {
    // Utilisation du contexte ServiceContext pour accéder à la fonction addService
    const { addService } = useContext(ServiceContext);

    // État local pour stocker les catégories récupérées depuis le backend
    const [categories, setCategories] = useState([]);

    // Effet useEffect pour charger les catégories une seule fois au montage du composant
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/categoryservice');
                setCategories(response.data); // Met à jour l'état local avec les données des catégories
            } catch (err) {
                console.error('Erreur lors du chargement des catégories:', err);
            }
        };
        fetchCategories(); // Appel de la fonction fetchCategories au chargement du composant
    }, []); // Le tableau vide [] signifie que cet effet s'exécute uniquement une fois

    // Initialisation des valeurs initiales du formulaire
    const initialValues = {
        title: '',
        description: '',
        category: '',
        image: null, // Image sélectionnée par l'utilisateur
    };

    // Schéma de validation Yup pour valider les champs du formulaire
    const validationSchema = Yup.object({
        title: Yup.string()
            .max(100, 'Doit comporter 100 caractères ou moins')
            .required('Requis'),
        description: Yup.string()
            .max(250, 'Doit comporter 250 caractères ou moins')
            .required('Requis'),
        category: Yup.string().required('Requis'),
        image: Yup.mixed() // Champ mixte pour valider le type et la taille des fichiers image
            .notRequired()
            .test('fileFormat', 'Seuls les fichiers image sont autorisés', (value) => {
                if (value) {
                    const supportedFormats = ['image/jpeg', 'image/png', 'image/gif'];
                    return supportedFormats.includes(value.type); // Vérifie si le type de fichier est pris en charge
                }
                return true; // Retourne true si aucun fichier n'est téléchargé
            })
            .test('fileSize', 'La taille du fichier ne doit pas dépasser 3 Mo', (value) => {
                if (value) {
                    return value.size <= 3145728; // Vérifie si la taille du fichier ne dépasse pas 3 Mo
                }
                return true; // Retourne true si aucun fichier n'est téléchargé
            }),
    });

    // Fonction onSubmit appelée lors de la soumission du formulaire
    const onSubmit = async (values, { setSubmitting, setFieldError, resetForm }) => {
        const currentDate = new Date();
        const formattedDate = format(currentDate, 'dd/MM/yyyy'); // Formatage de la date actuelle

        let illustration = null; // Initialisation de l'illustration à null

        // Vérifie si une image est sélectionnée par l'utilisateur
        if (values.image) {
            // Convertit l'image en base64 ou en FormData si nécessaire
            illustration = await convertImage(values.image);
        } else {
            // Utilise l'image par défaut si aucune image n'est sélectionnée
            illustration = await getDefaultImage();
        }

        // Crée l'objet postData à envoyer dans la requête POST
        const postData = {
            titre: values.title, // Titre du service depuis le formulaire
            description: values.description, // Description du service depuis le formulaire
            illustration: illustration, // Image en base64 ou image par défaut
            date: formattedDate, // Date formatée du jour
            user_id: 1, // ID de l'utilisateur (à remplacer par l'ID réel de l'utilisateur)
            message_id: 1, // ID du message (à remplacer par l'ID réel du message)
        };

        try {
            // Envoi de la requête POST au serveur avec les données postData
            const response = await axios.post('http://localhost:5000/service', postData);

            // Ajoute le service nouvellement créé à l'état global via addService
            addService(response.data);

            // Réinitialise le formulaire après la soumission réussie
            resetForm();
        } catch (error) {
            console.error('Erreur lors de la publication:', error);

            // Définit une erreur de champ général si la soumission échoue
            setFieldError('general', 'Échec de la publication, veuillez réessayer plus tard');
        } finally {
            // Définit setSubmitting à false pour activer à nouveau le bouton de soumission
            setSubmitting(false);
        }
    };

    // Fonction utilitaire pour convertir une image en base64
    const convertImage = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file); // Lecture du fichier en tant que DataURL
            reader.onload = () => resolve(reader.result); // Résout avec le résultat du DataURL
            reader.onerror = (error) => reject(error); // Rejette en cas d'erreur de lecture
        });
    };

    // Fonction pour obtenir l'image par défaut depuis les assets
    const getDefaultImage = async () => {
        try {
            const response = await fetch(defaultImage); // Récupère l'image par défaut depuis les assets
            const blob = await response.blob(); // Convertit la réponse en objet Blob
            return await convertImage(blob); // Convertit le Blob en base64 et renvoie le résultat
        } catch (error) {
            console.error('Erreur lors du chargement de l\'image par défaut:', error);
            return null; // Retourne null en cas d'erreur de chargement de l'image par défaut
        }
    };

    return (
        <div className="px-4 py-8">
            {/* Composant Formik pour gérer le formulaire avec initialValues, validationSchema et onSubmit */}
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ getFieldProps, setFieldValue, resetForm, values, errors, isSubmitting }) => (
                    <Form className="m-auto flex flex-col max-w-lg p-2 bg-white rounded-lg shadow-lg text-black">
                        <h1 className="text-xl font-semibold px-2">Créer un service</h1>

                        {/* Champ de titre du service */}
                        <div className="flex flex-col p-2">
                            <label htmlFor="title">Titre</label>
                            <Field
                                id="title"
                                type="text"
                                {...getFieldProps('title')} // Lie les propriétés du champ avec Formik
                                className="border-solid border-2 rounded-md border-dark bg-white box-border py-2 px-2"
                            />
                            <ErrorMessage name="title" component="div" className="error text-primary" />
                        </div>

                        {/* Champ de description du service */}
                        <div className="flex flex-col p-2">
                            <label htmlFor="description">Description</label>
                            <Field
                                id="description"
                                as="textarea"
                                {...getFieldProps('description')} // Lie les propriétés du champ avec Formik
                                className="border-solid border-2 rounded-md border-dark bg-white resize-none box-border py-2 px-2"
                                rows={4}
                            />
                            <ErrorMessage name="description" component="div" className="error text-primary" />
                        </div>

                        {/* Champ de catégorie du service */}
                        <div className="flex flex-col p-2">
                            <label htmlFor="category">Catégorie</label>
                            <Field
                                id="category"
                                as="select"
                                {...getFieldProps('category')} // Lie les propriétés du champ avec Formik
                                className="border-solid border-2 rounded-md border-dark bg-white py-2 px-2"
                            >
                                <option value="">Choisissez une catégorie</option>
                                {/* Affiche les options de catégorie récupérées depuis l'état local */}
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.titre_catégorie} - {category.titre_sous_catégorie}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="category" component="div" className="error text-primary" />
                        </div>

                        {/* Champ d'image facultative pour le service */}
                        <div className="flex flex-col items-start p-2">
                            <label htmlFor="image">Image (facultative)</label>
                            <input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={(event) => setFieldValue('image', event.currentTarget.files[0])} // Met à jour l'image sélectionnée dans Formik
                                className="hidden"
                            />
                            <div className="flex flex-col w-1/2">
                                <label
                                    htmlFor="image"
                                    className="border-solid border-2 p-2 rounded-md border-dark w-2/4 flex justify-center cursor-pointer"
                                >
                                    <DocumentArrowUpIcon className="text-dark w-2/4 py-4" />
                                </label>
                                <span id="file-chosen">
                                    {/* Affiche le nom du fichier sélectionné ou un message par défaut */}
                                    {values.image ? values.image.name : 'Aucun fichier choisi'}
                                </span>
                            </div>
                            {/* Bouton pour retirer l'image sélectionnée */}
                            <button
                                type="button"
                                onClick={() => {
                                    setFieldValue('image', null); // Réinitialise l'image sélectionnée
                                    document.getElementById('image').value = ''; // Efface la sélection de fichier
                                }}
                                className="border-solid border-2 border-dark text-dark rounded-lg p-2"
                            >
                                Retirer le fichier
                            </button>
                            <ErrorMessage name="image" component="div" className="error text-primary" />
                        </div>

                        {/* Section des boutons de soumission et réinitialisation */}
                        <div className="flex justify-end gap-2 m-2">
                            {/* Bouton pour réinitialiser le formulaire */}
                            <button
                                type="button"
                                onClick={() => resetForm()} // Réinitialise les valeurs du formulaire
                                className="border-solid border-2 rounded-lg p-2 bg-primary font-semibold"
                            >
                                Supprimer
                            </button>
                            {/* Bouton de soumission du formulaire */}
                            <button
                                type="submit"
                                className="border-solid border-2 rounded-lg p-2 bg-accent font-semibold text-white"
                                disabled={isSubmitting} // Désactive le bouton de soumission pendant la soumission
                            >
                                {/* Affiche "Publication en cours..." pendant la soumission */}
                                {isSubmitting ? 'Publication en cours...' : 'Publier'}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CreatePost;
