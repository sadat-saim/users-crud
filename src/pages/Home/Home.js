import React, { useState } from "react";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase.init";
import { useQuery } from "@tanstack/react-query";
import Card from "../../components/Card/Card";
import Loading from "../../components/Loading/Loading";

const Home = () => {
  const usersCollection = collection(db, "users");
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const data = await getDocs(usersCollection);
      const docs = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      return docs;
    },
  });
  console.log(users);

  if (isLoading) return <Loading></Loading>;

  return (
    <div>
      <h1 className="text-center font-bold text-3xl mt-3 mb-6">All Users</h1>
      <div className="grid grid-cols-3 gap-3">
        {users?.map((user) => (
          <Card key={user.id} user={user}></Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
