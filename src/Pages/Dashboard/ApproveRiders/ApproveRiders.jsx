import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaUserCheck } from "react-icons/fa";
import { IoPersonRemove, IoPersonRemoveSharp } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: riders = [] } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  //  akoi sta approved o reject korte
  const updateRiderStatus = (rider, status)=>{

        const updateInfo = { status: status , email: rider.email };

    axiosSecure.patch(`/riders/${rider._id}`, updateInfo)

    .then((res) => {

      if (res.data.modifiedCount) {

        refetch()
        // console.log('Status Updated successfully')
        Swal.fire({
          position: "top-end",
          icon: "success",
          title:
            `Rider has been ${status}. `,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  }

  // handleApproval
  const handleApproval = (rider) => {
    // console.log(id)
    updateRiderStatus(rider, "approved")
  };

  const handleRejection =(rider)=>{
    updateRiderStatus(rider, "rejected")
  }

  return (
    <div>
      <h2 className="text-5xl text-primary">
        {" "}
        Riders Pending Approval:{" "}
        <span className="text-black">{riders.length}</span>
      </h2>

      {/* table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr className="font-semibold text-lg text-green-500">
              <th></th>
              <th>Parcel Name</th>
              <th>Email</th>
              <th>Status </th>
              <th>District</th>
              <th>Bike Info</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr className="font-semibold text-lg" key={rider._id}>
                <th>{index + 1}</th>
                <td>{rider.name}</td>
                <td>${rider.email}</td>

                <td>
                  <p className={`${rider.status === 'approved' ? 'text-green-500' : 'text-red-500'}`}>{rider.status}</p>
                
                </td>

                <td>{rider.district}</td>
                <td>{rider.bike}</td>

                <td className="space-x-2">
                  <button
                    onClick={() => handleApproval(rider)}
                    className="p-2 btn btn-primary text-black"
                  >
                    <FaUserCheck></FaUserCheck>
                  </button>

                  <button onClick={()=>handleRejection(rider)} className="p-2 btn text-black">
                    <IoPersonRemoveSharp />
                  </button>

                  <button className="p-2 btn text-black">
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

export default ApproveRiders;
