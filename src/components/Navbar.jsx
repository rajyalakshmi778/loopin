import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <Link to="/">
          <h1 className="text-2xl font-bold text-blue-600">
            Loopin
          </h1>
        </Link>

        <div className="flex gap-8 text-gray-600">
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

          <Link
            to="/create-project"
            className="hover:text-blue-600 transition"
          >
            Create Project
          </Link>

          <Link
            to="/profile"
            className="hover:text-blue-600 transition"
          >
            Profile
          </Link>
        </div>

        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-4 py-2 hover:text-blue-600 transition"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;