import { useState } from "react";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import projects from "../data/projects";

function Discover() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      project.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-3">
          Discover Projects
        </h1>

        <p className="text-slate-500 mb-8">
          Find exciting projects and connect with builders.
        </p>

        <input
          type="text"
          placeholder="🔍 Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            md:w-96
            p-3
            border
            border-slate-300
            rounded-xl
            mb-8
          "
        />

        <div className="flex gap-3 mb-8 flex-wrap">
          <button
            onClick={() => setSelectedCategory("All")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            All
          </button>

          <button
            onClick={() => setSelectedCategory("AI")}
            className="border px-4 py-2 rounded-lg"
          >
            AI
          </button>

          <button
            onClick={() => setSelectedCategory("Web")}
            className="border px-4 py-2 rounded-lg"
          >
            Web
          </button>

          <button
            onClick={() => setSelectedCategory("Startup")}
            className="border px-4 py-2 rounded-lg"
          >
            Startup
          </button>
          <p className="mb-4 font-semibold">
  Selected Category: {selectedCategory}
</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
  key={project.id}
  id={project.id}
  title={project.title}
  role={project.role}
  members={project.members}
/>
          ))}
        </div>
      </div>
    </>
  );
}

export default Discover;