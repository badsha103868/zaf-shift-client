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

  // loading dakano
  if (isLoading) {
    return <Loading></Loading>
  }
  return (
    <div>
      <h2>Please Pay for: {parcel.parcelName}</h2>
      <button className="btn btn-primary text-black">Pay</button>
    </div>
  );
};

export default Payment;
