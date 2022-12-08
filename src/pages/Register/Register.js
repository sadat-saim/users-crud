import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const { signup, updateUserProfile, signout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (data) => {
    console.log(data);
    const { name, email, password, image } = data;

    signup(email, password)
      .then((result) => {
        console.log(result.user);
        let payload = new FormData();
        payload.append("image", image[0]);

        axios
          .post(
            "https://api.imgbb.com/1/upload?key=e0528bb0aa334f81aacf4da058c21839",
            payload
          )
          .then((response) => {
            console.log("response URL", response.data.data.image.url);
            const obj = {
              displayName: name,
              photoURL: response.data.data.image.url,
            };
            updateUserProfile(obj)
              .then(() => {
                signout()
                  .then(() => {
                    toast.success("Account Created Successfully");
                    toast("Please log in now");
                    navigate("/login");
                  })
                  .catch((err) => toast.error(`${err.message}`));
              })
              .catch((err) => toast.error(`${err.message}`));
          })
          .catch((err) => {
            toast.error(`${err.message}`);
          });
      })
      .catch((err) => toast.error(`${err.message}`));
  };

  return (
    <div>
      <div className="hero h-[70vh]">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <form
            onSubmit={handleSubmit(handleRegister)}
            className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
          >
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="enter your name"
                  className="input input-bordered"
                  {...register("name", { required: true })}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Image</span>
                </label>
                <input
                  type="file"
                  alt="upload an image"
                  className="input input-bordered pt-2"
                  {...register("image", { required: true })}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  {...register("email", { required: true })}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  {...register("password", {
                    required: true,
                  })}
                />
              </div>
              <label className="label">
                Already have an account?
                <Link
                  to="/login"
                  className="label-text-alt text-base mr-auto ml-1 link link-hover"
                >
                  Login
                </Link>
              </label>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
