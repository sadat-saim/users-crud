import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const Home = () => {
  const { name } = useContext(AuthContext);
  return <div>{name}</div>;
};

export default Home;
