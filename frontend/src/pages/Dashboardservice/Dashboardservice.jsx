import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ToggleButton from '../../components/ToggleButton/ToggleButton.jsx';
import camembert from '../../../src/assets/camembert.png';
import bar from '../../assets/bar.png';
import point from '../../assets/point.png';

const Dashboard = () => {
    const [services, setServices] = useState([]);
    const [editingService, setEditingService] = useState(null);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/service/`);
            setServices(response.data);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    const handleEdit = (service) => {
        setEditingService(service);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/service/${id}`);
            setServices(services.filter(service => service.id !== id));
        } catch (error) {
            console.error('Error deleting service:', error);
        }
    };

    const handleSave = async () => {
        try {
            const serviceData = {
                ...editingService,
                status: editingService.status === 'true' || editingService.status === true // Assurez-vous que le statut est un booléen
            };
            console.log("Saving service:", serviceData); // Ajoutez ce log
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/service/${editingService.id}`, serviceData);
            setEditingService(null);
            fetchServices();
        } catch (error) {
            console.error('Error updating service:', error);
        }
    };

    return (
        <div className="mx-auto p-14">
            <section className="md:p-8 xl:p-1 flex justify-between items-center">
                <div className="p-4 w-full md:w-1/2">
                    <form id="serchHome" onSubmit={(e) => e.preventDefault()} className="py-4">
                        <div className="relative w-full">
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
                </div>
            </section>

            <div className="text-center text-2xl font-bold mb-4">Dashboard service</div>

            <div className="flex justify-around mb-12">
                <div className="bg-light px-20 p-4 border border-black rounded-full">Services Publié<br />10</div>
                <div className="bg-light px-20 p-4 border border-black rounded-full">Personnes intéressées<br />37</div>
                <div className="bg-light px-20 p-4 border border-black rounded-full">Interaction<br />23</div>
            </div>

            <div className="mb-12">
                <div className="text-xl font-bold mb-2">Services :</div>
                <div className="grid grid-cols-3 gap-4 p-4">
                    {services.map((service) => (
                        <div key={service.id} className="w-full p-4 pb-20 border-solid bg-white rounded-lg border border-gray-300 shadow-2xl relative">
                            {editingService && editingService.id === service.id ? (
                                <>
                                    <input 
                                        type="text" 
                                        value={editingService.titre} 
                                        onChange={(e) => setEditingService({ ...editingService, titre: e.target.value })} 
                                    />
                                    <textarea 
                                        value={editingService.description} 
                                        onChange={(e) => setEditingService({ ...editingService, description: e.target.value })} 
                                    />
                                    <select 
                                        value={editingService.status ? 'true' : 'false'} 
                                        onChange={(e) => setEditingService({ ...editingService, status: e.target.value === 'true' })} 
                                    >
                                        <option value="true">Activé</option>
                                        <option value="false">Désactivé</option>
                                    </select>
                                    <button onClick={handleSave}>Save</button>
                                </>
                            ) : (
                                <>
                                    <p className="font-bold text-xl">{service.titre}</p>
                                    <p>{service.description}</p>
                                    <p>Status : {service.status ? 'activé' : 'désactivé'}</p>
                                    <div className="absolute left-0 bottom-0 p-4 flex space-x-2">
                                        <button className="bg-primary p-2 rounded w-20 text-white font-bold" onClick={() => handleEdit(service)}>Edit</button>
                                        <button className="border border-black rounded-lg p-2 w-20" onClick={() => handleDelete(service.id)}>Delete</button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-12">
                <div className="text-xl font-bold mb-2">Notification :</div>
                <div className="grid grid-cols-3 gap-4 p-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="w-full p-4 pb-20 border-solid bg-white rounded-lg border border-gray-300 shadow-2xl relative">
                            <div className="absolute left-0 bottom-0 p-4 flex space-x-2">
                                <button className="bg-primary p-2 rounded w-20 text-white font-bold">Edit</button>
                                <button className="border border-black rounded-lg p-2 w-20">Delete</button>
                            </div>
                            <p>Lorem ipsum dolor sit amet consectetur. Dolor.</p>
                            <p>Status : {index % 2 === 0 ? 'Active' : 'désactivé'}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-12">
                <div className="text-xl font-bold mb-2">Demande :</div>
                <div className="grid grid-cols-3 gap-4 p-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="w-full p-4 pb-20 border-solid bg-white rounded-lg border border-gray-300 shadow-2xl relative">
                            <div className="absolute left-0 bottom-0 p-4 flex space-x-2">
                                <button className="bg-primary p-2 rounded w-20 text-white font-bold">Edit</button>
                                <button className="border border-black rounded-lg p-2 w-20">Delete</button>
                            </div>
                            <p>Lorem ipsum dolor sit amet consectetur. Dolor.</p>
                            <p>Status : {index % 2 === 0 ? 'Active' : 'désactivé'}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-12">
                <div className="text-xl font-bold mb-2">Statistiques :</div>
                <div className="grid grid-cols-3 gap-4 p-4">
                    <img src={camembert} alt="Pie Chart" className="rounded shadow w-80 h-80 object-cover ml-40" />
                    <img src={bar} alt="Bar Chart" className="rounded shadow w-80 h-80 object-cover ml-40" />
                    <img src={point} alt="Line Chart" className="rounded shadow w-80 h-80 object-cover ml-40" />
                </div>
            </div>

            <div className="mb-4">
                <div className="text-xl font-bold mb-2">Options :</div>
                <div className="w-full p-8 border-solid bg-light rounded-lg border border-gray-300 shadow-2xl">
                    <div className="flex flex-col space-y-2">
                        <div><input type="checkbox" /> Option 1 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi non, accusantium nostrum illo nulla magni sapiente, ex excepturi quae laudantium mollitia iure, recusandae quis hic modi. Ex sed dignissimos perspiciatis.</div>
                        <div><input type="checkbox" /> Option 2 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi non, accusantium nostrum illo nulla magni sapiente, ex excepturi quae laudantium mollitia iure, recusandae quis hic modi. Ex sed dignissimos perspiciatis.</div>
                        <div><input type="checkbox" /> Option 3 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi non, accusantium nostrum illo nulla magni sapiente, ex excepturi quae laudantium mollitia iure, recusandae quis hic modi. Ex sed dignissimos perspiciatis.</div>
                        <div><input type="checkbox" /> Option 4 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi non, accusantium nostrum illo nulla magni sapiente, ex excepturi quae laudantium mollitia iure, recusandae quis hic modi. Ex sed dignissimos perspiciatis.</div>
                        <div><input type="checkbox" /> Option 5 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi non, accusantium nostrum illo nulla magni sapiente, ex excepturi quae laudantium mollitia iure, recusandae quis hic modi. Ex sed dignissimos perspiciatis.</div>
                    </div>
                    <div className="flex items-center mt-4">
                        <ToggleButton label="" className="mr-4" />
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi non, accusantium nostrum illo nulla magni sapiente, ex excepturi quae laudantium mollitia iure, recusandae quis hic modi. Ex sed dignissimos 
                    </div>
                    <div className="flex items-center mt-4">
                        <ToggleButton label="" className="mr-4" />
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi non, accusantium nostrum illo nulla magni sapiente, ex excepturi quae laudantium mollitia iure, recusandae quis hic modi. Ex sed dignissimos
                    </div>
                    <div className="flex justify-end mt-4">
                        <button className="bg-blue-500 text-white pl-4 pr-4 p-1 rounded-2xl">SAVE</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
