import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [doctors, setDoctors] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [userData, setUserData] = useState(null);
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');

    const currencySymbol = '$';
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

    // Load doctors on mount
    const loadDoctors = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/doctors`);
            if (data.success) {
                setDoctors(data.doctors);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Load user profile when token changes
    const loadUserProfile = async (t) => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/profile`, {
                headers: { token: t }
            });
            if (data.success) {
                setUserData(data.user);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Logout function
    const logout = () => {
        setToken('');
        setUserData(null);
        localStorage.removeItem('token');
    };

    // Helper: check if user is authenticated
    const isAuthenticated = () => !!token;

    // Helper: redirect to login
    const requireAuth = (navigate) => {
        if (!token) {
            toast.info('Please login to continue');
            navigate('/login');
            return false;
        }
        return true;
    };

    // Update language and persist
    const updateLanguage = (lang) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
    };

    useEffect(() => {
        loadDoctors();
        if (token) {
            loadUserProfile(token);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const value = {
        doctors,
        currencySymbol,
        token,
        setToken,
        userData,
        setUserData,
        language,
        setLanguage: updateLanguage,
        backendUrl,
        logout,
        isAuthenticated,
        requireAuth,
        loadUserProfile,
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;