import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';

// Composant réutilisable pour les champs de texte
const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div className="form-control">
            <label htmlFor={props.id || props.name}>{label}</label>
            <input {...field} {...props} />
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
        <div className="form-control">
            <label htmlFor={props.id || props.name}>{label}</label>
            <select {...field} {...props} />
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
    };

    const handleRemove = () => {
        setFieldValue(props.name, null);
    };

    return (
        <div className="form-control">
            <label htmlFor={props.id || props.name}>{label}</label>
            <input {...props} onChange={handleChange} />
            <button type="button" onClick={handleRemove}>Retirer le fichier</button>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};

const PublishForm = () => {
    return (
        <div>
            <Formik
                initialValues={{
                    title: '',
                    desc: '',
                    category: '',
                    image: null,
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
                                    console.log('Type MIME du fichier:', value.type);
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
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({ setFieldValue }) => (
                    <Form>
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

                        <button type="submit">Publier</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default PublishForm