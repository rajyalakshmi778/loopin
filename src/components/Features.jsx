function Features() {
  const features = [
    {
      title: "Find Teammates",
      description:
        "Connect with developers, designers, analysts and founders who share your vision.",
      icon: "👥",
    },
    {
      title: "Launch Projects",
      description:
        "Create projects, define skills needed and attract talented collaborators.",
      icon: "🚀",
    },
    {
      title: "Build Together",
      description:
        "Manage team members, requests and collaboration from one platform.",
      icon: "🤝",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-slate-900 mb-4">
            Why Choose Loopin?
          </h2>

          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Everything you need to build teams, launch projects,
            and turn ideas into reality.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="
                bg-white
                border
                border-slate-200
                rounded-3xl
                p-8
                shadow-md
                hover:shadow-xl
                hover:-translate-y-2
                transition-all
                duration-300
              "
            >
              <div className="text-5xl mb-6">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold mb-4">
                {feature.title}
              </h3>

              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Features;