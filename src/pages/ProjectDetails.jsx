import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import projects from "../data/projects";

function ProjectDetails() {
  const { id } = useParams();

  const project = projects.find(
    (project) => project.id === Number(id)
  );

  if (!project) {
    return <h1>Project Not Found</h1>;
  }

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-12">

        <h1 className="text-4xl font-bold mb-4">
          {project.title}
        </h1>

        <p className="text-slate-600 mb-6">
          {project.role}
        </p>

        <div className="flex gap-3 mb-6">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg">
            {project.category}
          </span>
        </div>

        <p className="mb-6">
          Team Members: {project.members}
        </p>

        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
          Join Project
        </button>

      </div>
    </>
  );
}

export default ProjectDetails;