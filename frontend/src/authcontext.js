import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState('');

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn, token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};
