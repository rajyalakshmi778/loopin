import Navbar from "../components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

function CreateProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [category, setCategory] = useState("");
  const [githubUrl, setGithubUrl] = useState("");

  const navigate = useNavigate();

  const handleCreate = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        alert("Please login first");
        return;
      }

      if (
        !title ||
        !description ||
        !skills ||
        !category
      ) {
        alert("Please fill all required fields");
        return;
      }

      await addDoc(collection(db, "projects"), {
        title,
        description,
        skills,
        category,
        githubUrl,
        createdBy: user.uid,
        ownerEmail: user.email,
        members: [user.email],
        createdAt: new Date(),
      });

      alert("Project created successfully");

      navigate("/discover");
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">
          Create Project
        </h1>

        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded-xl mb-4"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border rounded-xl mb-4"
          rows="5"
        />

        <input
          type="text"
          placeholder="Skills Required"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="w-full p-3 border rounded-xl mb-4"
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 border rounded-xl mb-4"
        />

        <input
          type="url"
          placeholder="GitHub Repository URL (Optional)"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
          className="w-full p-3 border rounded-xl mb-6"
        />

        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Create Project
        </button>
      </div>
    </>
  );
}

export default CreateProject;