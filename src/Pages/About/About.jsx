import { NavLink, Outlet } from "react-router";


const About = () => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
      <p className="text-gray-500 mt-2 max-w-2xl">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
      </p>

      <hr className="my-6" />

      <div className="flex gap-8 text-lg font-medium">
        <NavLink to="" end className={({isActive}) => isActive ? "text-green-700" : "text-gray-600"}>Story</NavLink>

        <NavLink to="mission" className={({isActive}) => isActive ? "text-green-700" : "text-gray-600"}>Mission</NavLink>

        <NavLink to="success" className={({isActive}) => isActive ? "text-green-700" : "text-gray-600"}>Success</NavLink>

        <NavLink to="team" className={({isActive}) => isActive ? "text-green-700" : "text-gray-600"}>Team & Others</NavLink>
      </div>

      {/* Nested route outlet */}
      <div className="mt-8">
        <Outlet />
      </div>
    </div>
  );
};

export default About;
