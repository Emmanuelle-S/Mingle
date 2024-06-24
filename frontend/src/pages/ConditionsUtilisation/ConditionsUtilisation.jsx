import { useEffect } from "react";
import TextBlock from "@components/TextBlock/TextBlock";
import { ArrowRightCircleIcon } from "@heroicons/react/20/solid";
import illustration from '../../assets/illustration-conditions.svg'
import styles from './ConditionsUtilisation.module.css'

export default function ConditionsUtilisation() {

    useEffect(() => {
        document.body.style.backgroundColor = '#FAF9F6';
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    return (
        <div className={`${styles.bgone} flex`}>
            <div className="py-8 px-8 ">
                <h1 className="text-xl font-semibold py-4">Conditions d'utilisations</h1>
                <TextBlock 
                    title="Responsabilités de l'utilisateur" 
                    content="En utilisant notre plateforme, vous acceptez de fournir des informations exactes et à jour lors de l'inscription. Vous vous engagez également à maintenir la confidentialité de votre identifiant et mot de passe, et à informer immédiatement notre service client en cas d'utilisation non autorisée de votre compte ou de toute autre violation de sécurité. De plus, vous vous engagez à utiliser la plateforme de manière légale et conforme aux présentes conditions, en respectant les droits de propriété intellectuelle et la vie privée des autres utilisateurs." 
                />
                <TextBlock 
                    title="Politiques de la plateforme" 
                    content="Notre plateforme s'engage à fournir un service fiable et sécurisé, en protégeant vos données personnelles conformément à notre politique de confidentialité. Nous mettons régulièrement à jour la plateforme pour améliorer ses fonctionnalités et sa sécurité. De plus, nous nous engageons à répondre rapidement et efficacement aux plaintes et préoccupations des utilisateurs, tout en respectant les lois et réglementations en vigueur." 
                />
                <TextBlock 
                    title="Activités interdites" 
                    content="Il est strictement interdit d'utiliser la plateforme pour des activités illégales, frauduleuses ou nuisibles. Vous ne devez pas publier ou partager du contenu diffamatoire, obscène, offensant ou qui incite à la haine. Le harcèlement, les menaces ou les abus envers d'autres utilisateurs sont également interdits. De plus, vous ne devez pas contourner ou tenter de contourner les mesures de sécurité de la plateforme, utiliser des logiciels, scripts ou autres moyens automatiques pour accéder à la plateforme, ni copier, modifier ou distribuer tout contenu de la plateforme sans autorisation préalable." 
                />
                <TextBlock 
                    title="Droits et responsabilités" 
                    content="Nous nous réservons le droit de modifier ou mettre à jour ces conditions d'utilisation à tout moment pour refléter les changements juridiques, opérationnels ou réglementaires. En cas de violation des présentes conditions, nous nous réservons le droit de suspendre ou résilier votre compte, de limiter, restreindre ou interdire l'accès à la plateforme pour des raisons légales ou de sécurité, et de recueillir et utiliser des données statistiques sur l'utilisation de la plateforme pour améliorer nos services. Vous avez le droit d'accéder et utiliser la plateforme conformément aux présentes conditions, de recevoir des informations claires sur les modifications de ces conditions, de protéger vos données personnelles conformément à notre politique de confidentialité, et de soumettre des suggestions ou des commentaires sur l'amélioration de la plateforme." 
                />
                <a 
                    href="/politique"
                    className="flex text-accent font-bold underline py-2"
                >
                    Politique de confidentialité 
                    <ArrowRightCircleIcon className="w-7 px-1"/>
                </a>
                </div>
                <div className=" flex">
                <img 
                    src={illustration} 
                    alt="Illustration vectorielle d'une femme tenant un téléphone. La femme est entourée de formes géométriques et de dégradés de couleurs, créant un design moderne et abstrait." 
                />
                </div>
        </div>
    )
}