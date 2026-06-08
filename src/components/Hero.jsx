
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

function Hero() {
  const [projects, setProjects] = useState([]);
  const [builders, setBuilders] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const snapshot = await getDocs(
          collection(db, "projects")
        );

        const projectData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProjects(projectData);

        const membersSet = new Set();

        projectData.forEach((project) => {
          project.members?.forEach((member) => {
            membersSet.add(member);
          });
        });

        setBuilders(membersSet.size);

      } catch (error) {
        console.log(error);
      }
    };

    loadData();
  }, []);

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-6 py-28">

        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
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

            {/* LIVE STATS */}
            <div className="flex gap-10 mt-12">

              <div>
                <h3 className="text-3xl font-bold text-gray-900">
                  {projects.length}
                </h3>

                <p className="text-gray-500">
                  Projects
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-900">
                  {builders}
                </h3>

                <p className="text-gray-500">
                  Builders
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-900">
                  {projects.length}
                </h3>

                <p className="text-gray-500">
                  Teams
                </p>
              </div>

            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-5">

            {projects.length === 0 ? (

              <div className="bg-white p-8 rounded-3xl shadow-lg border text-center">
                <h3 className="text-xl font-bold mb-2">
                  No Projects Yet
                </h3>

                <p className="text-gray-500">
                  Create the first project on Loopin.
                </p>
              </div>

            ) : (

              projects.slice(0, 3).map((project) => (
                <div
                  key={project.id}
                  className="bg-white p-6 rounded-3xl shadow-lg border"
                >
                  <h3 className="text-xl font-bold">
                    {project.title}
                  </h3>

                  <p className="text-gray-500 mt-2">
                    {project.description}
                  </p>

                  <div className="mt-4 flex justify-between">

                    <span className="text-blue-600 font-semibold">
                      {project.members?.length || 0} Members
                    </span>

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      Active
                    </span>

                  </div>
                </div>
              ))

            )}

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;
