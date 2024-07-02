import React, { useContext, useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { format } from 'date-fns';
import { DocumentArrowUpIcon } from '@heroicons/react/20/solid';
import { ServiceContext } from '../../contexts/ServiceContext';
import { AuthContext } from '../../contexts/AuthContext';

const CreatePost = () => {
    // Utilisation du contexte ServiceContext pour accéder à la fonction addService
    const { addService } = useContext(ServiceContext);
    const { isLoggedIn } = useContext(AuthContext); // Utilisez le contexte d'authentification pour vérifier l'état de connexion

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/categoryservice');
                setCategories(response.data);
            } catch (err) {
                console.error('Erreur lors du chargement des catégories:', err);
            }
        };
        fetchCategories();
    }, []);

    const initialValues = {
        title: '',
        description: '',
        category: '',
        image: null,
    };

    const validationSchema = Yup.object({
        title: Yup.string()
            .max(100, 'Doit comporter 100 caractères ou moins')
            .required('Requis'),
        description: Yup.string()
            .max(250, 'Doit comporter 250 caractères ou moins')
            .required('Requis'),
        category: Yup.string().required('Requis'),
        image: Yup.mixed()
            .notRequired()
            .test('fileFormat', 'Seuls les fichiers image sont autorisés', (value) => {
                if (value) {
                    const supportedFormats = ['image/jpeg', 'image/png', 'image/gif'];
                    return supportedFormats.includes(value.type);
                }
                return true;
            })
            .test('fileSize', 'La taille du fichier ne doit pas dépasser 3 Mo', (value) => {
                if (value) {
                    return value.size <= 3145728;
                }
                return true;
            }),
    });

    const onSubmit = async (values, { setSubmitting, setFieldError, resetForm }) => {
        if (!isLoggedIn) {
            console.error('L\'utilisateur n\'est pas connecté.');
            return;
        }

        const currentDate = new Date();
        const formattedDate = format(currentDate, 'dd/MM/yyyy');
        const userId = localStorage.getItem('userId'); // Récupérez l'ID de l'utilisateur connecté depuis localStorage

        let illustration = null;

        if (values.image) {
            illustration = await convertImage(values.image);
        }

        // Crée l'objet postData à envoyer dans la requête POST
        const postData = {
            titre: values.title,
            description: values.description,
            date: formattedDate,
            user_id: userId,
            message_id: 1,
        };

        if (illustration) {
            postData.illustration = illustration; // Ajoutez l'illustration seulement si elle est présente
        }

        try {
            const response = await axios.post('http://localhost:5000/service', postData);
            addService(response.data);
            resetForm();
        } catch (error) {
            console.error('Erreur lors de la publication:', error);
            setFieldError('general', 'Échec de la publication, veuillez réessayer plus tard');
        } finally {
            setSubmitting(false);
        }
    };

    const convertImage = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    return (
        <div className="px-4 py-8">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ getFieldProps, setFieldValue, resetForm, values, errors, isSubmitting }) => (
                    <Form className="m-auto flex flex-col max-w-lg p-2 bg-white rounded-lg shadow-lg text-black">
                        <h1 className="text-xl font-semibold px-2">Créer un service</h1>

                        <div className="flex flex-col p-2">
                            <label htmlFor="title">Titre</label>
                            <Field
                                id="title"
                                type="text"
                                {...getFieldProps('title')}
                                className="border-solid border-2 rounded-md border-dark bg-white box-border py-2 px-2"
                            />
                            <ErrorMessage name="title" component="div" className="error text-primary" />
                        </div>

                        <div className="flex flex-col p-2">
                            <label htmlFor="description">Description</label>
                            <Field
                                id="description"
                                as="textarea"
                                {...getFieldProps('description')}
                                className="border-solid border-2 rounded-md border-dark bg-white resize-none box-border py-2 px-2"
                                rows={4}
                            />
                            <ErrorMessage name="description" component="div" className="error text-primary" />
                        </div>

                        <div className="flex flex-col p-2">
                            <label htmlFor="category">Catégorie</label>
                            <Field
                                id="category"
                                as="select"
                                {...getFieldProps('category')}
                                className="border-solid border-2 rounded-md border-dark bg-white py-2 px-2"
                            >
                                <option value="">Choisissez une catégorie</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.titre_catégorie} - {category.titre_sous_catégorie}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="category" component="div" className="error text-primary" />
                        </div>

                        <div className="flex flex-col items-start p-2">
                            <label htmlFor="image">Image (facultative)</label>
                            <input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={(event) => setFieldValue('image', event.currentTarget.files[0])}
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
                                    {values.image ? values.image.name : 'Aucun fichier choisi'}
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    setFieldValue('image', null);
                                    document.getElementById('image').value = '';
                                }}
                                className="border-solid border-2 border-dark text-dark rounded-lg p-2"
                            >
                                Retirer le fichier
                            </button>
                            <ErrorMessage name="image" component="div" className="error text-primary" />
                        </div>

                        <div className="flex justify-end gap-2 m-2">
                            <button
                                type="button"
                                onClick={() => resetForm()}
                                className="border-solid border-2 rounded-lg p-2 bg-primary font-semibold"
                            >
                                Supprimer
                            </button>
                            <button
                                type="submit"
                                className="border-solid border-2 rounded-lg p-2 bg-accent font-semibold text-white"
                                disabled={isSubmitting}
                            >
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
