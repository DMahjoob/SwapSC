import { createContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
    authToken: string | null;
    setAuthToken: (token: string | null) => void;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
    authToken: null,
    setAuthToken: () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authToken, setAuthTokenState] = useState<string | null>(null);
    const navigate = useNavigate();

    // Load token from localStorage on app load
    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        if (storedToken) setAuthTokenState(storedToken);
    }, []);

    const setAuthToken = (token: string | null) => {
        if (token) {
            localStorage.setItem("authToken", token);
        } else {
            localStorage.removeItem("authToken");
        }
        setAuthTokenState(token);
    };

    const logout = () => {
        setAuthToken(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ authToken, setAuthToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
