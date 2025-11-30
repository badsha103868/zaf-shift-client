import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FiEdit } from "react-icons/fi";
import { FaMagnifyingGlass, FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyParcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  // handle Delete
  const handelParcelDelete = (id) => {
    console.log(id);
    // sweat alert modal show

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount) {
            refetch();

            Swal.fire({
              title: "Deleted!",
              text: "Your parcel request has been deleted.",
              icon: "success",
            });
          }
        });

        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success",
        // });
      }
    });
  };

  //  handle payment
  const handlePayment = async (parcel) => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
      trackingId: parcel.trackingId,
    };
    const res = await axiosSecure.post(
      "/payment-checkout-session",
      paymentInfo
    );

    console.log(res.data.url);
    window.location.assign(res.data.url);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold ml-5 my-5">
        All of my parcel : {parcels.length}
      </h2>

      {/* table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra ">
          {/* head */}
          <thead>
            <tr className="font-bold text-lg">
              <th></th>
              <th>Name</th>
              <th>Cost</th>
              <th>Payment</th>
              <th>Tracking Id</th>

              <th>Delivery Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr className="font-bold text-lg" key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost} ৳</td>

                {/* <td>
                  {
                    //  payment status conditional set
                    parcel.paymentStatus === "paid" ? (
                      <span className="text-green-400">Paid</span>
                    ) : (
                      <Link to={`/dashboard/payment/${parcel._id}`}>
                        <button className="btn btn-sm text-black btn-primary">
                          Pay
                        </button>
                      </Link>
                    )
                  }
                </td> */}
                <td>
                  {parcel.paymentStatus === "paid" ? (
                    <span className="text-green-400">Paid</span>
                  ) : (
                    <button
                      onClick={() => handlePayment(parcel)}
                      className="btn btn-sm btn-primary text-black"
                    >
                      Pay
                    </button>
                  )}
                </td>

                <td className="text-green-700 ">
                  <Link to={`/parcel-track/${parcel.trackingId}`}>
                    {parcel.trackingId}
                  </Link>
                </td>

                <td className="text-green-700 ">{parcel.deliveryStatus}</td>
                <td className="space-x-3">
                  <button className="btn btn-square hover:bg-primary">
                    <FiEdit></FiEdit>
                  </button>
                  <button className="btn btn-square hover:bg-primary">
                    <FaMagnifyingGlass></FaMagnifyingGlass>
                  </button>
                  <button
                    onClick={() => handelParcelDelete(parcel._id)}
                    className="btn btn-square hover:bg-primary"
                  >
                    <FaTrashCan></FaTrashCan>
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

export default MyParcel;
