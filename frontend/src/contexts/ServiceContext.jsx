import { createContext, useState } from "react";
import { services as initialServices } from "../data/services";

export const ServiceContext = createContext();

export const ServiceProvider = ({children}) => {
    const [ services, setServices ] = useState(initialServices);

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