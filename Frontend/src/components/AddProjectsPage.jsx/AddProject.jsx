import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMediaQuery } from "react-responsive";
import "./AddProject.css";
import { useEffect } from "react";
import "./mediaQueries.css"

const AddProject = () => {
  const [projectTheme, setProjectTheme] = useState("");
  const [reason, setReason] = useState("");
  const [type, setType] = useState("");
  const [division, setDivision] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [status] = useState("Registered");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isProjectThemeInvalid, setIsProjectThemeInvalid] = useState(false);

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 1000); // Message disappears after 3 seconds
      return () => clearTimeout(timer); // Clean up the timer
    }
  }, [successMessage]);

  const handleEndDateChange = (date) => {
    setEndDate(date);
    if (date < startDate) {
      setError("End date cannot be before the start date");
    } else {
      setError("");
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate projectTheme input
    if (!projectTheme) {
      setIsProjectThemeInvalid(true);
      setError("Project Theme is required");
      return;
    } else {
      setIsProjectThemeInvalid(false);
    }

    if (endDate < startDate) {
      setError("End date cannot be before the start date");
      return;
    }

    if (
      !projectTheme ||
      !reason ||
      !type ||
      !division ||
      !category ||
      !priority ||
      !department ||
      !location ||
      !startDate ||
      !endDate
    ) {
      setError("All fields are required");
      return;
    }

    if (endDate < startDate) {
      setError("End date cannot be before start date");
      return;
    }

    try {
      const token = localStorage.getItem("token")
      await axios.post("http://localhost:3000/createProject", {
        projectTheme,
        reason,
        type,
        division,
        category,
        priority,
        department,
        location,
        status,
        startDate,
        endDate,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Reset form after submission
      setProjectTheme("");
      setReason("");
      setType("");
      setDivision("");
      setCategory("");
      setPriority("");
      setDepartment("");
      setLocation("");
      setStartDate(new Date());
      setEndDate(new Date());
      setError("");
      setSuccessMessage("Project Saved Successfully");
    } catch (error) {
      setError("Failed to insert project");
      setSuccessMessage("");
    }
  };

  return (
    <div className="insert-project-container ">
      <img src="/Header-bg.svg" alt="" />
      <img className="dashboard-logo" src="/Logo.svg" alt="" />
      <h3>
        <i class="fa-solid fa-chevron-left fa-2xs"></i> Create Project
      </h3>
      <form className="form" onSubmit={handleSubmit}>
      {successMessage && <div className="success-message">{successMessage}</div>} 
        <div className="form-group button">
        <input
            type="text"
            id="project-theme"
            className={`theme ${isProjectThemeInvalid ? "invalid-input" : ""}`}
            value={projectTheme}
            placeholder="Enter Project Theme"
            onChange={(e) => setProjectTheme(e.target.value)}
          />
          <button type="submit" className="btn btn-primary save-button">
            Save Project
          </button>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Reason</label>
            <select
              className="form-control form-select"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              <option className="form-select" value="" disabled hidden>
                For Business
              </option>
              <option value="For Business">For Business</option>
              <option value="Dealership">For Dealership</option>
              <option value="Transport"> ForTransport</option>
            </select>
          </div>
          <div className="form-group">
            <label>Type</label>
            <select
              className="form-control form-select"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="" disabled hidden>
              Internal
              </option>
              <option value="Internal">Internal</option>
              <option value="External">External</option>
              <option value="Vendor">Vendor</option>
            </select>
          </div>

          <div className="form-group">
            <label>Division</label>
            <select
              className="form-control form-select"
              value={division}
              onChange={(e) => setDivision(e.target.value)}
            >
              <option value="" disabled hidden>
              Compressor
              </option>
              <option value="Compressor">Compressor</option>
              <option value="Filters">Filters</option>
              <option value="Pumps">Pumps</option>
              <option value="Glass">Glass</option>
              <option value="Water Heater">Water Heater</option>
            </select>
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              className="form-control form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled hidden>
              Quality A
              </option>
              <option value="A">Quality A</option>
              <option value="B">Quality B</option>
              <option value="C">Quality C</option>
              <option value="D">Quality D</option>
            </select>
          </div>

          <div className="form-group">
            <label>Priority</label>
            <select
              className="form-control form-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="" disabled hidden>
              High
              </option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="form-group">
            <label>Department</label>
            <select
              className="form-control form-select"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="" disabled hidden>
              Startery
              </option>
              <option value="Startery">Startery</option>
              <option value="Finance">Finance</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Stores">Stores</option>
            </select>
          </div>

          <div className="form-group">
            <label className="date-label">Start Date as per Project Plan</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="form-control-date"
              calendarClassName="calender-class"
            />
          </div>
          <div className="form-group">
            <label className="date-label">End Date as per Project Plan</label>
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              className="form-control-date" 
              calendarClassName="calender-class"
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <select
              className="form-control form-select"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="" disabled hidden>
              Pune
              </option>
              <option value="Pune">Pune</option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
            </select>
          </div>
        </div>
        <div className="form-actions">
          <div className="status">
            <label>Status: </label>
            <h6> {status}</h6>
          </div>
        </div>
        {isMobile && (<button type="submit" className="btn btn-primary save-button-mobile">
            Save Project
          </button>)}
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default AddProject;
