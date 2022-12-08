import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const Profile = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="grid place-content-center mt-6">
      <div className="max-w-md p-8 sm:flex sm:space-x-6 bg-gray-50 text-gray-800">
        <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
          <img
            src={user?.photoURL}
            alt=""
            className="object-cover object-center w-full h-full rounded bg-gray-500"
          />
        </div>
        <div className="flex flex-col h-full items-center">
          <div>
            <h2 className="text-2xl font-semibold">{user?.displayName}</h2>
            <span className="text-sm text-gray-600">{user?.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
