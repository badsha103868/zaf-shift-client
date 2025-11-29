import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../Loading/Loading";

const Payment = () => {
  const axiosSecure = useAxiosSecure();

  const { parcelId } = useParams();
  // tanstack query use kora data load

  const { isLoading, data: parcel } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });



  // pay button 
  const handlePayment = async ()=>{
  //  backend a j data gulo client  theka pabo bole liksi  oi gulo payment info hishabe patate hobe tai patassi

     const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName
     }
  //  backend ar api url k call
   const res = await axiosSecure.post('/create-checkout-session', paymentInfo)

   console.log(res.data)
  //  new window checkout open 
  window.location.href = res.data.url;

  }

  // loading dakano
  if (isLoading) {
    return <Loading></Loading>
  }
  return (
    <div>

      <h2>Please Pay <span className="text-lg text-red-500 font-bold">${parcel.cost} ৳</span>for: <span className="text-lg text-green-500 font-bold">{parcel.parcelName}</span></h2>

      <button onClick={handlePayment} className="btn btn-primary text-black">Pay</button>
    </div>
  );
};

export default Payment;
