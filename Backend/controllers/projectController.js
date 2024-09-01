import Projects from "../models/projectModel.js";

export const createProject = async (req, res) => {
  try {
    const {
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
      endDate
    } = req.body;
    const newProject = new Projects({
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
      endDate
    });
    await newProject.save();
    res.send(newProject);
  } catch (error) {
    console.log("Error creating project", error);
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Projects.find({});
    if (projects) {
      res.send(projects);
    } else {
      console.log("Projects not found");
    }
  } catch (error) {
    console.log("Error getting projects", error);
  }
};

export const updateProjectStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStatus = await Projects.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.send(updatedStatus);
  } catch (error) {
    console.log("Error updating project status");
  }
};
