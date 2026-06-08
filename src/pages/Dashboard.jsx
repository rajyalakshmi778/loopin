import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";

function Dashboard() {
  const [projectsCreated, setProjectsCreated] = useState(0);
  const [projectsJoined, setProjectsJoined] = useState(0);
  const [teamMembers, setTeamMembers] = useState(0);
  const [pendingRequests, setPendingRequests] = useState(0);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    // =========================
    // REAL-TIME PROJECT STATS
    // =========================
    const unsubProjects = onSnapshot(
      collection(db, "projects"),
      (snapshot) => {
        const projects = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const created = projects.filter(
          (p) => p.createdBy === user.uid
        );

        const joined = projects.filter(
          (p) => p.members?.includes(user.email)
        );

        let totalMembers = 0;

        created.forEach((project) => {
          totalMembers += project.members?.length || 0;
        });

        setProjectsCreated(created.length);
        setProjectsJoined(joined.length);
        setTeamMembers(totalMembers);
      }
    );

    // =========================
    // REAL-TIME REQUEST STATS
    // =========================
    const unsubRequests = onSnapshot(
      collection(db, "requests"),
      (snapshot) => {
        const requests = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const pending = requests.filter(
          (r) =>
            r.ownerId === user.uid &&
            r.status === "pending"
        );

        setPendingRequests(pending.length);
      }
    );

    return () => {
      unsubProjects();
      unsubRequests();
    };
  }, []);

  return (
    <>
      <Navbar />

      <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-12">

          <h1 className="text-5xl font-extrabold mb-3">
            Welcome Back 👋
          </h1>

          <p className="text-slate-500 mb-10">
            Manage your projects, requests and teams.
          </p>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-white p-6 rounded-3xl shadow-md">
              <h3 className="text-slate-500">
                Projects Created
              </h3>
              <p className="text-4xl font-bold mt-2">
                {projectsCreated}
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-md">
              <h3 className="text-slate-500">
                Projects Joined
              </h3>
              <p className="text-4xl font-bold mt-2">
                {projectsJoined}
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-md">
              <h3 className="text-slate-500">
                Pending Requests
              </h3>
              <p className="text-4xl font-bold mt-2">
                {pendingRequests}
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-md">
              <h3 className="text-slate-500">
                Team Members
              </h3>
              <p className="text-4xl font-bold mt-2">
                {teamMembers}
              </p>
            </div>

          </div>

          {/* Quick Actions */}
          <div className="mt-12">

            <h2 className="text-3xl font-bold mb-6">
              Quick Actions
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

              <Link
                to="/create-project"
                className="bg-blue-600 text-white p-6 rounded-3xl shadow-md hover:bg-blue-700 transition"
              >
                <h3 className="text-2xl font-bold mb-2">
                  Create Project
                </h3>
                <p>
                  Start a new project and find teammates.
                </p>
              </Link>

              <Link
                to="/discover"
                className="bg-white p-6 rounded-3xl shadow-md border hover:shadow-lg transition"
              >
                <h3 className="text-2xl font-bold mb-2">
                  Discover Projects
                </h3>
                <p>
                  Explore exciting opportunities.
                </p>
              </Link>

              <Link
                to="/my-requests"
                className="bg-white p-6 rounded-3xl shadow-md border hover:shadow-lg transition"
              >
                <h3 className="text-2xl font-bold mb-2">
                  View Requests
                </h3>
                <p>
                  Manage your collaboration requests.
                </p>
              </Link>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}

export default Dashboard;