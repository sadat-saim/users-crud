import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase.init";
import { useQuery } from "@tanstack/react-query";
import Card from "../../components/Card/Card";
import Loading from "../../components/Loading/Loading";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthProvider";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const usersCollection = collection(db, "users");
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const data = await getDocs(usersCollection);
      const docs = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      return docs;
    },
  });
  console.log(users);

  const handleAddUser = async (data) => {
    console.log(data);
    const { name, email, image } = data;
    try {
      await addDoc(usersCollection, {
        displayName: name,
        email,
        photoURL: image,
        emailVerified: false,
      });
      toast.success("Added user successfully");
      refetch();
    } catch (err) {
      toast.error(`${err.message}`);
    }
  };

  if (isLoading) return <Loading></Loading>;

  return (
    <div>
      <div className="flex justify-between my-3">
        <h1 className="font-bold text-3xl mt-3 mb-6">All Users</h1>
        {user && (
          <label htmlFor="my-modal-6" className="btn">
            Add User
          </label>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {users?.map((user) => (
          <Card key={user.id} user={user} refetch={refetch}></Card>
        ))}
      </div>

      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-xl text-center">Add A User</h3>
          <div className="py-4">
            <form
              className="text-center"
              onSubmit={handleSubmit(handleAddUser)}
            >
              <input
                type="text"
                placeholder="name"
                className="input input-bordered w-full max-w-xs"
                {...register("name", { required: true })}
              />
              <input
                type="text"
                placeholder="email"
                className="input input-bordered w-full max-w-xs my-3"
                {...register("email", { required: true })}
              />
              <input
                type="text"
                placeholder="photo url..."
                className="input input-bordered w-full max-w-xs"
                {...register("image", { required: true })}
              />
              <div className="modal-action">
                <button className="mx-auto">
                  <label htmlFor="my-modal-6" className="btn text-center">
                    Add User
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

export default Home;
