import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Login from './components/LoginPage/Login';
import Dashboard from './components/Dashboard/Dashboard';
import AddProject from "./components/AddProjectsPage.jsx/AddProject";
import Layout from "./Layout";
import ProjectListing from "./components/ProjectListing/ProjectListing";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
                <Route path="/addProject" element={<Layout><AddProject /></Layout>} />
                <Route path="/project-list" element={<Layout><ProjectListing /></Layout>} />
            </Routes>
        </Router>
    );
}

export default App;
