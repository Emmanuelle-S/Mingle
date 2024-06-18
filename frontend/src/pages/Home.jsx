import './Home.css'
import CarouselDefault from '@components/Carousel/Carousel';
import Counter from "../components/Counter";
import logo from "../assets/logo.svg";

export default function Home() {
  return (
    <div className="bgone">
      <section className='p-4 '>
        <h2>Trouver tous les services de MINGLE immédiatement</h2>
        <div className='py-4'>
          <input className="p-1 rounded-md min-w-[85%]" type="text" id="search" placeholder="Rechercher votre service..." />
          <button type="button" id="searchButton">#</button>
        </div>
        <div>
          <h4>Populaires :</h4>
          <div className='flex justify-between py-3'>
            <button className='btn-pop'>web</button>
            <button className='btn-pop'>médencine </button>
            <button className='btn-pop'>polytechnie</button>
            <button className='btn-pop'>autres</button>
          </div>
        </div>
        <CarouselDefault />
      </section>
    </div>
  );
}
