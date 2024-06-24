import { useContext, useEffect, useRef } from "react"; // Importation de useRef de React
import { Formik, Form, useField } from 'formik'; // Importation de Formik et des hooks Formik nécessaires
import * as Yup from 'yup'; // Importation de Yup pour la validation
import axios from "axios";
import { DocumentArrowUpIcon } from '@heroicons/react/20/solid'
import { ServiceContext } from "../../contexts/ServiceContext";

// Composant réutilisable pour les champs de texte
const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props); // Utilisation de useField pour se lier aux champs Formik

    return (
        <div className="flex flex-col p-2">
            <label  htmlFor={props.id}>{label}</label> {/* Étiquette pour le champ de texte */}
            <input className='border-solid border-2 rounded-md border-dark bg-white box-border py-2 px-2' {...field} {...props} /> {/* Champ de texte avec les propriétés Formik */}
            {meta.touched && meta.error ? ( // Affichage des erreurs de validation si le champ a été touché et qu'il y a une erreur
                <div className="error text-primary">{meta.error}</div>
            ) : null}
        </div>
    );
};

const MyTextAreaInput = ({ label, ...props }) => {
    const [field, meta] = useField(props); // Utilisation de useField pour se lier aux champs Formik

    return (
        <div className="flex flex-col p-2">
            <label  htmlFor={props.id}>{label}</label> {/* Étiquette pour le champ de texte */}
            <textarea className='border-solid border-2 rounded-md border-dark bg-white resize-none box-border py-2 px-2' {...field} {...props}  rows={4} /> {/* Champ de texte avec les propriétés Formik */}
            {meta.touched && meta.error ? ( // Affichage des erreurs de validation si le champ a été touché et qu'il y a une erreur
                <div className="error text-primary">{meta.error}</div>
            ) : null}
        </div>
    );
};

// Composant réutilisable pour les champs select
const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props); // Utilisation de useField pour se lier aux champs Formik

    return (
        <div className="flex flex-col p-2">
            <label htmlFor={props.id}>{label}</label> {/* Étiquette pour le champ select */}
            <select className='border-solid border-2 rounded-md border-dark bg-white py-2 px-2' {...field} {...props} /> {/* Champ select avec les propriétés Formik */}
            {meta.touched && meta.error ? ( // Affichage des erreurs de validation si le champ a été touché et qu'il y a une erreur
                <div className="error text-primary">{meta.error}</div>
            ) : null}
        </div>
    );
};

// Composant réutilisable pour les champs file input
const MyFileInput = ({ label, setFieldValue, setHandleRemoveRef, ...props }) => {
    const [meta] = useField(props); // Utilisation de useField pour se lier aux champs Formik

    const inputFile = useRef(null); // Création d'une référence pour l'input file
    const fileChosen = useRef(null); // Création d'une référence pour afficher le nom du fichier choisi

    const handleChange = (event) => {
        const file = event.currentTarget.files[0]; // Récupération du fichier sélectionné
        setFieldValue(props.name, file); // Mise à jour de la valeur du champ Formik avec le fichier
        if (fileChosen.current) {
            fileChosen.current.textContent = file ? file.name : "Aucun fichier choisi"; // Mise à jour du texte affiché
        }
    };

    // Déclaration de la fonction handleRemove qui réinitialise l'input file.
    const handleRemove = () => {
        if (inputFile.current) {
            inputFile.current.value = ""; // Réinitialisation de la valeur de l'input file
            inputFile.current.type = "text"; // Changement temporaire du type pour forcer un re-render
            inputFile.current.type = "file";
        }
        if (fileChosen.current) {
            fileChosen.current.textContent = "Aucun fichier choisi"; // Réinitialisation du texte affiché
        }
    };

    useEffect(() => {
        if (setHandleRemoveRef) {
            setHandleRemoveRef.current = handleRemove;
        }
    }, [setHandleRemoveRef]);

    return (
        <div className="flex flex-col items-start p-2">
            <label htmlFor={props.id}>{label}</label> {/* Étiquette pour le champ file input */}
            <input id="actual-btn" {...props} onChange={handleChange} ref={inputFile} hidden/> {/* Champ file input avec onChange */}
            <div className="flex flex-col  w-1/2">
                <label className="border-solid border-2 p-2 rounded-md border-dark w-2/4 flex justify-center cursor-pointer" htmlFor="actual-btn">
                    <DocumentArrowUpIcon className="text-dark w-2/4 py-4" />
                </label> {/* Étiquette cliquable pour l'input */}
                <span id="file-chosen" ref={fileChosen}>Aucun fichier choisi</span> {/* Texte affichant le nom du fichier */}
            </div>
            <button className='border-solid border-2 border-dark text-dark rounded-lg p-2' type="button" onClick={handleRemove}>Retirer le fichier</button> {/* Bouton pour retirer le fichier */}
            {meta.touched && meta.error ? ( // Affichage des erreurs de validation si le champ a été touché et qu'il y a une erreur
                <div className="error text-primary">{meta.error}</div>
            ) : null}
        </div>
    );
};

