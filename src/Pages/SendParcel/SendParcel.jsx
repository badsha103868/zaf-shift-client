import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";

const SendParcel = () => {
  const { register, handleSubmit, control , formState: { errors }} = useForm();
  //   json data received
  const serviceCenters = useLoaderData();

  const regionsDuplicate = serviceCenters.map((c) => c.region);
  //   no repeat same district
  const regions = [...new Set(regionsDuplicate)];

//   wach ar poriborte useWatch use 
  const senderRegion = useWatch({control, name: "senderRegion"})
//   receiver region
  const receiverRegion = useWatch({control, name: "receiverRegion"})

  //   akhon region vittik district gulo k dekhanor jonno
  const districtsByRegion = region => {
    const regionDistricts = serviceCenters.filter(c => c.region === region);
    const districts = regionDistricts.map(d => d.district);
    return districts;
  };


   console.log(regions);
  const handleSendParcel = (data) => {
    console.log(data);
   //  same district
   const sameDistrict = data.senderDistrict === data.receiverDistrict ;
   console.log(sameDistrict)
  };

  return (
    <div>
      <h2 className="text-5xl font-bold">Send A Parcel</h2>
      <form
        onSubmit={handleSubmit(handleSendParcel)}
        className="mt-12 text-black text-xl font-bold p-4"
      >
        {/* parcel type */}

        <div className="space-x-3">
          <label className="label">
            <input
              type="radio"
              {...register("parcelType")}
              value="document"
              className="radio"
              defaultChecked
            />
            Document
          </label>

          <label className="label">
            <input
              type="radio"
              {...register("parcelType")}
              value="non-document"
              className="radio"
            />
            Non-Document
          </label>
        </div>

        {/* parcel info: name, */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-8">
          {/* parcel name */}
          <fieldset className="fieldset">
            <label className="label">Parcel Name</label>
            <input
              type="text"
              {...register("parcelName")}
              className="input w-full"
              placeholder="Parcel Name"
            />
          </fieldset>

          {/* parcel weight */}
          <fieldset className="fieldset">
            <label className="label">Parcel Weight</label>
            <input
              type="number"
              {...register("parcelWeight")}
              className="input w-full"
              placeholder="Parcel Weight"
            />
          </fieldset>
        </div>

        {/* two column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* sender  name */}
          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold">Sender Details</h4>
            {/* sender name */}
            <label className="label">Sender Name</label>
            <input
              type="text"
              {...register("senderName")}
              className="input w-full"
              placeholder="Sender Name"
            />

            {/* sender email */}
            <label className="label">Sender Email</label>
            <input
              type="text"
              {...register("senderEmail")}
              className="input w-full"
              placeholder="Sender Email"
            />

            {/* sender region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender Regions</legend>
              <select {...register("senderRegion")} defaultValue="Pick a region" className="select">
                <option disabled={true}>Pick a region</option>
                {regions.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* sender District */}

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender District</legend>
              <select {...register("senderDistrict")} defaultValue="Pick a District" className="select">
                <option disabled={true}>Pick a District</option>
                {districtsByRegion(senderRegion).map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* sender address */}

            <label className="label mt-4">Sender Address</label>
            <input
              type="text"
              {...register("senderAddress")}
              className="input w-full"
              placeholder="Sender Address"
            />

            {/* sender phone number */}

            <label className="label mt-4">Sender Phone Number</label>
            <input
              type="text"
              {...register("senderPhoneNumber")}
              className="input w-full"
              placeholder="Sender Phone Number"
            />

            {/* Pickup Instruction */}

            <label className="label mt-4">Pickup Instruction</label>
            <textarea
              {...register("senderMessage")}
              className="input h-20 w-full"
              placeholder="Pickup Instruction"
            />
          </fieldset>



          {/*receiver info  */}


          <div>
            {/* receiver  name */}
            <fieldset className="fieldset">
              <h4 className="text-2xl font-semibold">Receiver Details</h4>
              <label className="label">Receiver Name</label>
              <input
                type="text"
                {...register("receiverName")}
                className="input w-full"
                placeholder="Receiver Name"
              />

              {/* Receiver email */}
              <label className="label">Receiver Email</label>
              <input
                type="text"
                {...register("receiverEmail")}
                className="input w-full"
                placeholder="Receiver Email"
              />

              {/* Receiver region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Receiver Regions</legend>
              <select {...register("receiverRegion")} defaultValue="Pick a region" className="select">
                <option disabled={true}>Pick a region</option>
                {regions.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            
            {/* Receiver District */}

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Receiver District</legend>
              <select {...register("receiverDistrict")} defaultValue="Pick a District" className="select">
                <option disabled={true}>Pick a District</option>
                {districtsByRegion(receiverRegion).map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </fieldset>

              {/* Receiver address */}

              <label className="label mt-4">Receiver Address</label>
              <input
                type="text"
                {...register("receiverAddress")}
                className="input w-full"
                placeholder="Receiver Address"
              />

              {/* Receiver phone number */}

              <label className="label mt-4">Receiver Phone Number</label>
              <input
                type="text"
                {...register("receiverPhoneNumber")}
                className="input w-full"
                placeholder="Receiver Phone Number"
              />

              

              {/* receiver Pickup Instruction */}

              <label className="label mt-4">Pickup Instruction</label>
              <textarea
                {...register("receiverMessage")}
                className="input h-20 w-full"
                placeholder="Pickup Instruction"
              />
            </fieldset>
          </div>
        </div>
        {/* button */}
        <input
          type="submit"
          className="btn btn-primary mt-4 px-10 text-black"
          value="Send Parcel"
        />
      </form>
    </div>
  );
};

export default SendParcel;
