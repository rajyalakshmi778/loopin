
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

  // =========================
  // JOIN REQUEST
  // =========================
  const handleJoinProject = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        alert("Please login first");
        return;
      }

      // Owner cannot join own project
      if (project.createdBy === user.uid) {
        alert("You are the project owner");
        return;
      }

      // Already a member
      if (project.members?.includes(user.email)) {
        alert("You are already a member");
        return;
      }

      const q = query(
        collection(db, "requests"),
        where("projectId", "==", project.id),
        where("senderId", "==", user.uid),
        where("type", "==", "join"),
        where("status", "==", "pending")
      );

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        alert("Join request already sent");
        return;
      }

      await addDoc(collection(db, "requests"), {
  projectId: project.id,
  projectTitle: project.title,
  senderId: user.uid,
  senderEmail: user.email,
  ownerId: project.createdBy,
  type: "join",
  status: "pending",
  createdAt: new Date(),
});

await addDoc(collection(db, "notifications"), {
  userId: project.createdBy,
  title: "New Join Request",
  message: `${user.email} wants to join ${project.title}`,
  type: "join_request",
  projectId: project.id,
  senderId: user.uid,
  senderEmail: user.email,
  read: false,
  createdAt: new Date(),
});

alert("Join request sent!");
    } catch (error) {
      console.log(error);
      alert("Failed to send request");
    }
  };

  // =========================
  // LEAVE REQUEST
  // =========================
  const handleLeaveRequest = async () => {
  try {
    const user = auth.currentUser;

    if (!user) return;

    if (project.createdBy === user.uid) {
      alert("Project owner cannot leave");
      return;
    }

    const q = query(
      collection(db, "requests"),
      where("projectId", "==", project.id),
      where("senderId", "==", user.uid),
      where("type", "==", "leave"),
      where("status", "==", "pending")
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      alert("Leave request already sent");
      return;
    }

    await addDoc(collection(db, "requests"), {
      projectId: project.id,
      projectTitle: project.title,
      senderId: user.uid,
      senderEmail: user.email,
      ownerId: project.createdBy,
      type: "leave",
      status: "pending",
      createdAt: new Date(),
    });

    await addDoc(collection(db, "notifications"), {
      userId: project.createdBy,
      title: "Leave Request",
      message: `${user.email} wants to leave ${project.title}`,
      type: "leave_request",
      projectId: project.id,
      senderId: user.uid,
      senderEmail: user.email,
      read: false,
      createdAt: new Date(),
    });

    alert("Leave request sent!");
  } catch (error) {
    console.log(error);
    alert("Failed to send leave request");
  }
};

  if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-2xl font-bold">
        Loading Project...
      </h1>
    </div>
  );
}

if (!project) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">
        Project Not Found
      </h1>

      <button
        onClick={() => navigate("/discover")}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl"
      >
        Back to Discover
      </button>
    </div>
  );
}
  const user = auth.currentUser;

  const isOwner =
    user?.uid === project.createdBy;

  const isMember =
    project.members?.includes(user?.email);

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

        <div className="bg-white border rounded-2xl p-6 shadow-sm mb-6">

  <div className="mb-4">
    <p className="text-gray-500 text-sm">
      Skills Required
    </p>

    <p className="font-semibold text-lg">
      {project.skills}
    </p>
  </div>

  <div className="mb-4">
    <p className="text-gray-500 text-sm">
      Team Size
    </p>

    <p className="font-semibold text-lg">
      {project.members?.length || 0} Members
    </p>
  </div>

  {project.githubUrl && (
    <div>
      <p className="text-gray-500 text-sm mb-1">
        GitHub Repository
      </p>

      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 font-semibold hover:underline"
      >
        Open Repository →
      </a>
    </div>
  )}

</div>

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

        {/* OWNER ACTIONS */}
        {isOwner && (
          <button
            onClick={() =>
              navigate(`/edit-project/${project.id}`)
            }
            className="bg-yellow-500 text-white px-6 py-3 rounded-xl mr-4"
          >
            Edit Project
          </button>
        )}

        {/* MEMBER ACTIONS */}
        {!isOwner && (
          <>
            {!isMember ? (
              <button
                onClick={handleJoinProject}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
              >
                Join Project
              </button>
            ) : (
              <button
                onClick={handleLeaveRequest}
                className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition"
              >
                Request Leave
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default ProjectDetails;
