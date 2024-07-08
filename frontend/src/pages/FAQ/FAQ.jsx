import { useEffect, useState } from "react";
import Accordion from "./Accordion.jsx";
import axios from "axios";

const FAQ = () => {
  const [accordionItems, setAccordionItems] = useState([]);
  const [isAdmin, setIsAdmin] = useState(true); // Remplacer par une vérification d'admin réelle

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/faq");
        setAccordionItems(response.data);
      } catch (err) {
        console.error("Error fetching FAQs:", err);
      }
    };
    fetchFAQs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/faq/${id}`);
      setAccordionItems(accordionItems.filter((item) => item.faq_id !== id));
    } catch (err) {
      console.error("Error deleting FAQ:", err);
    }
  };

  const handleEdit = async (id, updatedItem) => {
    try {
      await axios.put(`http://localhost:5000/faq/${id}`, updatedItem);
      setAccordionItems(
        accordionItems.map((item) => (item.faq_id === id ? updatedItem : item))
      );
    } catch (err) {
      console.error("Error updating FAQ:", err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-lg md:text-2xl text-center py-8 md:p-16">
        Les réponses à toutes vos questions sur votre Plateforme collaborative
        préférée :
      </h1>
      <Accordion
        items={accordionItems}
        isAdmin={isAdmin}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default FAQ;
