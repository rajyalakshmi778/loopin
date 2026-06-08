import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-6 py-28">

        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Left Side */}
          <div>
            <p className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              🚀 Collaboration Platform
            </p>

            <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-6">
              Build Startup
              <br />
              Teams Faster
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-xl">
              Connect with developers, designers, analysts and founders.
              Turn ideas into products with the right team.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/signup"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl shadow-lg transition"
              >
                Get Started
              </Link>

              <Link
                to="/discover"
                className="bg-white border border-gray-300 px-8 py-4 rounded-2xl hover:shadow-md transition"
              >
                Explore Projects
              </Link>
            </div>

            <div className="flex gap-10 mt-12">
              <div>
                <h3 className="text-3xl font-bold text-gray-900">
                  500+
                </h3>
                <p className="text-gray-500">
                  Projects
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-900">
                  1K+
                </h3>
                <p className="text-gray-500">
                  Builders
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-900">
                  250+
                </h3>
                <p className="text-gray-500">
                  Teams
                </p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-5">

            <div className="bg-white p-6 rounded-3xl shadow-lg border">
              <h3 className="text-xl font-bold">
                AI Startup Platform
              </h3>

              <p className="text-gray-500 mt-2">
                Looking for React & AI Engineers
              </p>

              <div className="mt-4 flex justify-between">
                <span className="text-blue-600 font-semibold">
                  4 Members
                </span>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  Active
                </span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-lg border ml-10">
              <h3 className="text-xl font-bold">
                Hackathon Team
              </h3>

              <p className="text-gray-500 mt-2">
                Need UI/UX Designer
              </p>

              <div className="mt-4 flex justify-between">
                <span className="text-blue-600 font-semibold">
                  3 Members
                </span>

                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                  Recruiting
                </span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-lg border">
              <h3 className="text-xl font-bold">
                SaaS Analytics Tool
              </h3>

              <p className="text-gray-500 mt-2">
                Looking for Data Analysts
              </p>

              <div className="mt-4 flex justify-between">
                <span className="text-blue-600 font-semibold">
                  5 Members
                </span>

                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                  Growing
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;