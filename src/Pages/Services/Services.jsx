import React from "react";
import { FaClock, FaHeadset, FaMapMarkedAlt } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";

const Services = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Our Delivery Services
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
          We began with a simple mission — to redefine parcel delivery by making
          it faster, more reliable, and completely hassle-free. Over the years,
          our dedication to real-time tracking, smart logistics, and a
          customer-first approach has earned the trust of thousands. Whether
          it’s a heartfelt personal gift or an urgent business shipment, we
          ensure your parcel arrives safely — and always on time.
        </p>
      </div>

      {/* Services Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Service 1 */}
        <div className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
          <div className="text-indigo-600 text-5xl mb-4 flex justify-center">
            <FaTruckFast />
          </div>
          <h3 className="text-xl font-semibold text-center mb-3">
            Fast Delivery
          </h3>
          <p className="text-gray-600 text-center">
            Speed is our priority. We ensure every parcel arrives quickly,
            safely, and right on time — no delays.
          </p>
        </div>

        {/* Service 2 */}
        <div className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
          <div className="text-green-600 text-5xl mb-4 flex justify-center">
            <FaMapMarkedAlt />
          </div>
          <h3 className="text-xl font-semibold text-center mb-3">
            Real-Time Tracking
          </h3>
          <p className="text-gray-600 text-center">
            Track your parcels at every step. Stay updated with accurate,
            real-time location details.
          </p>
        </div>

        {/* Service 3 */}
        <div className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
          <div className="text-blue-600 text-5xl mb-4 flex justify-center">
            <FaClock />
          </div>
          <h3 className="text-xl font-semibold text-center mb-3">
            On-Time Guarantee
          </h3>
          <p className="text-gray-600 text-center">
            Whether it’s urgent documents or special gifts, we deliver at the
            exact time you expect.
          </p>
        </div>

        {/* Service 4 */}
        <div className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 md:col-start-2">
          <div className="text-orange-600 text-5xl mb-4 flex justify-center">
            <FaHeadset />
          </div>
          <h3 className="text-xl font-semibold text-center mb-3">
            24/7 Customer Support
          </h3>
          <p className="text-gray-600 text-center">
            Have questions? Our support team is here around the clock to assist
            you anytime.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;
