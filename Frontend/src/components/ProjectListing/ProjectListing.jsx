import React, { useState, useEffect } from "react";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProjectListing.css";
import sortIcon from "/bars-sort.png";
import { useNavigate } from "react-router-dom";

const ProjectListing = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("priority");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 10;

  const navigate = useNavigate();

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get("http://localhost:3000/getAllProjects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      
      setProjects(response.data);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    }
  };

  const updateStatus = async (projectId, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/updateStatus/${projectId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project._id === projectId ? { ...project, status } : project
        )
      );
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const filteredProjects = projects
    .filter((project) =>
      Object.values(project).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return -1;
      if (a[sortColumn] > b[sortColumn]) return 1;
      return 0;
    });

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const backClick = () => {
    navigate("/dashboard")
  }

  return (
    <div className="project-listing">
      <div className="bg-image-container">
        <h3>
          <i onClick={backClick} className="fa-solid fa-chevron-left fa-2xs"></i> Project Listing
        </h3>
        <img className="listing-bg" src="/Header-bg.svg" alt="" />
        <img className="listing-logo" src="/Logo.svg" alt="" />
      </div>
      <div className="listing-box">
        <div className="p-2">
          <div className=" search-sort d-flex justify-content-between align-items-center mb-3">
            <div className="search-box">
              <i class="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              {isMobile ? (
                <div className="sort-box">
                  <select
                    className="sort-select"
                    onChange={(e) => setSortColumn(e.target.value)}
                    style={{
                      backgroundImage: `url(${sortIcon})`,
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <option value="" disabled selected hidden></option>
                    <option value="priority">Priority</option>
                    <option value="projectName">Project Name</option>
                    <option value="status">Status</option>
                    <option value="type">Type</option>
                  </select>
                </div>
              ) : (
                <div className="sort-box">
                  <div>Sort By :</div>
                  <select
                    className="form-select"
                    onChange={(e) => setSortColumn(e.target.value)}
                  >
                    <option value="" disabled hidden>
                      Priority
                    </option>
                    <option value="priority">Priority</option>
                    <option value="projectName">Project Name</option>
                    <option value="status">Status</option>
                    <option value="type">Type</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {isMobile ? (
            <div className="mobile-projects">
              {currentProjects.map((project) => (
                <div key={project._id} className="project-card">
                  <div>
                    <div className="theme-status">
                      <h5>{project.projectTheme}</h5>
                      <h6>{project.status}</h6>
                    </div>
                    <div>
                      {new Date(project.startDate).toLocaleDateString()} to{" "}
                      {new Date(project.endDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <strong>Reason:</strong> <span>{project.reason}</span>
                  </div>
                  <div className="type-category">
                    <div>
                      <strong>Type:</strong> <span>{project.type}</span>
                    </div>
                    <div>
                      <strong>Category:</strong> {project.category}
                    </div>
                  </div>
                  <div className="div-dept">
                    <div>
                      <strong>Division:</strong> <span>{project.division}</span>
                    </div>
                    <div>
                      <strong>Dept.:</strong> <span>{project.department}</span>
                    </div>
                  </div>
                  <div>
                    <strong>Location:</strong> <span>{project.location}</span>
                  </div>
                  <div>
                    <strong>Priority:</strong> <span>{project.priority}</span>
                  </div>

                  <div className="project-actions">
                    <button
                      className="start-btn btn me-2"
                      onClick={() => updateStatus(project._id, "Running")}
                    >
                      Start
                    </button>
                    <button
                      className="btn me-2"
                      onClick={() => updateStatus(project._id, "Closed")}
                    >
                      Close
                    </button>
                    <button
                      className="btn"
                      onClick={() => updateStatus(project._id, "Cancelled")}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <table className="listing-table table">
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Reason</th>
                  <th>Type</th>
                  <th>Division</th>
                  <th>Category</th>
                  <th>Priority</th>
                  <th>Dept.</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentProjects.map((project) => (
                  <tr key={project._id}>
                    <td>
                      <div>
                        <strong>{project.projectTheme}</strong>
                      </div>
                      <div>
                        {new Date(project.startDate).toLocaleDateString()} to{" "}
                        {new Date(project.endDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td>{project.reason}</td>
                    <td>{project.type}</td>
                    <td>{project.division}</td>
                    <td>Quality {project.category}</td>
                    <td>{project.priority}</td>
                    <td>{project.department}</td>
                    <td>{project.location}</td>
                    <td>{project.status}</td>
                    <td>
                      <button
                        className="start-btn btn me-2"
                        onClick={() => updateStatus(project._id, "Running")}
                      >
                        Start
                      </button>
                      <button
                        className="btn me-2"
                        onClick={() => updateStatus(project._id, "Closed")}
                      >
                        Close
                      </button>
                      <button
                        className="btn"
                        onClick={() => updateStatus(project._id, "Cancelled")}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

<div className="pagination d-flex justify-content-center mt-3">
            {/* Backward Button */}
            <button
              className="me-2"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
             <i class="fa-solid fa-chevron-left"></i>
            </button>

            {/* Pagination Numbers */}
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`btn me-2 ${
                  currentPage === index + 1 ? "btn-circle" : ""
                }`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            {/* Forward Button */}
            <button
              className=""
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <i class="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectListing;
