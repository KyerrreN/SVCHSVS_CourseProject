// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState("");

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        const storedRole = sessionStorage.getItem("role");
        if (token && storedRole) {
            setIsAuthenticated(true);
            setRole(storedRole);
        }
    }, []);

    const login = (role, token, name, surname, id) => {
        setIsAuthenticated(true);
        setRole(role);
        sessionStorage.setItem("role", role);
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("surname", surname);
        sessionStorage.setItem("id", id);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setRole("");
        sessionStorage.removeItem("role");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("surname");
        sessionStorage.removeItem("id");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
