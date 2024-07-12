import { useEffect } from 'react';
import TextBlock from '@components/TextBlock/TextBlock';
import illustration from '../../assets/illustration-politique.svg'
import { DocumentArrowDownIcon } from '@heroicons/react/20/solid'
import styles from './PolitiqueDeConfidentialité.module.css'

const pdfUrl = '/politique_confidentialite.pdf';

export default function PolitiqueDeConfidentialité() {

    useEffect(() => {
        document.body.style.backgroundColor = '#FAF9F6';
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    return (
        <div className={`${styles.bgone} flex py-8 rounded-md`}>
            <div className={`${styles['sapiens-vector']} flex w-full md:max-w-5xl`}>
                <img 
                    src={illustration} 
                    alt="Illustration vectorielle d'un homme tenant un téléphone. L'homme est entouré de formes géométriques et de dégradés de couleurs, créant un design moderne et abstrait." 
                />
            </div>
            <div className="py-8 px-8 w-full md:max-w-5xl">
                <TextBlock 
                    title="Politique de confidentialité"
                    content="Nous accordons une importance primordiale à la protection de votre vie privée. Cette politique de confidentialité explique comment nous recueillons, utilisons et protégeons vos informations lorsque vous utilisez notre plateforme."
                />
                <TextBlock 
                    title="Collecte de données"
                    content="Nous collectons différentes catégories d'informations lorsque vous interagissez avec notre plateforme : informations personnelles que vous nous fournissez lors de l'inscription, données d'utilisation sur la manière dont vous utilisez notre plateforme, cookies et technologies similaires pour améliorer votre expérience utilisateur."
                />
                <TextBlock 
                    title="Utilisations des informations"
                    content="Nous utilisons les informations collectées pour plusieurs finalités essentielles : fournir et gérer votre accès à notre plateforme, améliorer continuellement notre service en analysant votre utilisation de notre plateforme, communiquer avec vous pour vous informer sur les mises à jour, les nouvelles fonctionnalités et les offres spéciales, assurer la sécurité de notre plateforme et respecter nos obligations légales et réglementaires."
                />
                <a 
                    href={pdfUrl} 
                    className="flex text-accent font-bold underline py-2"
                    download="politique_confidentialite.pdf"
                >
                    Télécharger notre politique 
                    <DocumentArrowDownIcon className="w-7 px-1"/>
                </a>
            </div>
        </div>
    )
}