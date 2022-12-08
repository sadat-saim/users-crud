import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import { Toaster } from "react-hot-toast";

const Main = () => {
  return (
    <div className="container mx-auto">
      <Header></Header>
      <Outlet></Outlet>
      <Toaster></Toaster>
    </div>
  );
};

export default Main;
