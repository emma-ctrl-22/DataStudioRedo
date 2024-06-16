import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import * as jwt_decode from "jwt-decode"; // Correct default import
import toast, { Toaster } from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [isCredentialsLegit, setIsCredentialsLegit] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", { email, password });
      if (res.status === 200) {
        setIsCredentialsLegit(true);
        toast.success('Logged in Successfully');
        const { token } = res.data;
        console.log("Login successful", token);
        const decodedToken = jwt_decode(token);
        const { id, email, role, username } = decodedToken;
        const UserInfo = { id, email, role, username };
        console.log(UserInfo);
        setUserInfo(UserInfo);
        setUserToken(token);
        localStorage.setItem("userInfo", JSON.stringify(UserInfo));
        localStorage.setItem("userToken", token);
      } else {
        setIsCredentialsLegit(false);
        console.log("Login failed");
      }
      return res.status;
    } catch (error) {
      console.error("Login error from AuthContext", error);
      setError(error.message);
      setIsCredentialsLegit(false);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, phone, role, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("http://localhost:8080/api/auth/register", {
        name,
        email,
        phone,
        role,
        password,
      });
      if (res.status === 201) {
        toast.success("Registration successful");
        console.log("Registration successful");
      }
      return res.status;
    } catch (error) {
      console.error("Registration error in AuthContext", error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearUserInfo = () => {
    setUserToken(null);
    setUserInfo(null);
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userToken");
  };

  const logout = () => {
    clearUserInfo();
    toast.success("Logout successful");
  };

  const isLogged = () => {
    const storedUserInfo = localStorage.getItem("userInfo");
    const storedToken = localStorage.getItem("userToken");
    if (storedUserInfo && storedToken) {
      setUserInfo(JSON.parse(storedUserInfo));
      setUserToken(storedToken);
    }
    setLoading(false);
  };

  useEffect(() => {
    isLogged();
  }, []);

  return (
    <AuthContext.Provider value={{ login, register, logout, isLoading, userToken, userInfo, isLogged, error, setError, isCredentialsLegit }}>
      {children}
      <Toaster />
    </AuthContext.Provider>
  );
};
