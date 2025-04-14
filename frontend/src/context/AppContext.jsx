import { createContext, useEffect, useState } from 'react';


export const AppContext = createContext();

export default function AppProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [mesaId, setMesaId] = useState(() => {
        const savedMesaId = localStorage.getItem('mesaId');
        if (savedMesaId) {
            return parseInt(savedMesaId, 10); 
        }
        const newMesaId = Math.floor(Math.random() * 21); 
        localStorage.setItem('mesaId', newMesaId); 
        return newMesaId;
    });




    async function getUser() {

        const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/api/user`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            setUser(data);
            console.log('La data recibida es: ', data);
        } else {
            console.error('Error fetching user data:', response.statusText);
        }

    }

    useEffect(() => {


        if (token) {
            getUser();
        }
    }, [token]);


    return (
        <AppContext.Provider value={{ token, setToken, user, setUser , mesaId}}>
            {children}
        </AppContext.Provider>
    );
}