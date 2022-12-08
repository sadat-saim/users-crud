import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

const Header = () => {
  const { user, signout } = useContext(AuthContext);
  console.log(user);
  const handleSignout = () => {
    signout()
      .then(() => {
        toast.success("Signed out successfully");
      })
      .catch((err) => toast.error(`${err.message}`));
  };

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link to="/" className="font-semibold cursor-pointer text-xl">
            UsersDB
          </Link>
        </div>
        <div className="flex-none gap-2">
          <Link to="/assignment" className="btn btn-ghost list-none">
            Assginment2
          </Link>
          {!user && (
            <>
              <Link to="/register" className="btn btn-ghost list-none">
                Register
              </Link>
              <Link to="/login" className="btn btn-ghost list-none">
                Login
              </Link>
            </>
          )}

          {user && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={user?.photoURL} alt="user" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link className="justify-between uppercase font-semibold">
                    {user?.displayName}
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li onClick={handleSignout}>
                  <Link>Logout</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
