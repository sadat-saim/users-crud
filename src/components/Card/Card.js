import React from "react";

const Card = ({ user }) => {
  const { displayName, email, photoURL } = user;

  return (
    <div>
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
      </div>
    </div>
  );
};

export default Card;
