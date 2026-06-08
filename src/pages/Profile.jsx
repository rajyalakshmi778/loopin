import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

function Profile() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [college, setCollege] = useState("");

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

      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Complete Profile
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
        className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-6
          py-3
          rounded-xl
          transition
        "
      >
        Save Profile
      </button>
    </div>
  );
}

export default Profile;