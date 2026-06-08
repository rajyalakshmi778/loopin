import { Link } from "react-router-dom";

function ProjectCard({ project }) {
  return (
    <Link to={`/project/${project.id}`}>
      <div
        className="
          bg-white
          rounded-3xl
          border
          border-slate-200
          p-6
          shadow-md
          hover:shadow-2xl
          hover:-translate-y-2
          transition-all
          duration-300
          h-[340px]
          flex
          flex-col
          justify-between
        "
      >
        {/* Header */}
        <div>
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-2xl font-bold text-slate-900">
              {project.title}
            </h3>

            <span
              className="
                bg-gradient-to-r
                from-blue-500
                to-indigo-600
                text-white
                px-4
                py-2
                rounded-full
                text-xs
                font-semibold
                shadow-sm
              "
            >
              {project.category}
            </span>
          </div>

          <p className="text-gray-600 mb-5 line-clamp-3">
            {project.description}
          </p>

          <div className="mb-5">
            <p className="text-sm font-semibold text-slate-600 mb-2">
              🛠 Skills
            </p>

            <p className="text-blue-600 font-medium">
              {project.skills}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t pt-4">
          <div>
            <p className="font-semibold text-slate-700">
              👥 {project.members?.length || 1} Members
            </p>
          </div>

          <button
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-5
              py-2
              rounded-xl
              transition
            "
          >
            View Project
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;