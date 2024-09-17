import React, { useEffect, useState } from 'react';
import './Dashboard.css'; // Add custom styles here

const Dashboard = () => {
    const [totalLost2023, setTotalLost2023] = useState(0);  // Total lost in 2023
    const [lostByAge55, setLostByAge55] = useState(0);      // Amount lost by people aged 55+

    // Fetch total lost in 2023 and amount lost by age 55+
    useEffect(() => {
        fetch('/api/loss_stats_2023')  // API to fetch the required data
            .then(response => response.json())
            .then(data => {
                setTotalLost2023(data.total_lost);
                setLostByAge55(data.lost_by_age_55);
            });
    }, []);

    return (
        <div className="stats-section">
            <h2>In <strong>2023</strong>,</h2>
            <p><strong style={{ fontSize: '2rem', color: '#D9534F' }}>${totalLost2023.toLocaleString()}</strong> amount lost of being scammed</p>
            <p>while <strong style={{ fontSize: '1.5rem', color: '#F0AD4E' }}>${lostByAge55.toLocaleString()}</strong></p>
            <p>nearly <strong style={{ fontSize: '1.5rem', color: '#F0AD4E' }}>45%</strong> of the total are from people who age <strong style={{ fontSize: '1.5rem', color: '#5D5D5D' }}>55 and over</strong></p>
        </div>
    );
};

export default Dashboard;
