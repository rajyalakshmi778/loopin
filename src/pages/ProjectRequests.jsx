import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { auth, db } from "../firebase/firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc,
  addDoc,
} from "firebase/firestore";

function ProjectRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const snapshot = await getDocs(collection(db, "requests"));

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const filtered = data.filter(
        (r) => r.ownerId === user.uid
      );

      setRequests(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAction = async (
    requestId,
    status,
    request
  ) => {
    try {
      const user = auth.currentUser;

      if (!user) return;

      // Only project owner can act
      if (request.ownerId !== user.uid) {
        alert("Unauthorized action");
        return;
      }

      // Prevent self-action
      if (request.senderId === user.uid) {
        alert("You cannot perform actions on yourself");
        return;
      }

      // Prevent re-processing
      if (request.status !== "pending") {
        alert("Request already processed");
        return;
      }

      const requestRef = doc(db, "requests", requestId);

      await updateDoc(requestRef, {
        status,
      });

      // ACCEPT REQUEST
      if (status === "accepted") {
        const projectRef = doc(
          db,
          "projects",
          request.projectId
        );

        const projectSnap = await getDoc(projectRef);

        if (projectSnap.exists()) {
          const projectData = projectSnap.data();

          const members =
            projectData.members || [];

          const alreadyMember =
            members.includes(
              request.senderEmail
            );

          if (!alreadyMember) {
            await updateDoc(projectRef, {
              members: [
                ...members,
                request.senderEmail,
              ],
            });
          }
        }

        await addDoc(
          collection(db, "notifications"),
          {
            userId: request.senderId,
            title: "Request Accepted",
            message: `You joined ${request.projectTitle}`,
            type: "success",
            read: false,
            createdAt: new Date(),
          }
        );
      }

      // REJECT REQUEST
      if (status === "rejected") {
        await addDoc(
          collection(db, "notifications"),
          {
            userId: request.senderId,
            title: "Request Rejected",
            message: `Your request for ${request.projectTitle} was rejected`,
            type: "error",
            read: false,
            createdAt: new Date(),
          }
        );
      }

      alert(`Request ${status}`);

      // Refresh UI
      loadRequests();

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">
          Project Requests
        </h1>

        {requests.length === 0 ? (
          <p>No requests found</p>
        ) : (
          requests.map((r) => (
            <div
              key={r.id}
              className="p-4 border rounded-xl mb-3 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">
                  {r.senderEmail}
                </p>

                <p className="text-sm text-gray-500">
                  Project: {r.projectTitle}
                </p>

                <p className="text-sm">
                  Status: {r.status}
                </p>
              </div>

              {r.status === "pending" && (
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      handleAction(
                        r.id,
                        "accepted",
                        r
                      )
                    }
                    className="bg-green-600 text-white px-4 py-2 rounded-lg"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() =>
                      handleAction(
                        r.id,
                        "rejected",
                        r
                      )
                    }
                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default ProjectRequests;