import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const MyParcel = () => { 
  const { user }= useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: parcels = [] } = useQuery({
    queryKey : ['myParcels', user?.email],
    queryFn: async () =>{
      const res = await axiosSecure.get(`/parcels?email=${user.email}`)
      return res.data;
    }

  })



  return (
    <div>
      All of my parcel : {parcels.length}
    </div>
  );
};

export default MyParcel;