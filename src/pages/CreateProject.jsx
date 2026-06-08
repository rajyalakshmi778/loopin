import { useState } from "react";
import { db, auth } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

function CreateProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [category, setCategory] = useState("");

  const handleCreate = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        alert("Please login first");
        return;
      }

      await addDoc(collection(db, "projects"), {
        title,
        description,
        skills,
        category,
        createdBy: user.uid,
        createdAt: new Date(),
      });

      alert("Project created successfully!");

      setTitle("");
      setDescription("");
      setSkills("");
      setCategory("");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
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

      <button
        onClick={handleCreate}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl"
      >
        Create Project
      </button>
    </div>
  );
}

export default CreateProject;