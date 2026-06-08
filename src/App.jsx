import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import ProjectDetails from "./pages/ProjectDetails";
import Profile from "./pages/Profile";
import CreateProject from "./pages/CreateProject";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />
<Route path="/profile" element={<Profile />} />
<Route
  path="/create-project"
  element={<CreateProject />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;