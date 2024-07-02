import './Home.css';
import '../../App.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import CarouselDefault from '@components/Carousel/Carousel';

export default function Home() {

  const [userData, setUserData] = useState(null); 

  const slidesServices = [
    {id: 1, url: 'https://via.placeholder.com/600x300?text=Slide+1'},
    {id: 2, url: 'https://via.placeholder.com/600x300?text=Slide+2'},
    {id: 3, url: 'https://via.placeholder.com/600x300?text=Slide+3'},
    {id: 4, url: 'https://via.placeholder.com/600x300?text=Slide+4'},
    {id: 5, url: 'https://via.placeholder.com/600x300?text=Slide+5'},
  ];

  const fetchData = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      const userResponse = await axios.get(
        `http://localhost:5000/users/${userId}`,
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
    fetchData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="">
      <section className="md:p-8 xl:p-16 flex justify-center">
        <div className="p-4">
          <h2 className="max-w-[55%] md:max-w-[100%] md:text-xl xl:text-2xl text-center py-4">Bienvenue <span className='text-darkslategray font-bold text-3xl'>{userData.username}</span></h2>
          <h1 className="max-w-[55%] md:max-w-[100%] md:text-xl xl:text-3xl">
            Trouver tous les services de <strong>MINGLE</strong> immédiatement
          </h1>
          <form
            id="serchHome"
            onSubmit={(e) => e.preventDefault()}
            className="py-4"
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
          <div className="md:flex md:items-center">
            <h4 className="md:pr-4">Populaires :</h4>
            <div className="flex justify-between py-3 md:justify-normal">
              <button className="btn-pop md:mr-4">web</button>
              <button className="btn-pop md:mr-4">médecine </button>
              <button className="btn-pop md:mr-4">polytechnie</button>
              <button className="btn-pop md:mr-4">autres</button>
            </div>
          </div>
        </div>
      </section>
      <CarouselDefault slides={slidesServices} />
      <section>
        <div className="p-4 pt-12 xl:flex flex-wrap gap-4">
          <div className="flex-1 basis-80">
            <img className='w-full'
              src="https://via.placeholder.com/600x300?text=Image+1"
              alt="#"
            />
          </div>
          <div className="pt-4 flex-1 basis-80">
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

        <div className="p-4 xl:pt-20 flex flex-row-reverse  gap-4">
          <div className='flex-1 basis-80'>

            <img className='w-full'
              src="https://via.placeholder.com/600x300?text=Image+2"
              alt="#"
            />
          </div>
          <div className="pt-4 flex-1 basis-80">
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
