function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Create Project",
      description:
        "Share your idea and define the skills you need.",
    },
    {
      number: "02",
      title: "Find Teammates",
      description:
        "Receive join requests from talented builders.",
    },
    {
      number: "03",
      title: "Build Together",
      description:
        "Form teams and launch products faster.",
    },
  ];

  return (
    <section className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold mb-4">
            How Loopin Works
          </h2>

          <p className="text-slate-500 text-xl">
            Three simple steps to build your team.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white rounded-3xl p-8 shadow-md"
            >
              <div className="text-blue-600 text-5xl font-bold mb-6">
                {step.number}
              </div>

              <h3 className="text-2xl font-bold mb-4">
                {step.title}
              </h3>

              <p className="text-slate-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default HowItWorks;