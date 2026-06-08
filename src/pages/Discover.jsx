import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import { db, auth } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { FiSearch } from "react-icons/fi";

function Discover() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "projects")
        );

        const projectList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProjects(projectList);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProjects();
  }, []);

  const user = auth.currentUser;

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      project.category === selectedCategory;

    const notMyProject =
      project.createdBy !== user?.uid;

    const notJoined =
      !project.members?.includes(user?.email);

    return (
      matchesSearch &&
      matchesCategory &&
      notMyProject &&
      notJoined
    );
  });

  return (
    <>
      <Navbar />

      <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-12">

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-6xl font-extrabold text-slate-900 mb-4">
              Discover Projects
            </h1>

            <p className="text-xl text-slate-600 max-w-2xl">
              Find exciting projects, connect with talented builders,
              and grow your network.
            </p>
          </div>

          {/* Projects Banner */}
          <div className="bg-white rounded-3xl shadow-md p-8 mb-8">
            <h2 className="text-3xl font-bold">
              {filteredProjects.length} Projects Available
            </h2>

            <p className="text-slate-500 mt-2">
              Explore projects you have not joined yet and discover
              new opportunities.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="bg-white rounded-3xl shadow-md p-6 mb-10">

            <div className="relative mb-6">
              <FiSearch
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                  text-lg
                "
              />

              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                  w-full
                  p-4
                  pl-12
                  border
                  border-slate-300
                  rounded-2xl
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              />
            </div>

            <div className="flex flex-wrap gap-3">
              {["All", "AI", "Web", "Startup"].map(
                (category) => (
                  <button
                    key={category}
                    onClick={() =>
                      setSelectedCategory(category)
                    }
                    className={`px-5 py-2 rounded-xl transition ${
                      selectedCategory === category
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 hover:bg-slate-200"
                    }`}
                  >
                    {category}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Section Title */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">
              🌎 Explore New Projects
            </h2>

            <span className="text-slate-500">
              {filteredProjects.length} Projects Found
            </span>
          </div>

          {/* Projects Grid */}
          {filteredProjects.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-md p-12 text-center">
              <h3 className="text-2xl font-bold mb-3">
                No Projects Found
              </h3>

              <p className="text-slate-500">
                You already own or joined all available projects,
                or try changing your search/category.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                />
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default Discover;