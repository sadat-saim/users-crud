import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const Card = ({ user }) => {
  const { displayName, email, photoURL } = user;
  const { user: loggedInUser } = useContext(AuthContext);

  return (
    <div className="relative">
      <div className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 bg-gray-50 text-gray-800">
        <img
          src={photoURL}
          alt=""
          className="w-32 h-32 mx-auto rounded-full bg-gray-500 aspect-square"
        />
        <div className="space-y-4 text-center divide-y divide-gray-300">
          <div className="my-2 space-y-1">
            <h2 className="text-xl font-semibold sm:text-2xl uppercase">
              {displayName}
            </h2>
            <p className="px-5 text-xs sm:text-base text-gray-600">{email}</p>
          </div>
        </div>
        {loggedInUser && (
          <button className="btn btn-sm btn-circle btn-outline absolute top-3 right-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
