import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PaymentSuccess = () => {
  // useSearchParams
  const [searchParams] = useSearchParams();

  const [paymentInfo, setPaymentInfo] = useState({});

  console.log(paymentInfo.transactionId,paymentInfo.trackingId )

  // axiosSecure
  const axiosSecure = useAxiosSecure();

  const sessionId = searchParams.get("session_id");

  console.log(sessionId);

  //  useEffect
  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
        });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 text-center ">
        <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h2>
        <p className="text-red-400 font-bold">
          Your TransactionId:
          <span className="text-blue-600 text-xl">
            {paymentInfo.transactionId}
          </span>
        </p>

        <p className="text-green-400 font-bold">
          Your Parcel Tracking Id:
          <span className="text-yellow-700 text-xl">
            {paymentInfo.trackingId}
          </span>
        </p>

        <p className="text-gray-600 mb-6">
          Your payment has been completed successfully. Thank you for your
          purchase!
        </p>

        <Link to="/dashboard/my-parcel">
          <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition">
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
