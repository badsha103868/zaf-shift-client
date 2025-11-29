import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaMoneyBill } from 'react-icons/fa';

const CompletedDeliveries = () => {
   const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {  data: parcels = [] } = useQuery({
    queryKey: ["parcels", user.email, "driver_assigned"],

    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=parcel_delivered`
      );

      return res.data;
    },
  });
  
  // rider commission calculate
  const  calculatePayout = parcel =>{
    if(parcel.senderDistrict === parcel.receiverDistrict){
      return parcel.cost * 0.8
    }
    else{
      return parcel.cost * 0.6
    }
  }



  return (
    <div> 
     <h2 className='text-4xl text-primary'>Completed Deliveries: {parcels.length}</h2>
       {/* table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr className="font-semibold text-lg text-green-500">
              <th>Sl No</th>
              <th>Parcel Name</th>
              
              <th>Created At </th>
              <th>Pickup District</th>
              <th>Cost</th>
              <th>Payout</th>
              

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr className="font-semibold text-lg" key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>

                

                <td>{parcel.createdAt}</td>

                <td>{parcel.senderDistrict}</td>
                <td>{parcel.cost} ৳</td>

                <td>{calculatePayout(parcel)}</td>

                <td>
                  <button
                    
                    className="p-2 btn btn-primary text-black"
                  >
                    Cash Out
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedDeliveries;