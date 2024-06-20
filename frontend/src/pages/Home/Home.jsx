import "./Home.css";
import '../../App.css';
import CarouselDefault from "@components/Carousel/Carousel";

export default function Home() {
  return (
    <div className="bgone">
      <section className="p-4 md:p-8 xl:p-16">
        <h2 className="max-w-[50%] md:text-xl xl:text-2xl md:max-w-64">Trouver tous les services de MINGLE immédiatement</h2>
        <div className="py-4">
          <input
            className="p-1 rounded-md min-w-[85%] xl:min-w-[25%]"
            type="text"
            id="search"
            placeholder="Rechercher votre service..."
          />
          <button type="button" id="searchButton">
            #
          </button>
        </div>
        <div>
          <h4>Populaires :</h4>
          <div className="flex justify-between py-3 md:justify-normal">
            <button className="btn-pop md:mr-4">web</button>
            <button className="btn-pop md:mr-4">médencine </button>
            <button className="btn-pop md:mr-4">polytechnie</button>
            <button className="btn-pop md:mr-4">autres</button>
          </div>
        </div>
      </section>
      <CarouselDefault />
      <section>
        <div className="p-4 pt-12 xl:flex xl:justify-evenly">
          <img src="https://via.placeholder.com/600x300?text=Image+1" alt="#" />
          <p className="pt-4 xl:max-w-[40%]">
            Chez <strong>Mingle</strong>, nous croyons fermement en la puissance
            de la communauté et de l'entraide. Nos valeurs fondamentales sont la
            solidarité, la bienveillance et l'inclusivité. <br /> <br /> Nous
            nous efforçons de créer un espace où chacun peut trouver du soutien
            et offrir son aide, quelles que soient ses compétences ou ses
            besoins. La confiance et le respect mutuel sont au cœur de nos
            interactions, permettant à tous nos membres de se sentir valorisés
            et écoutés. <br /> <br /> <strong>Mingle</strong> est plus qu'une
            simple plateforme d'échange de services; c'est une communauté où
            chacun a sa place et peut contribuer à un monde plus solidaire et
            empathique.
          </p>
        </div>
        <div className="p-4 xl:pt-20 xl:flex xl:flex-row-reverse xl:justify-evenly">
          <img src="https://via.placeholder.com/600x300?text=Image+2" alt="#" />
          <p className="pt-4 md:max-w-[40%]">
            Dans un monde souvent centré sur l'individualisme,{" "}
            <strong>Mingle</strong> remet l'entraide et le partage au centre de
            nos préoccupations. <br />
            <br /> Nous sommes convaincus que chacun a quelque chose à offrir et
            que le partage de nos compétences et de notre temps peut transformer
            des vies. <br /> <br /> En échangeant des services, nous renforçons
            non seulement notre communauté, mais nous créons également des liens
            humains précieux. L'entraide ne profite pas seulement à ceux qui
            reçoivent de l'aide, mais enrichit également ceux qui la donnent.
            <br /> <br /> Rejoindre <strong>Mingle</strong>, c'est faire partie
            d'un mouvement qui valorise la générosité, la coopération et la
            croissance collective. Ensemble, nous pouvons accomplir des choses
            extraordinaires et faire une réelle différence dans la vie des
            autres.
          </p>
        </div>
      </section>
    </div>
  );
}
