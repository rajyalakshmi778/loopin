import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { db } from "../firebase/firebase";
import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const docRef = doc(db, "projects", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          setTitle(data.title || "");
          setDescription(data.description || "");
          setSkills(data.skills || "");
          setCategory(data.category || "");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProject();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const projectRef = doc(db, "projects", id);

      await updateDoc(projectRef, {
        title,
        description,
        skills,
        category,
      });

      alert("Project updated successfully!");

      navigate(`/project/${id}`);
    } catch (error) {
      console.log(error);
      alert("Failed to update project");
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">
          Edit Project
        </h1>

        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded-xl mb-4"
        />

        <textarea
          placeholder="Project Description"
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
          className="w-full p-3 border rounded-xl mb-6"
        />

        <button
          onClick={handleUpdate}
          className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700"
        >
          Save Changes
        </button>
      </div>
    </>
  );
}

export default EditProject;