// Composant principal pour créer un post
const CreatePost = () => {
    const { services, addService } = useContext(ServiceContext);
    const handleRemoveRef = useRef(null);

    useEffect(() => {
        console.log("Services have been updated:", services)
    }, [services])

    const postContent = useRef(null); // Référence pour le contenu du formulaire

    // Fonction handleReset pour réinitialiser le formulaire
    const handleReset = (resetForm) => {
        if (postContent.current) {
            postContent.current.value = ''; // Réinitialisation du contenu de la référence
        }

        if (handleRemoveRef.current) {
            handleRemoveRef.current();
        }

        resetForm(); // Réinitialisation du formulaire Formik
    };

    const handleSubmit = async() => {
        try {
            const response = await axios.get('http://localhost:5000/service');
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="px-4 py-8">
            <Formik
                initialValues={{
                    title: '', // Valeurs initiales pour les champs
                    desc: '',
                    category: '',
                    image: '',
                }}
                validationSchema={Yup.object({
                    title: Yup.string()
                        .max(100, 'Doit comporter 100 caractères ou moins')
                        .required('Requis'),
                    desc: Yup.string()
                        .max(250, 'Doit comporter 250 caractères ou moins')
                        .required('Requis'),
                    category: Yup.string()
                        .oneOf(['1', '2', '3'], 'Catégorie invalide')
                        .required('Requis'),
                    image: Yup.mixed()
                        .test('fileFormat', 'Seuls les fichiers image sont autorisés', (value) => {
                            if (value) {
                                if (typeof value.type === 'string') {
                                    const supportedFormats = ['jpg', 'jpeg', 'png', 'gif'];
                                    return supportedFormats.includes(value.type.split('/')[1].toLowerCase());
                                }
                                return false;
                            }
                            return true; // Aucun fichier sélectionné, la validation réussit
                        })
                        .test('fileSize', 'La taille du fichier ne doit pas dépasser 3 Mo', (value) => {
                            if (value) {
                                return value.size <= 3145728; // 3 MB en octets
                            }
                            return true; // La validation réussit si aucun fichier n'est sélectionné
                        }),
                })}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    const post = {
                        id: null, // Laisser null car l'id est auto-incrémenté
                        title: values.title,
                        description: values.desc,
                        illustration: values.image ? values.image.name : '',
                        date: new Date().toString(), // Date actuelle
                        user_id: null,
                        message_id: null
                    };

                    addService(post);

                    console.log("Nouveau post :", post); // Affichage des données du post pour debug
                    setSubmitting(false); // Arrêt de la soumission
                    if (handleRemoveRef.current) {
                        handleRemoveRef.current();
                    }
                    resetForm(); // Réinitialisation du formulaire après soumission
                    handleSubmit();
                }}
            >
                {({ setFieldValue, resetForm }) => (
                    <div>
                        <Form className="m-auto flex flex-col max-w-lg p-2 bg-white rounded-lg drop-shadow-lg text-black">
                            <h1 className="text-xl font-semibold px-2">Créer un service</h1>
                            <MyTextInput
                                label="Titre"
                                name="title"
                                type="text"
                                placeholder="Saisir un titre"
                            />

                            <MyTextAreaInput
                                label="Description"
                                name="desc"
                                type="text"
                                placeholder="Saisir une description"
                            />

                            <MySelect label="Categorie" name="category">
                                <option value="">Choisissez une catégorie</option>
                                <option value="1">Category 1</option>
                                <option value="2">Category 2</option>
                                <option value="3">Category 3</option>
                            </MySelect>

                            <MyFileInput
                                label="Image (facultative)"
                                name="image"
                                type="file"
                                accept="image/*"
                                setFieldValue={setFieldValue}
                                setHandleRemoveRef={handleRemoveRef}
                            />

                            <div className="flex justify-end gap-2 m-2">
                                <button className='border-solid border-2 rounded-lg p-2 bg-primary font-semibold' type="button" onClick={() => handleReset(resetForm)}>Supprimer</button>
                                <button className='border-solid border-2 rounded-lg p-2 bg-accent font-semibold text-white' type="submit">Publier</button>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>
        </div>
    );
};

export default CreatePost;
