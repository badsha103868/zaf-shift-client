import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const AssignRiders = () => {
  const axiosSecure = useAxiosSecure()
  
  const { data: parcels =[]} = useQuery({
    queryKey: ['parcels', "pending-pickup"],
    queryFn: async()=>{
      const res = await axiosSecure.get('/parcels?deliveryStatus=pending-pickup')
      return res.data;
    }
  })


  return (
    <div>
      <h2 className="text-5xl text-primary">Assign Riders : {parcels.length}</h2>
    </div>
  );
};

export default AssignRiders;