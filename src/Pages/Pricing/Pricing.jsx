import React, { useState } from "react";

const Pricing = () => {
  const [parcelType, setParcelType] = useState("");
  const [destination, setDestination] = useState("");
  const [weight, setWeight] = useState("");
  const [cost, setCost] = useState(null);

  const calculatePrice = () => {
    if (!parcelType || !destination || !weight) return;

    const parcelWeight = parseFloat(weight);
    const isDocument = parcelType === "document";
    const isSameDistrict = destination === "inside_city"; // modify if needed

    let totalCost = 0;

    // =============== YOUR PRICE FORMULA ===============
    if (isDocument) {
      totalCost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        totalCost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;

        totalCost = minCharge + extraCharge;
      }
    }
    // =============== END FORMULA ======================

    setCost(totalCost);
  };

  const handleReset = () => {
    setParcelType("");
    setDestination("");
    setWeight("");
    setCost(null);
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-5">
      <h1 className="text-4xl font-bold text-gray-900">Pricing Calculator</h1>
      <p className="text-gray-600 mt-2 max-w-xl">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>

      <hr className="my-6" />

      <h2 className="text-3xl font-bold text-center text-green-500 mb-6">
        Calculate Your Cost
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Form */}
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Parcel Type</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={parcelType}
              onChange={(e) => setParcelType(e.target.value)}
            >
              <option value="">Select Parcel type</option>
              <option value="document">Document</option>
              <option value="parcel">Parcel</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Delivery Destination</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            >
              <option value="">Select Delivery Destination</option>
              <option value="inside_city">Inside Same District</option>
              <option value="outside_city">Outside District</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Weight (KG)</label>
            <input
              type="number"
              min="0"
              className="w-full border rounded px-3 py-2"
              placeholder="Enter weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={handleReset}
              className="px-6 py-2 border rounded bg-gray-100"
            >
              Reset
            </button>
            <button
              onClick={calculatePrice}
              className="px-6 py-2 rounded bg-lime-500 text-white font-semibold"
            >
              Calculate
            </button>
          </div>
        </div>

        {/* Right Cost Display */}
        <div className="flex items-center justify-center">
          {cost !== null && (
            <h1 className="text-6xl font-bold text-gray-900">{cost} Tk</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
