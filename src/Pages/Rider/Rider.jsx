import React from "react";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const Rider = () => {
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors }
  } = useForm();

  // user data
  const { user } = useAuth();

  // // navigate
  // const navigate = useNavigate()

  // axios secure
  const axiosSecure = useAxiosSecure();

  //   json data received
  const serviceCenters = useLoaderData();

  const regionsDuplicate = serviceCenters.map((c) => c.region);
  //   no repeat same district
  const regions = [...new Set(regionsDuplicate)];

  //   watch ar poriborte useWatch use
  // explore useMemo useCallback

  const riderRegion = useWatch({ control, name: "region" });

  //   akhon region vittik district gulo k dekhanor jonno
  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  // handleRiderApplication
  const handleRiderApplication = (data) => {
    console.log(data);

    axiosSecure.post("/riders", data).then((res) => {
      if (res.data.insertedId) {
        

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your application has been submitted. We will reach you in  45 days ",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  return (
    <div>
      <h2 className="text-4xl p-4 text-primary">Be A Rider</h2>
      <p className="text-secondary p-4">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal <br /> packages to business shipments — we deliver
        on time, every time.
      </p>
      <form
        onSubmit={handleSubmit(handleRiderApplication)}
        className="mt-12 text-black text-xl font-bold p-4"
      >
        {/* two column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold">Rider Details</h4>
            {/* rider name */}
            <label className="label"> Name</label>
            <input
              type="text"
              {...register("name")}
              defaultValue={user?.displayName}
              className="input w-full"
              placeholder="Your Name"
            />

            {/* rider email */}
            <label className="label"> Email</label>
            <input
              type="text"
              {...register("email")}
               defaultValue={user?.email}
              className="input w-full"
              placeholder="Your Email"
            />

            {/* rider region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend"> Regions</legend>
              <select
                {...register("region")}
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

            {/* rider District */}

            <fieldset className="fieldset">
              <legend className="fieldset-legend"> District</legend>
              <select
                {...register("district")}
                defaultValue="Pick a District"
                className="select"
              >
                <option disabled={true}>Pick a District</option>
                {districtsByRegion(riderRegion).map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* rider address */}

            <label className="label mt-4"> Address</label>
            <input
              type="text"
              {...register("address")}
              className="input w-full"
              placeholder="Your Address"
            />

            {/* rider phone number */}

            <label className="label mt-4"> Phone Number</label>
            <input
              type="text"
              {...register("phoneNumber")}
              className="input w-full"
              placeholder="Your Phone Number"
            />
          </fieldset>

          <div>
            {/* Driving License */}
            <fieldset className="fieldset">
              <h4 className="text-2xl font-semibold">More Details</h4>
              <label className="label">Driving License</label>
              <input
                type="text"
                {...register("license")}
                className="input w-full"
                placeholder="Driving License"
              />

              {/* Receiver email */}
              <label className="label">NID</label>
              <input
                type="text"
                {...register("nid")}
                className="input w-full"
                placeholder="Nid Number"
              />

              {/* Bike Information */}

              <label className="label mt-4">Bike Information</label>
              <input
                type="text"
                {...register("bike")}
                className="input w-full"
                placeholder="Bike Information"
              />
            </fieldset>
          </div>
        </div>
        {/* button */}
        <input
          type="submit"
          className="btn btn-primary mt-4 px-10 text-black"
          value="Apply as a Rider "
        />
      </form>
    </div>
  );
};

export default Rider;
