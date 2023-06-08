import axios from "axios";
import toast from "react-hot-toast";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { useRouter } from "next/router";

const useAuth = (setUser?: any) => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signupState, setSignupState] = useState({
    username: "",
    password: "",
    re_Password: "",
    email: "",
    first_name: "",
    last_name: "",
  });

  const login = useCallback(async () => {
    try {
      const { data } = await axios.post(`/api/login`, {
        username,
        password,
      });

      setUser(data);

      router.push("/");
    } catch (e: any) {
      toast.error(e?.response?.data);
    }
  }, [username, password]);

  const logout = useCallback(async () => {
    try {
      const { data } = await axios.post(`/api/logout`);
      setUser(null);

      router.push("/");
    } catch (e: any) {
      toast.error(e?.response?.data);
    }
  }, [setUser]);

  const signup = useCallback(async () => {
    try {
      const { data } = await axios.post(`/backend/signup`, signupState);

      router.push("/login");
    } catch (e: any) {
      toast.error(e?.response?.data);
    }
  }, [username, password, signupState]);

  return {
    username,
    password,
    signupState,
    setSignupState,
    signup,
    setUsername,
    setPassword,
    login,
    logout,
  };
};

export default useAuth;
