import express from 'express';
import Projects from '../models/projectModel.js';

export const dashboardCounter = async (req, res) => {
    try {
        // Aggregation to get total, closed, running, and cancelled projects
        const counters = await Projects.aggregate([
            {
                $facet: {
                    totalProjects: [{ $count: "count" }],
                    closedProjects: [{ $match: { status: "Closed" } }, { $count: "count" }],
                    runningProjects: [{ $match: { status: "Running" } }, { $count: "count" }],
                    cancelledProjects: [{ $match: { status: "Cancelled" } }, { $count: "count" }]
                }
            }
        ]);

        // Fetch closure delay separately
        const closureDelay = await Projects.countDocuments({
            status: "Running",
            endDate: { $lt: new Date() }
        });

        const data = {
            totalProjects: counters[0].totalProjects[0]?.count || 0,
            closedProjects: counters[0].closedProjects[0]?.count || 0,
            runningProjects: counters[0].runningProjects[0]?.count || 0,
            cancelledProjects: counters[0].cancelledProjects[0]?.count || 0,
            closureDelay: closureDelay
        };

        res.json(data);
    } catch (error) {
        console.error('Error fetching counters:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const departmentStates =  async (req, res) => {
    try {
        const departmentStats = await Projects.aggregate([
            {
                $group: {
                    _id: "$department",
                    totalProjects: { $sum: 1 },
                    closedProjects: {
                        $sum: { $cond: [{ $eq: ["$status", "Closed"] }, 1, 0] }
                    }
                }
            },
            {
                $project: {
                    department: "$_id",
                    totalProjects: 1,
                    closedProjects: 1,
                    _id: 0
                }
            }
        ]);

        res.json(departmentStats);
    } catch (error) {
        console.error('Error fetching department stats:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};