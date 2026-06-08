import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { auth, db } from "../firebase/firebase";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

function MyRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const user = auth.currentUser;

        if (!user) return;

        const q = query(
          collection(db, "joinRequests"),
          where("requesterId", "==", user.uid)
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

    fetchRequests();
  }, []);

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">
          My Requests
        </h1>

        {requests.map((request) => (
          <div
            key={request.id}
            className="border rounded-xl p-4 mb-4"
          >
            <h2 className="text-xl font-semibold">
              {request.projectTitle}
            </h2>

            <p className="mt-2">
              Status:
              <span className="font-bold ml-2">
                {request.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default MyRequests;