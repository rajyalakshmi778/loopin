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
          min-h-[360px]
          flex
          flex-col
          justify-between
        "
      >
        <div>
          <div className="flex items-start justify-between gap-3 mb-4">

            <h3
              className="
                text-xl
                font-bold
                text-slate-900
                line-clamp-2
                break-words
              "
            >
              {project.title}
            </h3>

            <span
              className="
                bg-gradient-to-r
                from-blue-500
                to-indigo-600
                text-white
                px-3
                py-1
                rounded-full
                text-xs
                font-semibold
                shrink-0
              "
            >
              {project.category}
            </span>

          </div>

          <p
            className="
              text-gray-600
              mb-5
              line-clamp-4
              break-words
            "
          >
            {project.description}
          </p>

          <div className="mb-5">
            <p className="text-sm font-semibold text-slate-600 mb-2">
              Skills Required
            </p>

            <p
              className="
                text-blue-600
                font-medium
                line-clamp-2
                break-words
              "
            >
              {project.skills}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <p className="font-semibold text-slate-700">
            👥 {project.members?.length || 1} Members
          </p>

          <span
            className="
              bg-blue-600
              text-white
              px-4
              py-2
              rounded-xl
            "
          >
            View Project
          </span>
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;