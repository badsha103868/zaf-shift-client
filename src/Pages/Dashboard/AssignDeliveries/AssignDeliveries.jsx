import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AssignDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { refetch, data: parcels = [] } = useQuery({
    queryKey: ["parcels", user.email, "driver_assigned"],

    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=driver_assigned`
      );

      return res.data;
    },
  });

  // handleAcceptDelivery
  const handleDeliveryStatusUpdate = (parcel, status) => {
    const statusInfo = { 
      deliveryStatus: status,
      riderId: parcel.riderId,
      trackingId: parcel.trackingId

     };
    
    let message = `Parcel Status is updated with ${status.split('_').join(' ')}`
     
    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div>
      <h2 className="text-4xl">Parcels Pending PickUp: {parcels.length}</h2>
      {/* table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr className="font-semibold text-lg text-green-500">
              <th></th>
              <th>Parcel Name</th>

              {/* <th>Sender Name</th>
              <th>Sender Email</th> */}
              <th>Conform</th>
              <th>Other Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr className="font-semibold text-lg" key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>

                {/* <td>{parcel.senderName} </td>
                <td>{parcel.senderEmail} </td> */}
                <td className="space-x-2">
                  {parcel.deliveryStatus === "driver_assigned" ? (
                    <>
                      <button
                        onClick={() => handleDeliveryStatusUpdate(parcel, 'rider_arriving')}
                        className="btn  btn-primary text-black"
                      >
                        Accept
                      </button>

                      <button className="btn  btn-warning text-black">
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="text-green-700">Accepted</span>
                  )}
                </td>
                <td className="space-x-2">
                  <button
                    onClick={() => handleDeliveryStatusUpdate(parcel, 'parcel_picked_up')}
                    className="btn  btn-primary text-black"
                  >
                    Mark as Picked Up
                  </button>

                  <button
                    onClick={() => handleDeliveryStatusUpdate(parcel, 'parcel_delivered')}
                    className="btn  btn-warning text-black"
                  >
                    Mark as Delivered
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

export default AssignDeliveries;
