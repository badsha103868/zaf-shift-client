import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
//  jehetu custom hook tai onno function k o call korte parbo 
const { user, logOut } = useAuth()

const navigate = useNavigate()

  // axios  interceptor
  useEffect(() => {
    // interceptors request
   const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
      // authorization k header hishabe patono 
      config.headers.Authorization = `Bearer ${user?.accessToken}`

      return config;
    }); 


    // interceptors response
    const resInterceptor = axiosSecure.interceptors.response.use((response)=>{
       return response;
    }, (error)=>{
      console.log(error)
      
      // jodi error status code 401 and 403 hoi tahole logOut 
      const statusCode = error.status;
      if(statusCode === 401 || statusCode === 403){
        logOut()
        .then(()=>{
          navigate('/login')
        })
      } 



      return Promise.reject(error)
    } )

    return ()=>{
      axiosSecure.interceptors.request.eject(reqInterceptor)
      axiosSecure.interceptors.response.eject(resInterceptor)
    }



  }, [user]);

  return axiosSecure;
};

export default useAxiosSecure;
