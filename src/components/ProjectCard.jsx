import { Link } from "react-router-dom";

function ProjectCard({ id, title, role, members }) {
  return (
    <Link to={`/project/${id}`}>
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
          {title}
        </h3>

        <p className="text-gray-500">
          {role}
        </p>

        <div className="flex gap-2 mt-4">
          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-sm">
            React
          </span>

          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-sm">
            Firebase
          </span>
        </div>

        <p className="text-blue-600 mt-4 font-medium">
          {members} Members
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
          Join
        </button>
      </div>
    </Link>
  );
}

export default ProjectCard;