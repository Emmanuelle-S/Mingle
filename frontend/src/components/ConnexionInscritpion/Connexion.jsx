import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import * as Yup from "yup";
import "../../App.css";
import { AuthContext } from "../../contexts/AuthContext";

const Connexion = () => {
  const [forgotPassword, setForgotPassword] = useState(false);
  //UseState pour gérer l'oubli de mot de passe lorsqu'on clique sur mdp oublié
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);
  // Fonction de connexion obtenue à partir du contexte d'authentification.
  const [fromPublier, setFromPublier] = useState(false);
  // État local pour vérifier si l'utilisateur vient de la page /Publier.

  useEffect(() => {
    if (location.state && location.state.from === "/Publier") {
      setFromPublier(true);
    }
  }, [location]);
  // Vérifie si l'utilisateur vient de la page /Publier et met à jour l'état fromPublier.

  const formik = useFormik({
    // fonction qui retourne un objet formik qui contient les méthodes et les propriétés pour gérer l'état du formulaire et les interactions avec l'utilisateur.
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Adresse email invalide")
        .required("Champs obligatoire"),
      password: Yup.string().required("Champs obligatoire"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      // fonction qui est appelée lorsque le formulaire est soumis avec des valeurs valides
      // console.log('Login form values:', values);

      try {
        await login(values.email, values.password);
        // Redirection après connexion réussie
        if (fromPublier) {
          navigate("/Publier");
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error logging in:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleForgotPasswordClick = () => {
    setForgotPassword(true);
    // Change l'apparence de bloc "Connexion" pour activer l'envoi d'un nv mdp
  };

  const handleForgotPasswordSubmit = async (values) => {
    try {
      // Permet d'envoyer la demande de réinitialisation au backend
      console.log("Forgot password form values:", values);
      // Pour l'instant envoie juste un log avec les valeurs soumise
      // AJOUTER LE LIEN AVEC LE BACKEND, appel de la fonction handleForgotPasswordSubmit ??

      // Afficher un message à l'utilisateur indiquant que la demande a été envoyée
      alert(
        "Votre demande de réinitialisation a été envoyée ! Veuillez vérifier votre e-mail."
      );
      setForgotPassword(false);
      // Sert à masquer le formulaire après soumission
    } catch (error) {
      console.error("Error sending forgot password request:", error);
      // gestion des erreurs dans la console
    }
  };

  return (
    <div className="w-full p-8 border-solid border-2">
      <h2 className="text-2xl font-extrabold mb-6 text-center text-darkslategray">
        Connexion
      </h2>
      {!forgotPassword ? (
        // Condition de rendu basée sur forgotPassword. Si forgotPassword est false (!forgotPassword), le formulaire de connexion normal est affiché.
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-darkslategray" htmlFor="login-email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 border rounded"
              id="login-email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              //   Gestion des événements onChange et onBlur pour mettre à jour les valeurs et les états de validation.
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              className="block text-darkslategray"
              htmlFor="login-password"
            >
              Mot de passe
            </label>
            <input
              className="w-full px-3 py-2 border rounded"
              id="login-password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <div className="mb-4">
            <a
              href="#"
              className="text-blue-500"
              onClick={handleForgotPasswordClick}
            >
              Mot de passe oublié ?
            </a>
            {/* déclenche handleForgotPasswordClick si cliqué, qui mettra à jour l'état forgotPassword pour afficher le formulaire de réinitialisation. */}
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded"
            >
              Se connecter
            </button>
          </div>
        </form>
      ) : (
        // Condition de rendu alternative si forgotPassword est true (cad cliqué). Le formulaire de réinitialisation de mot de passe est affiché.
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-darkslategray"
              htmlFor="forgot-password-email"
            >
              Email
            </label>
            <input
              className="w-full px-3 py-2 border rounded"
              id="forgot-password-email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              //   mise à jour des valeurs et des états de validation.
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-accent text-white py-2 rounded"
            >
              Envoyer la demande
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Connexion;
