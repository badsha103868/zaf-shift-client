import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();
  // tanstac query
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });

  return (
    <div>
      <h2 className="text-5xl text-primary">Manage Users: {users.length}</h2>


      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
               Sl No.
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user, index) => (
              <tr key={user._id}>
                
                <td>
                  {index + 1}
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={user.photoURL} alt="" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.displayName}</div>
                      <div className="text-sm opacity-50">Bangladesh</div>
                    </div>
                  </div>
                </td>
                <td>
                 {user.email}
                
                </td>
                <td>Admin</td>
                <th>
                 Actions
                </th>
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;
