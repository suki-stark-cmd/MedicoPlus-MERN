import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
    const [dToken, setDToken] = useState(localStorage.getItem('dToken') || '');
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

    // Load doctor profile when token changes
    const loadDoctorProfile = async (token) => {
        if (!token) return;
        setLoading(true);
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/profile`, {
                headers: { dToken: token }
            });
            if (data.success) {
                setProfile(data.doctor);
            } else {
                // Token invalid — clear it
                localStorage.removeItem('dToken');
                setDToken('');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // Logout function
    const logout = () => {
        setDToken('');
        setProfile(null);
        localStorage.removeItem('dToken');
    };

    // Helper: check if doctor is authenticated
    const isAuthenticated = () => !!dToken;

    // Helper: API wrapper with auth header
    const apiRequest = async (method, endpoint, payload = null) => {
        try {
            const config = {
                method,
                url: `${backendUrl}${endpoint}`,
                headers: { dToken }
            };
            if (payload) {
                if (payload instanceof FormData) {
                    config.data = payload;
                } else {
                    config.data = payload;
                }
            }
            const response = await axios(config);
            return response.data;
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            return { success: false, message: error.message };
        }
    };

    useEffect(() => {
        loadDoctorProfile(dToken);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dToken]);

    const value = {
        dToken,
        setDToken,
        profile,
        setProfile,
        backendUrl,
        loading,
        logout,
        isAuthenticated,
        apiRequest,
        loadDoctorProfile,
    };

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    );
};

export default DoctorContextProvider;
