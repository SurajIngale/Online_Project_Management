import { Router } from "express"; 
import { createProject, getAllProjects, updateProjectStatus } from "../controllers/projectController.js";
import authMiddleware from "../authmiddleware.js";

const route = Router();

route.post("/createProject", authMiddleware, createProject);
route.get("/getAllProjects", authMiddleware, getAllProjects);
route.put("/updateStatus/:id", authMiddleware, updateProjectStatus);

export default route;

