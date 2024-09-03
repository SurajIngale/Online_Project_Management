import { Router } from "express";
import { dashboardCounter, departmentStates } from "../controllers/dashboardControllers.js";
import authMiddleware from "../authmiddleware.js";

const route = Router();

route.get("/dashboard/counters", authMiddleware, dashboardCounter);
route.get("/dashboard/department-stats",authMiddleware, departmentStates);

export default route;