// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css"; // Assume you have some custom styles

const Dashboard = () => {
    const [counters, setCounters] = useState({
        totalProjects: 0,
        closedProjects: 0,
        runningProjects: 0,
        closureDelay: 0,
        cancelledProjects: 0
    });
    const [chartData, setChartData] = useState([]);
    const [loadingCounters, setLoadingCounters] = useState(true);
    const [loadingChart, setLoadingChart] = useState(true);
    const [errorCounters, setErrorCounters] = useState(null);
    const [errorChart, setErrorChart] = useState(null);

    useEffect(() => {
        fetchCounters();
        fetchChartData();
    }, []);

    const fetchCounters = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3000/dashboard/counters', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCounters(response.data);
            setLoadingCounters(false);
        } catch (error) {
            console.error('Failed to fetch counters', error);
            setErrorCounters('Failed to load counters');
            setLoadingCounters(false);
        }
    };

    const fetchChartData = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get('http://localhost:3000/dashboard/department-stats', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Ensure the data is an array
            if (Array.isArray(response.data)) {
                setChartData(response.data);
            } else {
                console.error('Chart data is not an array', response.data);
                setChartData([]);
            }
            setLoadingChart(false);
        } catch (error) {
            console.error('Failed to fetch chart data', error);
            setErrorChart('Failed to load chart data');
            setChartData([]);
            setLoadingChart(false);
        }
    };


    return (
        <div className="dashboard container">
           <div className='bg-image-container'>
                <h3> Dashboard</h3>
                <img className='dash-bg' src="/Header-bg.svg" alt="" />
                <img className='dash-logo' src="/Logo.svg" alt="" />
            </div>
            <div className="counters">
                {/* Total Projects */}
                <div>
                    <div className="card text-black ">
                        <div className="card-body">
                            <h5 className="card-title">Total Projects</h5>
                            <p className="card-text">{counters.totalProjects}</p>
                        </div>
                    </div>
                </div>
                {/* Closed Projects */}
                <div>
                    <div className="card text-black">
                        <div className="card-body">
                            <h5 className="card-title">Closed </h5>
                            <p className="card-text">{counters.closedProjects}</p>
                        </div>
                    </div>
                </div>
                {/* Running Projects */}
                <div>
                    <div className="card text-black">
                        <div className="card-body">
                            <h5 className="card-title">Running</h5>
                            <p className="card-text">{counters.runningProjects}</p>
                        </div>
                    </div>
                </div>
                {/* Closure Delay */}
                <div>
                    <div className="card text-black">
                        <div className="card-body">
                            <h5 className="card-title">Closure Delay</h5>
                            <p className="card-text">{counters.closureDelay}</p>
                        </div>
                    </div>
                </div>
                {/* Cancelled Projects */}
                <div>
                    <div className="card text-black">
                        <div className="card-body">
                            <h5 className="card-title">Cancelled</h5>
                            <p className="card-text">{counters.cancelledProjects}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    {loadingChart ? (
                        <p>Loading chart...</p>
                    ) : errorChart ? (
                        <p className="text-danger">{errorChart}</p>
                    ) : chartData.length > 0 ? (
                        
                        <div className='chart'>
                            <h4 className='dash-h4'>Department wise: Total vs Closed</h4>
                            <ResponsiveContainer className="chart-box" width="100%" height={400}>
                            <BarChart
                                data={chartData}
                                margin={{
                                    top: 20, right: 30, left: 20, bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="department" />
                                <YAxis domain={[0, 20]} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="totalProjects" name="Total Projects" fill="#1E90FF" />
                                <Bar dataKey="closedProjects" name="Closed Projects" fill="#32CD32" />
                            </BarChart>
                        </ResponsiveContainer>
                        </div>
                    ) : (
                        <p>No chart data available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
