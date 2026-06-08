import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { auth, db } from "../firebase/firebase";
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { Link } from "react-router-dom";

function MyProjects() {
  const [ownedProjects, setOwnedProjects] = useState([]);
  const [joinedProjects, setJoinedProjects] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;

    if (!user) return;

    const unsub = onSnapshot(
      collection(db, "projects"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const owned = data.filter(
          (project) => project.createdBy === user.uid
        );

        const joined = data.filter(
          (project) =>
            project.members?.includes(user.email) &&
            project.createdBy !== user.uid
        );

        setOwnedProjects(owned);
        setJoinedProjects(joined);
      }
    );

    return () => unsub();
  }, []);

  const handleDelete = async (projectId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "projects", projectId));

      alert("Project deleted successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to delete project");
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-8">
          My Projects
        </h1>

        {/* OWNED PROJECTS */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            📁 Owned Projects ({ownedProjects.length})
          </h2>

          {ownedProjects.length === 0 ? (
            <p className="text-gray-500">
              No projects created yet.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {ownedProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white border rounded-2xl shadow-md p-6"
                >
                  <h3 className="text-xl font-bold">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 mt-2">
                    {project.description}
                  </p>

                  <p className="mt-3 text-blue-600 text-sm">
                    Members: {project.members?.length || 0}
                  </p>

                  <div className="mt-4 flex gap-3 flex-wrap">
                    <Link
                      to={`/project/${project.id}`}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                    >
                      View
                    </Link>

                    <Link
                      to={`/edit-project/${project.id}`}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        handleDelete(project.id)
                      }
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* JOINED PROJECTS */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            🤝 Joined Projects ({joinedProjects.length})
          </h2>

          {joinedProjects.length === 0 ? (
            <p className="text-gray-500">
              No joined projects yet.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {joinedProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white border rounded-2xl shadow-md p-6"
                >
                  <h3 className="text-xl font-bold">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 mt-2">
                    {project.description}
                  </p>

                  <p className="mt-3 text-green-600 text-sm">
                    Joined Project
                  </p>

                  <div className="mt-4">
                    <Link
                      to={`/project/${project.id}`}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                    >
                      View Project
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MyProjects;