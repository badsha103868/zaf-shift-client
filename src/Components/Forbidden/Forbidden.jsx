import React from "react";
import { Link } from "react-router";


const Forbidden = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        {/* Big icon */}
        <div className="mx-auto w-32 h-32 rounded-full flex items-center justify-center bg-red-50 border-2 border-red-100 mb-6">
          {/* simple SVG "forbidden / 403" */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 h-20 text-red-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>

        <h1 className="text-3xl font-extrabold text-red-600 mb-2">
          403 — Forbidden
        </h1>

        <p className="text-gray-600 mb-6">
          You do not have permission to view this page. If you believe this is
          a mistake, please contact your administrator.
        </p>

        {/* helpful info / small hint */}
        <div className="text-sm text-gray-500 mb-6">
          Possible reasons:
          <ul className="list-disc list-inside text-left mt-2 mx-auto max-w-md">
            <li>Your account lacks required role (Admin).</li>
            <li>You are not logged in or your session expired.</li>
            <li>The resource is restricted by the owner.</li>
          </ul>
        </div>

        {/* actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="px-5 py-2 rounded-lg btn btn-primary text-black"
          >
            Go to Home
          </Link>

          <Link
            to="/dashboard"
            className="px-5 py-2 rounded-lg btn btn-outline"
          >
            Go to Dashboard
          </Link>

          <Link
            to="/contact"
            className="px-5 py-2 rounded-lg text-sm text-gray-700 hover:underline"
          >
            Contact Admin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
