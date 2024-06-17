import { useRef } from "react";
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';

// Composant réutilisable pour les champs de texte
const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div className="flex flex-col p-2">
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className='border-solid border-2' {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};

// Composant réutilisable pour les champs select
const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div className="flex flex-col p-2">
            <label htmlFor={props.id || props.name}>{label}</label>
            <select className='border-solid border-2' {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};

// Composant réutilisable pour les champs file input
const MyFileInput = ({ label, setFieldValue, ...props }) => {
    const [meta] = useField(props);

    const handleChange = (event) => {
        const file = event.currentTarget.files[0];
        setFieldValue(props.name, file);
        console.log(props.name, file);
    };

    // Utilisation de React useRef pour créer une référence mutable qui persiste pendant tout le cycle de vie du composant.
    const inputFile = useRef(null);

    // Déclaration de la fonction handleRemove qui réinitialise l'input file.
    const handleRemove = () => {
        // Vérifie si la référence inputFile pointe vers un élément DOM.
        if (inputFile.current) {
            // Réinitialise la valeur de l'input file à une chaîne vide, effaçant ainsi le fichier sélectionné.
            inputFile.current.value = "";
            
            // Change le type de l'input de "file" à "text" temporairement, puis le remet à "file". Cela force un re-render de l'input, permettant ainsi de sélectionner le même fichier à nouveau.
            inputFile.current.type = "text";
            inputFile.current.type = "file";
        }
    };

    return (
        <div className="flex flex-col items-start p-2">
            <label htmlFor={props.id || props.name}>{label}</label>
            <input {...props} onChange={handleChange} ref={inputFile} />
            <button className='border-solid border-2 p-2' type="button" onClick={handleRemove}>Retirer le fichier</button>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};

const PublishForm = () => {
    // Référence pour le contenu du formulaire
    const postContent = useRef(null);

    // Fonction handleReset pour réinitialiser le formulaire
    const handleReset = (resetForm) => {
        // Si la référence postContent est définie, réinitialise sa valeur à une chaîne vide
        if (postContent.current) {
            postContent.current.value = '';
        }
        // Réinitialise tout le formulaire
        resetForm();
    };

    return (
        <div>
            <Formik
                initialValues={{
                    title: '',
                    desc: '',
                    category: '',
                    image: '',
                    user_id: '',
                    message_id: ''
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
                        date: new Date().toISOString(), // Date actuelle
                        user_id: null,
                        message_id: null
                    };

                    console.log("Nouveau post :", post);
                    setSubmitting(false);
                    resetForm();
                }}
            >
                {({ setFieldValue, resetForm }) => (
                    <Form className="flex flex-col items-center p-1">
                        <MyTextInput
                            label="Titre"
                            name="title"
                            type="text"
                            placeholder="Saisir un titre"
                        />

                        <MyTextInput
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
                        />

                        <button className='border-solid border-2 p-2' type="button" onClick={() => handleReset(resetForm)}>Supprimer</button>
                        <button className='border-solid border-2 p-2' type="submit">Publier</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default PublishForm;
