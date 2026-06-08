import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { auth, db } from "../firebase/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  updateDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const user = auth.currentUser;

      if (!user) return;

      const q = query(
        collection(db, "notifications"),
        where("userId", "==", user.uid)
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
      }));

      setNotifications(data);

      // Mark notifications as read
      for (const notificationDoc of snapshot.docs) {
        await updateDoc(
          doc(db, "notifications", notificationDoc.id),
          {
            read: true,
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccept = async (notification) => {
    try {
      const projectRef = doc(
        db,
        "projects",
        notification.projectId
      );

      const projectSnap = await getDoc(projectRef);

      if (!projectSnap.exists()) {
        alert("Project not found");
        return;
      }

      const projectData = projectSnap.data();

      // JOIN REQUEST
      if (notification.type === "join_request") {
        const alreadyMember =
          projectData.members?.includes(
            notification.senderEmail
          );

        if (!alreadyMember) {
          await updateDoc(projectRef, {
            members: [
              ...(projectData.members || []),
              notification.senderEmail,
            ],
          });
        }

        await addDoc(collection(db, "notifications"), {
          userId: notification.senderId,
          title: "Request Accepted",
          message: `You joined ${projectData.title}`,
          type: "success",
          read: false,
          createdAt: new Date(),
        });
      }

      // LEAVE REQUEST
      if (notification.type === "leave_request") {
        const updatedMembers =
          projectData.members?.filter(
            (member) =>
              member !== notification.senderEmail
          );

        await updateDoc(projectRef, {
          members: updatedMembers,
        });

        await addDoc(collection(db, "notifications"), {
          userId: notification.senderId,
          title: "Leave Approved",
          message: `You left ${projectData.title}`,
          type: "success",
          read: false,
          createdAt: new Date(),
        });
      }

      // Remove processed notification
      await deleteDoc(
        doc(db, "notifications", notification.id)
      );

      alert("Request accepted");

      loadNotifications();
    } catch (error) {
      console.log(error);
      alert("Failed to accept request");
    }
  };

  const handleReject = async (notification) => {
    try {
      await addDoc(collection(db, "notifications"), {
        userId: notification.senderId,
        title: "Request Rejected",
        message:
          notification.type === "leave_request"
            ? `Your leave request for ${notification.projectTitle} was rejected`
            : `Your request to join ${notification.projectTitle} was rejected`,
        type: "error",
        read: false,
        createdAt: new Date(),
      });

      // Remove processed notification
      await deleteDoc(
        doc(db, "notifications", notification.id)
      );

      alert("Request rejected");

      loadNotifications();
    } catch (error) {
      console.log(error);
      alert("Failed to reject request");
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-8">
          Notifications
        </h1>

        {notifications.length === 0 ? (
          <div className="bg-white border rounded-2xl p-8 text-center">
            <p className="text-gray-500">
              No notifications yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="bg-white border rounded-2xl p-5 shadow-sm"
              >
                <h3 className="font-bold text-lg">
                  {notification.title}
                </h3>

                <p className="text-gray-600 mt-2">
                  {notification.message}
                </p>

                <p className="text-xs text-gray-400 mt-3 mb-4">
                  {notification.type}
                </p>

                {(notification.type === "join_request" ||
                  notification.type === "leave_request") && (
                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        handleAccept(notification)
                      }
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() =>
                        handleReject(notification)
                      }
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Notifications;