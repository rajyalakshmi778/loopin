import { Link } from "react-router-dom";

function ProjectCard({ project }) {
  return (
    <Link to={`/project/${project.id}`}>
      <div
        className="
          bg-white
          border
          border-slate-200
          rounded-2xl
          p-6
          shadow-sm
          hover:shadow-xl
          hover:-translate-y-1
          transition
          duration-300
          cursor-pointer
        "
      >
        <h3 className="text-xl font-bold mb-2">
          {project.title}
        </h3>

        <p className="text-gray-600 mb-3">
          {project.description}
        </p>

        <span
          className="
            inline-block
            bg-blue-100
            text-blue-700
            px-3
            py-1
            rounded-lg
            text-sm
            mb-3
          "
        >
          {project.category}
        </span>

        <p className="text-sm text-gray-500">
          Skills Required:
        </p>

        <p className="text-blue-600 font-medium">
          {project.skills}
        </p>

        <button
          className="
            mt-4
            bg-blue-600
            text-white
            px-4
            py-2
            rounded-lg
            hover:bg-blue-700
            transition
          "
        >
          View Project
        </button>
      </div>
    </Link>
  );
}

export default ProjectCard;