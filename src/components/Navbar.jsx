import { IoNotificationsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

function Navbar() {
  const [user, setUser] = useState(null);
  const [notificationCount, setNotificationCount] =
    useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {
        setUser(currentUser);

        if (!currentUser) {
          setNotificationCount(0);
          return;
        }

        try {
          const q = query(
            collection(db, "notifications"),
            where("userId", "==", currentUser.uid)
          );

          const snapshot = await getDocs(q);

          setNotificationCount(snapshot.size);
        } catch (error) {
          console.log(error);
        }
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

          <Link
            to="/"
            className="hover:text-blue-600 transition"
          >
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
                to="/dashboard"
                className="hover:text-blue-600 transition"
              >
                Dashboard
              </Link>

              <Link
                to="/my-projects"
                className="hover:text-blue-600 transition"
              >
                My Projects
              </Link>

              <Link
                to="/create-project"
                className="hover:text-blue-600 transition"
              >
                Create Project
              </Link>
            </>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-5">

          {user ? (
            <>
              <Link
                to="/notifications"
                className="relative text-slate-700 hover:text-blue-600 transition"
              >
                <IoNotificationsOutline size={28} />

                {notificationCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </Link>

              <Link
                to="/profile"
                className="font-medium text-slate-700 hover:text-blue-600 transition"
              >
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="font-medium text-slate-700 hover:text-blue-600 transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition"
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