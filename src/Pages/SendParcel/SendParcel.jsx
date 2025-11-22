import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors }
  } = useForm();

  // user data
  const { user } = useAuth();

  // navigate
  const navigate = useNavigate()

  // axios secure
  const axiosSecure = useAxiosSecure();

  //   json data received
  const serviceCenters = useLoaderData();

  const regionsDuplicate = serviceCenters.map((c) => c.region);
  //   no repeat same district
  const regions = [...new Set(regionsDuplicate)];

  //   wach ar poriborte useWatch use
  const senderRegion = useWatch({ control, name: "senderRegion" });
  //   receiver region
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  //   akhon region vittik district gulo k dekhanor jonno
  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  //  console.log(regions);

  // handle function run
  const handleSendParcel = (data) => {
    console.log(data);
    //  same district
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    //  console.log(isSameDistrict)

    //  pricing calculation
    const isDocument = data.parcelType === "document";
    //  parcel type
    const parcelWeight = parseFloat(data.parcelWeight);

    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;

        cost = minCharge + extraCharge;
      }
    }
    console.log("total cost", cost);

    //  post korar somoy data ar sta cost o patano
    data.cost = cost;

    //  sweat alert ar maddome conform kora
    Swal.fire({
      title: "Agree with the Cost?",
      text: `You will be charged ${cost} taka!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Conform and Continue Payment!",
    })
    .then((result) => {

      if (result.isConfirmed) {
        //  save the parcel info to the database
        //  post
        axiosSecure.post("/parcels", data).then((res) => {
          console.log("after saving parcel", res.data);

          if (res.data.insertedId) {
           
            // navigate to my parcel page
            navigate('/dashboard/my-parcel')

            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Parcel has created . Please Pay ",
              showConfirmButton: false,
              timer: 2500,
            });
          }
        });
      }
    });
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
          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold">Sender Details</h4>
            {/* sender name */}
            <label className="label">Sender Name</label>
            <input
              type="text"
              {...register("senderName")}
              defaultValue={user?.displayName}
              className="input w-full"
              placeholder="Sender Name"
            />

            {/* sender email */}
            <label className="label">Sender Email</label>
            <input
              type="text"
              {...register("senderEmail")}
              defaultValue={user?.email}
              className="input w-full"
              placeholder="Sender Email"
            />

            {/* sender region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender Regions</legend>
              <select
                {...register("senderRegion")}
                defaultValue="Pick a region"
                className="select"
              >
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
              <select
                {...register("senderDistrict")}
                defaultValue="Pick a District"
                className="select"
              >
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
                <select
                  {...register("receiverRegion")}
                  defaultValue="Pick a region"
                  className="select"
                >
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
                <select
                  {...register("receiverDistrict")}
                  defaultValue="Pick a District"
                  className="select"
                >
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
