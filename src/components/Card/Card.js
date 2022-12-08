import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const Card = ({ user }) => {
  const { displayName, email, photoURL } = user;
  const { user: loggedInUser } = useContext(AuthContext);

  return (
    <div className="relative">
      <div className="flex flex-col justify-center p-6 shadow-md rounded-xl bg-gray-50 text-gray-800 w-full h-full">
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
          <>
            <button className="btn btn-sm btn-circle btn-outline absolute top-3 left-16">
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
            <button className="btn btn-sm btn-circle btn-outline absolute top-3 left-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
