import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
//  jehetu custom hook tai onno function k o call korte parbo 
const { user } = useAuth()

  // axios  interceptor
  useEffect(() => {
    // interceptors request
    axiosSecure.interceptors.request.use((config) => {
      // authorization k header hishabe patono 
      config.headers.Authorization = `Bearer ${user?.accessToken}`

      return config;
    });
  }, [user]);

  return axiosSecure;
};

export default useAxiosSecure;
