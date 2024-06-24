import React from 'react';
import johnDoeImage from '../../assets/john-doe.jpg';
import emilyJohnsonImage from '../../assets/emily-johnson.jpg';
import johnSmithImage from '../../assets/john-smith.jpg';
import '../../../src/index.css';

function About() {
  return (
    <div className="mx-auto p-14">
      <header className="text-left mb-12">
        <h1 className="text-4xl font-bold mb-8">A Propos</h1>
        <p className="text-base mb-8 w-3/6">
          Lorem ipsum dolor sit amet consectetur. Purus at amet amet duis morbi in dui. 
          Volutpat ullamcorper viverra vitae nulla dictum commodo lectus morbi. Lacinia 
          eget urna faucibus egestas vitae ac ultrices. Aliquam magna amet vel at sed 
          gravida nec. Auctor orci sit luctus suspendisse quam. Eu mattis gravida enim est. Risus amet ultricies egestas urna porta.
        </p>
      </header>
      <main>
        <div className="flex justify-around mb-12">
          <div className="text-center p-4 w-1/3">
            <h2 className="text-2xl font-semibold mb-2">Histoire</h2>
            <p>Notre histoire commence en... Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae eos deleniti quod est temporibus officiis mollitia pariatur, deserunt rem blanditiis voluptate repudiandae eius, ullam impedit laborum cupiditate molestias? Quia, quasi?</p>
          </div>
          <div className="text-center p-4 w-1/3">
            <h2 className="text-2xl font-semibold mb-2">Vision</h2>
            <p>Notre vision est de... Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam unde, nemo alias placeat sapiente aspernatur! Sunt, error. Adipisci quia quam cum repudiandae recusandae? Sapiente quod accusamus nisi mollitia aliquam doloribus?</p>
          </div>
          <div className="text-center p-4 w-1/3">
            <h2 className="text-2xl font-semibold mb-2">Objectif</h2>
            <p>Notre objectif est de... Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis alias, doloremque nemo laboriosam veniam doloribus modi officia minus quibusdam magni ipsum quos inventore error harum, assumenda accusamus cumque repellat? Quidem!</p>
          </div>
        </div>
        <div className="flex justify-around">
          <div className="text-center p-4 w-1/3">
            <img className="mx-auto mb-2 h-80 w-82 object-cover" src={johnDoeImage} alt="John Doe" />
            <p className="font-bold">John Doe</p>
            <p>CEO</p>
            <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">View Bio</button>
          </div>
          <div className="text-center p-4 w-1/3">
            <img className="mx-auto mb-2 h-80 w-82 object-cover" src={emilyJohnsonImage} alt="Emily Johnson" />
            <p className="font-bold">Emily Johnson</p>
            <p>CTO</p>
            <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">View Bio</button>
          </div>
          <div className="text-center p-4 w-1/3">
            <img className="mx-auto mb-2 h-80 w-82 object-cover" src={johnSmithImage} alt="John Smith" />
            <p className="font-bold">John Smith</p>
            <p>CFO</p>
            <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">View Bio</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default About;
