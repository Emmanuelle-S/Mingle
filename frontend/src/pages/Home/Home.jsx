import './Home.css';
import '../../App.css';
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import CarouselDefault from '@components/Carousel/Carousel';
import { AuthContext } from '../../contexts/AuthContext';
import img1 from "../../assets/mains.jpg"
import img2 from "../../assets/vieux.jpeg"

export default function Home() {

  const [userData, setUserData] = useState(null);
  const { isLoggedIn, userId, token } = useContext(AuthContext); // Utiliser le contexte

  const slidesServices = [
    {id: 1, url: 'https://loremflickr.com/320/240/cleaner'},
    {id: 2, url: 'https://loremflickr.com/320/240/homework'},
    {id: 3, url: 'https://loremflickr.com/320/240/shopping'},
    {id: 4, url: 'https://loremflickr.com/320/240/dinner'},
    {id: 5, url: 'https://loremflickr.com/320/240/medecine'},
    {id: 6, url: 'https://loremflickr.com/320/240/relocating'},
    {id: 7, url: 'https://loremflickr.com/320/240/party'},
    {id: 8, url: 'https://loremflickr.com/320/240/builder'},
    {id: 9, url: 'https://loremflickr.com/320/240/computing'},
  ];

  const fetchData = async () => {
    try {
      const userResponse = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserData(userResponse.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    if (userId && token) {
      fetchData();
    }
  }, [userId, token]); 
  // Ajout de userId et token dans le tableau des dépendances

  return (
    <div className="">
      <section className="md:p-8 xl:p-16 flex justify-center">
        <div className="p-4">
        {isLoggedIn ? (
            <>
              <h2 className="max-w-[55%] md:max-w-[100%] md:text-xl xl:text-2xl md:text-center py-4">
                Bienvenue <span className='text-darkslategray font-bold md:text-xl xl:text-3xl'>{userData?.username}</span>
              </h2>
              <h1 className="max-w-[55%] md:max-w-[100%] md:text-xl xl:text-2xl">
                Trouver tous les services de <strong>MINGLE</strong> immédiatement
              </h1>
            </>
          ) : (
            <>
              <h2 className="max-w-[55%] md:max-w-[100%] md:text-xl xl:text-2xl text-center py-4">
                Bienvenue sur <span className='text-darkslategray text-3xl'><strong>MINGLE</strong></span>
              </h2>
              <h1 className="max-w-[55%] md:max-w-[100%] md:text-xl xl:text-3xl">
                Trouver tous nos services dés maintenant
              </h1>
            </>
          )}
          <form
            id="serchHome"
            onSubmit={(e) => e.preventDefault()}
            className="pt-4 md:pt-16"
          >
            <div className="relative">
              <label>
                <input
                  className="rounded-full py-1 md:py-2 pr-6 pl-10 w-full border border-gray-800 focus:border-gray-700 bg-white focus:bg-gray-200 focus:outline-none text-gray-900 focus:shadow-md transition duration-300 ease-in text-sm md:text-lg"
                  type="text"
                  placeholder="Trouver vos services MINGLE "
                />
                <span className="absolute top-0 left-0 mt-2 ml-3 inline-block">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-6 md:h-6">
                    <path
                      fill="#bbb"
                      d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
                    />
                  </svg>
                </span>
              </label>
            </div>
          </form>
          <div className="md:flex md:items-center pt-4 text-xs md:text-base">
            <h4 className="md:pr-4">Populaires :</h4>
            <div className="flex gap-2 md:gap-0 py-3 md:justify-normal">
              <button className="btn-pop md:mr-4">web</button>
              <button className="btn-pop md:mr-4">médecine </button>
              <button className="btn-pop md:mr-4">polytechnie</button>
              <button className="btn-pop md:mr-4">autres</button>
            </div>
          </div>
        </div>
      </section>
      <CarouselDefault slides={slidesServices} />
      <section className='pt-12'>
        <div className="p-4 pt-12 xl:flex flex-wrap gap-4">
          <div className="flex-1 basis-80">
            <img className='w-full'
              src={img1}
              alt="#"
            />
          </div>
          <div className="pt-4 px-4 md:pl-12 flex-1 basis-80">
            <h2 className="py-4 font-bold	text-2xl">Nos Valeurs :</h2>
            <p>
              Chez <strong>Mingle</strong>, nous croyons fermement en la
              puissance de la communauté et de l'entraide. Nos valeurs
              fondamentales sont la solidarité, la bienveillance et
              l'inclusivité. <br /> <br /> Nous nous efforçons de créer un
              espace où chacun peut trouver du soutien et offrir son aide,
              quelles que soient ses compétences ou ses besoins. La confiance et
              le respect mutuel sont au cœur de nos interactions, permettant à
              tous nos membres de se sentir valorisés et écoutés. <br /> <br />{' '}
              <strong>Mingle</strong> est plus qu'une simple plateforme
              d'échange de services; c'est une communauté où chacun a sa place
              et peut contribuer à un monde plus solidaire et empathique.
            </p>
          </div>
        </div>

        <div className="p-4 xl:pt-20 xl:flex flex-row-reverse gap-4">
          <div className="flex-1 basis-80">
            <img className='w-full'
              src={img2}
              alt="#"
            />
          </div>
          <div className="pt-4 px-4 md:pr-12 flex-1 basis-80">
            <h2 className="py-4 font-bold	text-2xl">
              Une plateforme de Partage :
            </h2>
            <p>
              Dans un monde souvent centré sur l'individualisme,{' '}
              <strong>Mingle</strong> remet l'entraide et le partage au centre
              de nos préoccupations. <br />
              <br /> Nous sommes convaincus que chacun a quelque chose à offrir
              et que le partage de nos compétences et de notre temps peut
              transformer des vies. <br /> <br /> En échangeant des services,
              nous renforçons non seulement notre communauté, mais nous créons
              également des liens humains précieux. L'entraide ne profite pas
              seulement à ceux qui reçoivent de l'aide, mais enrichit également
              ceux qui la donnent.
              <br /> <br /> Rejoindre <strong>Mingle</strong>, c'est faire
              partie d'un mouvement qui valorise la générosité, la coopération
              et la croissance collective. Ensemble, nous pouvons accomplir des
              choses extraordinaires et faire une réelle différence dans la vie
              des autres.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}