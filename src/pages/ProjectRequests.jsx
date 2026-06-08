import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { auth, db } from "../firebase/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  getDoc,
  arrayUnion,
} from "firebase/firestore";

function ProjectRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const user = auth.currentUser;

      if (!user) return;

      const q = query(
        collection(db, "joinRequests"),
        where("projectOwnerEmail", "==", user.email)
      );

      const querySnapshot = await getDocs(q);

      const requestList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRequests(requestList);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (requestId, status, request) => {
    try {
      const requestRef = doc(
        db,
        "joinRequests",
        requestId
      );

      await updateDoc(requestRef, {
        status,
      });

      if (status === "accepted") {
        const projectRef = doc(
          db,
          "projects",
          request.projectId
        );

        const projectSnap = await getDoc(projectRef);

        if (projectSnap.exists()) {
          await updateDoc(projectRef, {
            members: arrayUnion(
              request.requesterEmail
            ),
          });
        }
      }

      fetchRequests();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">
          Project Requests
        </h1>

        {requests.length === 0 ? (
          <p>No requests found.</p>
        ) : (
          requests.map((request) => (
            <div
              key={request.id}
              className="border rounded-xl p-5 mb-4"
            >
              <h2 className="text-xl font-semibold">
                {request.projectTitle}
              </h2>

              <p className="mt-2">
                Applicant: {request.requesterEmail}
              </p>

              <p className="mt-2">
                Status:
                <span className="font-bold ml-2">
                  {request.status}
                </span>
              </p>

              {request.status === "pending" && (
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() =>
                      updateStatus(
                        request.id,
                        "accepted",
                        request
                      )
                    }
                    className="bg-green-600 text-white px-4 py-2 rounded-lg"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        request.id,
                        "rejected",
                        request
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