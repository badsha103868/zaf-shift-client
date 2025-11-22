import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import { Link } from 'react-router';

const PaymentCancelled = () => {
  return (
     <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 text-center max-w-sm">
        <FaTimesCircle className="text-red-500 text-5xl mx-auto mb-4" />

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Cancelled
        </h2>

        <p className="text-gray-600 mb-6">
          Your payment was not completed.  
          Please try again or contact support if you need help.
        </p>
       
       <Link to="/dashboard/my-parcel">
          <button
          
          className="btn-primary btn text-black px-6 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Try Again
        </button>
        </Link>
       
      </div>
    </div>
  );
};

export default PaymentCancelled;