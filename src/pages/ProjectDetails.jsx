import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { db, auth } from "../firebase/firebase";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = auth.currentUser;

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const docRef = doc(db, "projects", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProject({
            id: docSnap.id,
            ...docSnap.data(),
          });
        }
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    };

    fetchProject();
  }, [id]);

  const handleJoinProject = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        alert("Please login first");
        return;
      }

      const q = query(
        collection(db, "joinRequests"),
        where("projectId", "==", project.id),
        where("requesterId", "==", user.uid)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        alert("You have already requested to join this project");
        return;
      }

      await addDoc(collection(db, "joinRequests"), {
        projectId: project.id,
        projectTitle: project.title,
        requesterId: user.uid,
        requesterEmail: user.email,
        projectOwnerEmail: project.ownerEmail,
        status: "pending",
        createdAt: new Date(),
      });

      alert("Join request sent!");
    } catch (error) {
      console.log(error);
      alert("Failed to send request");
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

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
          {project.description}
        </p>

        <div className="flex gap-3 mb-6">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg">
            {project.category}
          </span>
        </div>

        <p className="mb-4">
          Skills Required: {project.skills}
        </p>

        <p className="mb-6 font-semibold">
          Members: {project.members?.length || 0}
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">
          Team Members
        </h2>

        <div className="space-y-3 mb-6">
          {project.members?.map((member, index) => (
            <div
              key={index}
              className="bg-gray-100 p-3 rounded-lg"
            >
              {member}
            </div>
          ))}
        </div>

        {user?.email === project.ownerEmail && (
          <button
            onClick={() =>
              navigate(`/edit-project/${project.id}`)
            }
            className="bg-yellow-500 text-white px-6 py-3 rounded-xl mr-4"
          >
            Edit Project
          </button>
        )}

        <button
          onClick={handleJoinProject}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Join Project
        </button>
      </div>
    </>
  );
}

export default ProjectDetails;