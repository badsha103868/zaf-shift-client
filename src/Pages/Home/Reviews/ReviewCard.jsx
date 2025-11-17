import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const ReviewCard = ({ reviewData }) => {
 
  const{userName ,review, user_photoURL}=reviewData

  return (
     <div className="card w-full max-w-sm bg-base-100 shadow-lg rounded-2xl p-6 border">
      {/* Quote Icon */}
      <FaQuoteLeft className="text-teal-400 text-3xl mb-4" />

      {/* Description */}
      <p className=" mb-4">
        {review}
      </p>

      {/* Dashed Line */}
      <div className="border-t border-dashed my-4"></div>

      {/* Profile */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-teal-700 rounded-full">
          <img src={user_photoURL} alt="" />
        </div>

        <div>
          <h3 className="font-semibold text-gray-800">{userName}</h3>
          <p className="text-sm text-gray-500">Senior Product Designer</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;