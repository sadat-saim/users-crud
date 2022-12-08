import React, { useState } from "react";
import { collection } from "firebase/firestore";
import { db } from "../../firebase/firebase.init";

const Home = () => {
  const [users, setUsers] = useState();
  const usersCollection = collection(db, "users");
  return <div></div>;
};

export default Home;
