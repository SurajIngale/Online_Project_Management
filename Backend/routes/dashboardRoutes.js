import { Router } from "express";
import { dashboardCounter, departmentStates } from "../controllers/dashboardControllers.js";

const route = Router();

route.get("/dashboard/counters", dashboardCounter);
route.get("/dashboard/department-stats", departmentStates);

export default route;