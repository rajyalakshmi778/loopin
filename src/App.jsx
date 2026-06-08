import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import ProjectDetails from "./pages/ProjectDetails";
import Profile from "./pages/Profile";
import CreateProject from "./pages/CreateProject";
import MyRequests from "./pages/MyRequests";
import ProjectRequests from "./pages/ProjectRequests";
import EditProject from "./pages/EditProject";
import Dashboard from "./pages/Dashboard";
import MyProjects from "./pages/MyProjects";
import Notifications from "./pages/Notifications";
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
<Route
  path="/notifications"
  element={<Notifications />}
/>
        <Route
          path="/my-requests"
          element={<MyRequests />}
        />

        <Route
          path="/project-requests"
          element={<ProjectRequests />}
        />

        <Route
          path="/edit-project/:id"
          element={<EditProject />}
        />
        <Route
  path="/dashboard"
  element={<Dashboard />}
/>
<Route path="/my-projects" element={<MyProjects />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;