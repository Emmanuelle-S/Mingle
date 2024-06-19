import { createContext, useState } from "react";

export const ServiceContext = createContext();

export const ServiceProvider = ({children}) => {
    const [ services, setServices ] = useState([]);

    const addService = (service) => {
        setServices([...services, service])
        console.log(services);
    }

    return (
        <ServiceContext.Provider value={{ services, addService }}>
            {children}
        </ServiceContext.Provider>
    )
}