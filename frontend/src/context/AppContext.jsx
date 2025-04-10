import { createContext, useEffect, useState } from 'react';


export const AppContext = createContext();

export default function AppProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);

    async function getUser() {

        const response = await fetch('http://localhost:8000/api/user', {
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
        <AppContext.Provider value={{ token, setToken, user, setUser }}>
            {children}
        </AppContext.Provider>
    );
}