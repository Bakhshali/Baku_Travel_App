import { createContext, useState } from "react";

interface UserLatLongLocationProviderProps {
    latitude: string
    setlatitude(item: any): void;
    longitude: string
    setlongitude(item: any): void;
}

export const LatLongContext = createContext<UserLatLongLocationProviderProps>({
    latitude: '',
    setlatitude: () => { },
    longitude: '',
    setlongitude: () => { }
});

export const UserLocationProvider = ({ children }: any) => {

    const [latitude, setlatitude] = useState('');
    const [longitude, setlongitude] = useState('');

    const values: UserLatLongLocationProviderProps = {
        latitude, longitude, setlatitude, setlongitude
    }
    return (
        <LatLongContext.Provider value={values} >
            {children}
        </LatLongContext.Provider >
    );
};