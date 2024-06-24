import React from "react";
import Accordion from "./Accordion.jsx";

const FAQ = () => {
  const accordionItems = [
    {
      title: "Qu'est-ce que MINGLE ?",
      content:
        "MINGLE est une plateforme communautaire qui met l'accent sur l'échange de services et l'entraide. Nous croyons en la solidarité, la bienveillance, et l'inclusivité. En rejoignant MINGLE, les membres peuvent trouver du soutien, offrir leur aide et contribuer à un environnement où la confiance et le respect mutuel sont primordiaux.",
    },

    {
      title: "Quels types de services puis-je trouver sur MINGLE ?",
      content:
        "Sur MINGLE, vous pouvez trouver une variété de services allant des compétences en web, en médecine, en polytechnique, et bien plus encore. La plateforme est conçue pour permettre aux utilisateurs de chercher et d'offrir des services dans divers domaines, facilitant ainsi la collaboration et l'entraide entre les membres de la communauté.",
    },

    {
      title: "Comment fonctionne la recherche de services sur MINGLE ?",
      content:
        "La recherche de services sur MINGLE est simple et intuitive. Vous pouvez utiliser la barre de recherche sur la page d'accueil pour entrer des mots-clés liés aux services que vous recherchez. De plus, des suggestions populaires comme le web, la médecine, et la polytechnique sont disponibles pour vous guider.",
    },

    {
      title: "Quelles sont les valeurs fondamentales de MINGLE ?",
      content:
        "Les valeurs fondamentales de MINGLE sont la solidarité, la bienveillance et l'inclusivité. Nous nous efforçons de créer un espace où chacun peut se sentir valorisé et écouté. La plateforme est plus qu'un simple lieu d'échange de services; elle est une communauté où le soutien et le respect mutuel sont au cœur des interactions.",
    },

    {
      title: "Pourquoi devrais-je rejoindre MINGLE ?",
      content:
        "Rejoindre MINGLE, c'est faire partie d'un mouvement qui valorise la générosité et la coopération. En partageant vos compétences et votre temps, vous pouvez transformer des vies et renforcer les liens humains. MINGLE n'est pas seulement bénéfique pour ceux qui reçoivent de l'aide, mais également pour ceux qui la donnent, enrichissant ainsi toute la communauté.",
    },

    {
      title: "Comment MINGLE favorise-t-il le partage et l'entraide ?",
      content:
        "MINGLE remet l'entraide et le partage au centre de ses préoccupations. La plateforme permet aux utilisateurs de s'entraider en échangeant des services, renforçant ainsi la communauté. Le partage de compétences et de temps crée des liens précieux et enrichit autant ceux qui reçoivent de l'aide que ceux qui en donnent, contribuant à une croissance collective.",
    },

    {
      title:
        "Qu'est-ce qui distingue MINGLE des autres plateformes d'échange de services ?",
      content:
        "MINGLE se distingue par son engagement envers la communauté et ses valeurs fondamentales de solidarité, bienveillance, et inclusivité. Contrairement à d'autres plateformes, MINGLE met l'accent sur la création de liens humains et la confiance mutuelle, offrant un espace où chaque membre se sent valorisé et écouté. C'est plus qu'un simple échange de services; c'est un mouvement pour un monde plus solidaire et empathique.",
    },

    // Ajoute autant de sections que tu veux
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-lg md:text-2xl text-center py-8 md:p-16">
        Les réponses à toutes vos questions sur votre Plateforme collaborative
        préféré :
      </h1>
      <Accordion items={accordionItems} />
    </div>
  );
};

export default FAQ;
