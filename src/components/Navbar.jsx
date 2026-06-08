import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/">
          <h1 className="text-4xl font-extrabold text-blue-600 tracking-tight">
            Loopin
          </h1>
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8 text-base font-medium text-slate-700">
          <Link to="/" className="hover:text-blue-600 transition">
            Home
          </Link>

          <Link
            to="/discover"
            className="hover:text-blue-600 transition"
          >
            Discover
          </Link>

          {user && (
            <>
              <Link
                to="/create-project"
                className="hover:text-blue-600 transition"
              >
                Create Project
              </Link>

              <Link
                to="/my-requests"
                className="hover:text-blue-600 transition"
              >
                My Requests
              </Link>

              <Link
                to="/project-requests"
                className="hover:text-blue-600 transition"
              >
                Project Requests
              </Link>
            </>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {user ? (
            <>
              <Link
                to="/profile"
                className="
                  font-medium
                  text-slate-700
                  hover:text-blue-600
                  transition
                "
              >
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="
                  bg-red-500
                  hover:bg-red-600
                  text-white
                  px-5
                  py-3
                  rounded-xl
                  transition
                "
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="
                  font-medium
                  text-slate-700
                  hover:text-blue-600
                  transition
                "
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  px-6
                  py-3
                  rounded-xl
                  font-semibold
                  shadow-md
                  transition
                "
              >
                Get Started
              </Link>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;