import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Link } from 'react-router';

const PaymentHistory = () => {
  //   useAuth
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  // tanstack query
  const {  data: payments =[]} = useQuery({
     queryKey: ['payments', user.email],
     queryFn: async ()=>{
          const res = await axiosSecure.get(`/payments?email=${user.email}`)
          return res.data;
     }
  })


  return (
    <div>
      <h2 className="text-5xl">Payment History : {payments.length}</h2>
      
      {/* table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Parcel Name</th>
              <th>Amount</th>
              <th>Transaction Id</th>
              <th>Tracking Id</th>
              <th>Payment Info</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr className='font-semibold text-lg' key={payment._id}>
                <th>{index + 1}</th>
                <td >{payment.parcelName}</td>
                <td>${payment.amount}</td>
                <td>{payment.transactionId}</td>
                <td>{payment.trackingId}</td>
                <td>${payment.amount}({payment.paymentStatus})</td>
                <td>
                  <button className='p-2 btn btn-primary text-black'>View</button>
                </td>
               
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </div>
  );
};

export default PaymentHistory;