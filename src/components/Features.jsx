function Features() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">

      <h2 className="text-4xl font-bold text-center mb-12">
        Why Loopin?
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        <div className="p-6 border rounded-xl">
          <h3 className="text-xl font-semibold mb-3">
            Find Teammates
          </h3>

          <p className="text-gray-500">
            Connect with talented builders.
          </p>
        </div>

        <div className="p-6 border rounded-xl">
          <h3 className="text-xl font-semibold mb-3">
            Share Ideas
          </h3>

          <p className="text-gray-500">
            Showcase your project vision.
          </p>
        </div>

        <div className="p-6 border rounded-xl">
          <h3 className="text-xl font-semibold mb-3">
            Build Together
          </h3>

          <p className="text-gray-500">
            Turn ideas into reality as a team.
          </p>
        </div>

      </div>

    </section>
  );
}

export default Features;