import React from "react";
import Accordion from "./Accordion.jsx";

const FAQ = () => {
  const accordionItems = [
    {
      title: "Question 1",
      intro: "Introduction",
      content: "Contenu de la Question 1...",
    },
    {
      title: "Question 2",
      intro: "Introduction",
      content: "Contenu de la Question 2...",
    },
    {
      title: "Question 3",
      intro: "Introduction",
      content: "Contenu de la Question 3...",
    },
    {
      title: "Question 4",
      intro: "Introduction",
      content: "Contenu de la Question 4...",
    },
    {
      title: "Question 5",
      intro: "Introduction",
      content: "Contenu de la Question 5...",
    },
    // Ajoute autant de sections que tu veux
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-lg md:text-2xl text-center py-8 md:p-16">
        Les réponses à toutes vos questions sur votre Plateforme collaborative préféré :
      </h1>
      <Accordion items={accordionItems} />
    </div>
  );
};

export default FAQ;
