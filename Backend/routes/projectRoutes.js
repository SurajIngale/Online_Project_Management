import { Router } from "express"; 
import { createProject, getAllProjects, updateProjectStatus } from "../controllers/projectController.js";

const route = Router();

route.post("/createProject", createProject);
route.get("/getAllProjects", getAllProjects);
route.put("/updateStatus/:id", updateProjectStatus);

export default route;

