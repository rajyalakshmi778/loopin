import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-700">
      <div className="max-w-5xl mx-auto text-center px-6">

        <h2 className="text-5xl font-bold text-white mb-6">
          Ready to Build Your Next Project?
        </h2>

        <p className="text-blue-100 text-xl mb-10">
          Join Loopin and connect with talented builders.
        </p>

        <Link
          to="/signup"
          className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-semibold"
        >
          Get Started
        </Link>

      </div>
    </section>
  );
}

export default CTA;