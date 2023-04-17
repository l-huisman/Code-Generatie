import axios from "axios";
import toast from "react-hot-toast";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { useRouter } from "next/router";

const useAuth = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = useCallback(
    async (e: any) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(`/api/login`, {
          email,
          password,
        });

        router.push("/");
      } catch (e: any) {
        toast.error(e?.response?.data);
      }
    },
    [email, password]
  );

  const logout = useCallback(async () => {
    try {
      const { data } = await axios.post(`/api/logout`);

      router.push("/");
    } catch (e: any) {
      toast.error(e?.response?.data);
    }
  }, []);

  return {
    email,
    password,
    setEmail,
    setPassword,
    login,
    logout,
  };
};

export default useAuth;
