import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../App.css";

const Inscription = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Nom d'utilisateur obligatoire"),
      // VOIR SI ON RAJOUTE UN VERIFICATION DE NOM D'UTILISATEUR DEJA PRIS
      email: Yup.string().email("Adresse email invalide").required("Requis"),
      password: Yup.string().required("Requis"),
      confirmPassword: Yup.string()
        .oneOf(
          [Yup.ref("password"), null],
          "Les mots de passe doivent correspondre"
        )
        //Yp.ref = verifie que confirmPassword correspond bien avec password
        .required("Requis"),
      acceptTerms: Yup.boolean().oneOf(
        [true],
        "Accepter les termes et conditions est requis"
      ),
    }),
    onSubmit: values => {
        if (values.password !== values.confirmPassword) {
          // Gestion d'erreur ou afficher un message à l'utilisateur
          console.log('Les mots de passe ne correspondent pas');
          // A VOIR SI ON RAJOUTE UNE ALERTE 
          return;
        }
        console.log('Form values:', values);
        // Soumet le formulaire si tout va bien, pour l'instant log juste les valeurs
        // LIEN AVEC LE BACKEND A FAIRE (REQUETE POST, NOUVEL UTILISATEUR ??)
      },
  });

  return (
    <div className="w-full p-8 border-solid border-2">
      <h2 className="text-2xl font-extrabold mb-6 text-center text-darkslategray ">
        Inscription
      </h2>
      <form onSubmit={formik.handleSubmit}>
        {/* fonction qui gère la soumission du formulaire */}
        <div className="mb-4">
          <label className="block text-darkslategray" htmlFor="signup-username">
            Nom d'utilisateur
          </label>
          <input
            className="w-full px-3 py-2 border rounded"
            id="signup-username"
            name="username"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            // récupère la valeur dans l'input "nom d'utilisateur"
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="text-red-500 text-sm">
              {formik.errors.username}
              {/* gestion des erreurs */}
            </div>
          ) : null}
        </div>
        <div className="mb-4">
          <label className="block text-darkslategray" htmlFor="signup-email">
            Email
          </label>
          <input
            className="w-full px-3 py-2 border rounded"
            id="signup-email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label className="block text-darkslategray" htmlFor="signup-password">
            Mot de passe
          </label>
          <input
            className="w-full px-3 py-2 border rounded"
            id="signup-password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            className="block text-darkslategray"
            htmlFor="signup-confirm-password"
          >
            Confirmation du mot de passe
          </label>
          <input
            className="w-full px-3 py-2 border rounded"
            id="signup-confirm-password"
            name="confirmPassword"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="text-red-500 text-sm">
              {formik.errors.confirmPassword}
            </div>
          ) : null}
        </div>
        <div className="mb-4">
          <label>
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              name="acceptTerms"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.acceptTerms}
            />
            <span className="text-sm">J'accepte les termes et conditions</span>
          </label>
          {formik.touched.acceptTerms && formik.errors.acceptTerms ? (
            <div className="text-red-500 text-sm">
              {formik.errors.acceptTerms}
            </div>
          ) : null}
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded"
          >
            Inscription
          </button>
        </div>
      </form>
    </div>
  );
};

export default Inscription;
