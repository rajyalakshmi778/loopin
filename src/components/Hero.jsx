function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">

      <div className="grid md:grid-cols-2 gap-12 items-center">

        {/* Left Side */}
        <div>

          <p className="text-blue-600 font-semibold mb-4">
            Collaboration Platform
          </p>

          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Find Teammates.
            <br />
            Build Projects.
          </h1>

          <p className="text-xl text-gray-500 mb-8">
            Connect with developers, designers and startup builders
            to turn ideas into reality.
          </p>

          <div className="flex gap-4">

            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl">
              Get Started
            </button>

            <button className="border px-6 py-3 rounded-xl">
              Explore Projects
            </button>

          </div>

        </div>

        {/* Right Side */}
        <div className="space-y-4">

          <div className="bg-white border rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-lg">
              AI Startup Team
            </h3>

            <p className="text-gray-500 mt-2">
              Looking for React Developer
            </p>

            <p className="text-sm text-blue-600 mt-4">
              4 Members
            </p>
          </div>

          <div className="bg-white border rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-lg">
              Hackathon Project
            </h3>

            <p className="text-gray-500 mt-2">
              Need UI/UX Designer
            </p>

            <p className="text-sm text-blue-600 mt-4">
              3 Members
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;