import mongoose from "mongoose";

const ProjectSchema = mongoose.Schema({
    projectTheme: String,
    reason: String,
    type: String,
    division: String,
    category: String,
    priority: String,
    department : String,
    location: String,
    status: String,
    startDate: Date,
    endDate: Date
});

const Projects = mongoose.model("Projects", ProjectSchema, "Projects");

export default Projects;