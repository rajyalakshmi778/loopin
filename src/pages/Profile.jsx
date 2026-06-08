
import { useState, useEffect } from "react";
import { auth, db } from "../firebase/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

function Profile() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [college, setCollege] = useState("");

  const [profileExists, setProfileExists] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const user = auth.currentUser;

      if (!user) return;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        setName(data.name || "");
        setBio(data.bio || "");
        setSkills(data.skills || "");
        setCollege(data.college || "");

        setProfileExists(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveProfile = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        alert("Please login first");
        return;
      }

      await setDoc(doc(db, "users", user.uid), {
        name,
        bio,
        skills,
        college,
        email: user.email,
        uid: user.uid,
      });

      setProfileExists(true);
      setEditing(false);

      alert("Profile updated successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  // PROFILE VIEW
  if (profileExists && !editing) {
    return (
      <div className="max-w-2xl mx-auto p-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h1 className="text-3xl font-bold mb-6">
            My Profile
          </h1>

          <div className="space-y-4">

            <div>
              <p className="text-gray-500">Name</p>
              <p className="font-semibold">{name}</p>
            </div>

            <div>
              <p className="text-gray-500">Bio</p>
              <p>{bio}</p>
            </div>

            <div>
              <p className="text-gray-500">Skills</p>
              <p>{skills}</p>
            </div>

            <div>
              <p className="text-gray-500">College</p>
              <p>{college}</p>
            </div>

          </div>

          <button
            onClick={() => setEditing(true)}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl"
          >
            Edit Profile
          </button>

        </div>
      </div>
    );
  }

  // EDIT / CREATE FORM
  return (
    <div className="max-w-xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-6">
        {profileExists ? "Edit Profile" : "Complete Profile"}
      </h1>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 border rounded-xl mb-4"
      />

      <textarea
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        className="w-full p-3 border rounded-xl mb-4"
        rows="4"
      />

      <input
        type="text"
        placeholder="Skills"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        className="w-full p-3 border rounded-xl mb-4"
      />

      <input
        type="text"
        placeholder="College"
        value={college}
        onChange={(e) => setCollege(e.target.value)}
        className="w-full p-3 border rounded-xl mb-6"
      />

      <button
        onClick={saveProfile}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
      >
        Save Profile
      </button>

    </div>
  );
}

export default Profile;
