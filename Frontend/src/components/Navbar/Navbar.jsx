import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [activeIcon, setActiveIcon] = useState(null);
  const navigate = useNavigate();

  const images = {
    dashboard: {
      default: '/Dashboard.svg',
      active: '/Dashboard-active.svg',
      path: '/dashboard',
    },
    projectList: {
      default: '/Project-list.svg',
      active: '/Project-list-active.svg',
      path: '/project-list',
    },
    createProject: {
      default: '/create-project.svg',
      active: '/create-project-active.svg',
      path: '/addProject',
    },
    logout: {
      default: '/Logout.svg',
      active: '/Logout-active.svg',
      path: '/', // Assuming logout redirects to the login page
    },
  };

  const handleIconClick = (icon) => {
    setActiveIcon(icon);
    navigate(images[icon].path);
  };

  return (
    <div className="vertical-navbar">
      <div className="nav-center">
        <img
          src={activeIcon === 'dashboard' ? images.dashboard.active : images.dashboard.default}
          alt="Dashboard"
          className="nav-icon"
          onClick={() => handleIconClick('dashboard')}
        />
        <img
          src={activeIcon === 'projectList' ? images.projectList.active : images.projectList.default}
          alt="Project List"
          className="nav-icon"
          onClick={() => handleIconClick('projectList')}
        />
        <img
          src={activeIcon === 'createProject' ? images.createProject.active : images.createProject.default}
          alt="Create Project"
          className="nav-icon"
          onClick={() => handleIconClick('createProject')}
        />
      </div>
      <div className="nav-bottom">
        <img
          src={activeIcon === 'logout' ? images.logout.active : images.logout.default}
          alt="Logout"
          id='logout'
          className="nav-icon"
          onClick={() => handleIconClick('logout')}
        />
      </div>
    </div>
  );
};

export default Navbar;
