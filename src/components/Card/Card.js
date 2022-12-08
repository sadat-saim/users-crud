import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthProvider";
import { db } from "../../firebase/firebase.init";

const Card = ({ user, refetch }) => {
  const { displayName, email, photoURL, id } = user;
  const { register, handleSubmit } = useForm();
  const { user: loggedInUser } = useContext(AuthContext);

  const handleUpdate = async (data) => {
    const userCollection = doc(db, "users", id);
    const { email, name, image } = data;
    const updatedData = {
      email,
      displayName: name,
      photoURL: image,
    };

    console.log(data);
    try {
      await updateDoc(userCollection, updatedData);
      toast.success("Data updated successfully");
      refetch();
    } catch (err) {
      toast.error(`${err.message}`);
    }
  };

  const handleDelete = async () => {
    const userCollection = doc(db, "users", id);

    try {
      await deleteDoc(userCollection);
      toast.success("Data updated successfully");
      refetch();
    } catch (err) {
      toast.error(`${err.message}`);
    }
  };

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
            <button
              onClick={handleDelete}
              className="btn btn-sm btn-circle btn-outline absolute top-3 left-16"
            >
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

            <label
              htmlFor={`my-modal-${id}`}
              className="btn btn-sm btn-circle btn-outline absolute top-3 left-6"
            >
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
            </label>
          </>
        )}
      </div>
      <input type="checkbox" id={`my-modal-${id}`} className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-xl text-center">Add A User</h3>
          <div className="py-4">
            <form className="text-center" onSubmit={handleSubmit(handleUpdate)}>
              <input
                type="text"
                placeholder="name"
                className="input input-bordered w-full max-w-xs"
                defaultValue={displayName}
                {...register("name", { required: true })}
              />
              <input
                type="text"
                placeholder="email"
                defaultValue={email}
                className="input input-bordered w-full max-w-xs my-3"
                {...register("email", { required: true })}
              />
              <input
                type="text"
                placeholder="photo url..."
                defaultValue={photoURL}
                className="input input-bordered w-full max-w-xs"
                {...register("image", { required: true })}
              />
              <div className="modal-action">
                <button className="mx-auto">
                  <label htmlFor={`my-modal-${id}`} className="btn text-center">
                    Update User
                  </label>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
