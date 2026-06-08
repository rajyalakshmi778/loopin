import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import Navbar from "../components/Navbar";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-md mx-auto px-6 py-12">
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <h1 className="text-4xl font-bold mb-8">
            Sign Up
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-xl"
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-xl"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-xl"
              required
            />

            <button
              type="submit"
              className="
                w-full
                bg-blue-600
                hover:bg-blue-700
                text-white
                py-3
                rounded-xl
                transition
              "
            >
              Create Account
            </button>

            <p className="text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;