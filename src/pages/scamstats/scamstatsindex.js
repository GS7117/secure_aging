const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 5002;

// Enable CORS to allow requests from the frontend
app.use(cors());

// PostgreSQL connection setup
const pool = new Pool({
    user: 'postgres',          // Your PostgreSQL username
    host: 'localhost',         // Your PostgreSQL host (usually localhost)
    database: 'scam_database',    // Your database name
    password: 'password',      // Your PostgreSQL password
    port: 5432,                // PostgreSQL default port
});

// API to manually calculate total lost in 2023
app.get('/api/loss_stats_2023', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT SUM(amount_lost) AS total_lost
            FROM "scamreports"
            WHERE EXTRACT(YEAR FROM date) = 2023;
        `);

        const totalLost = result.rows[0].total_lost !== null ? result.rows[0].total_lost : 0;

        res.json({ total_lost: totalLost });
    } catch (error) {
        console.error('Error fetching 2023 total lost:', error);
        res.status(500).send('Server error');
    }
});

// API to calculate total lost in 2023 by people aged 55 and above
app.get('/api/loss_stats_2023_by_age_55', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT SUM(amount_lost) AS total_lost
            FROM "scamreports"
            WHERE EXTRACT(YEAR FROM date) = 2023
            AND age_numeric >= 55;
        `);

        const totalLostByAge55 = result.rows[0].total_lost !== null ? result.rows[0].total_lost : 0;

        res.json({ total_lost_by_age_55: totalLostByAge55 });
    } catch (error) {
        console.error('Error fetching total lost by age 55 in 2023:', error);
        res.status(500).send('Server error');
    }
});

// API to calculate total lost in a given year
app.get('/api/loss_stats/:year', async (req, res) => {
    const year = parseInt(req.params.year);
    try {
        const result = await pool.query(`
            SELECT SUM(amount_lost) AS total_lost
            FROM "scamreports"
            WHERE EXTRACT(YEAR FROM date) = $1;
        `, [year]);

        const totalLost = result.rows[0].total_lost !== null ? result.rows[0].total_lost : 0;

        res.json({ total_lost: totalLost });
    } catch (error) {
        console.error('Error fetching total lost for year:', year, error);
        res.status(500).send('Server error');
    }
});

// API to calculate total lost in a given year by people aged 55 and above
app.get('/api/loss_stats_by_age_55/:year', async (req, res) => {
    const year = parseInt(req.params.year);
    try {
        const result = await pool.query(`
            SELECT SUM(amount_lost) AS total_lost_by_age_55
            FROM scamreports
            WHERE EXTRACT(YEAR FROM date) = $1
            AND age_numeric >= 55;
        `, [year]);

        const totalLostByAge55 = result.rows[0].total_lost_by_age_55 !== null ? result.rows[0].total_lost_by_age_55 : 0;

        res.json({ total_lost_by_age_55: totalLostByAge55 });
    } catch (error) {
        console.error('Error fetching total lost by age 55 for year:', year, error);
        res.status(500).send('Server error');
    }
});

// API to fetch state-wise statistics for the last 10 years
app.get('/api/state_stats/:state', async (req, res) => {
    const state = req.params.state;
    try {
        const result = await pool.query(`
            SELECT EXTRACT(YEAR FROM r.date) AS year, SUM(r.amount_lost) AS total_lost
            FROM "scamreports" r
            JOIN "location" l ON r.state_id = l.state_id
            WHERE l.state_name = $1
            GROUP BY year
            ORDER BY year ASC;
        `, [state]);

        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching state data:', error);
        res.status(500).send('Server error');
    }
});

// API to calculate total number of reports in 2023
app.get('/api/reports_stats_2023', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT COUNT(*) AS total_reports
            FROM "scamreports"
            WHERE EXTRACT(YEAR FROM date) = 2023;
        `);

        const totalReports = result.rows[0].total_reports !== null ? result.rows[0].total_reports : 0;

        res.json({ total_reports: totalReports });
    } catch (error) {
        console.error('Error fetching 2023 total reports:', error);
        res.status(500).send('Server error');
    }
});

// API to calculate total number of reports in 2023 by people aged 55 and above
app.get('/api/reports_stats_2023_by_age_55', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT COUNT(*) AS total_reports_by_age_55
            FROM "scamreports"
            WHERE EXTRACT(YEAR FROM date) = 2023
            AND age_numeric >= 55;
        `);

        const reportsByAge55 = result.rows[0].total_reports_by_age_55 !== null ? result.rows[0].total_reports_by_age_55 : 0;

        res.json({ total_reports_by_age_55: reportsByAge55 });
    } catch (error) {
        console.error('Error fetching reports by age 55 in 2023:', error);
        res.status(500).send('Server error');
    }
});
// API to calculate total number of reports in a given year
app.get('/api/reports_stats/:year', async (req, res) => {
    const year = parseInt(req.params.year);
    try {
        const result = await pool.query(`
            SELECT COUNT(*) AS total_reports
            FROM "scamreports"
            WHERE EXTRACT(YEAR FROM date) = $1;
        `, [year]);

        const totalReports = result.rows[0].total_reports !== null ? result.rows[0].total_reports : 0;

        res.json({ total_reports: totalReports });
    } catch (error) {
        console.error('Error fetching total reports for year:', year, error);
        res.status(500).send('Server error');
    }
});

// API to calculate total number of reports in a given year by people aged 55 and above
app.get('/api/reports_stats_by_age_55/:year', async (req, res) => {
    const year = parseInt(req.params.year);
    try {
        const result = await pool.query(`
            SELECT COUNT(*) AS total_reports_by_age_55
            FROM "scamreports"
            WHERE EXTRACT(YEAR FROM date) = $1
            AND age_numeric >= 55;
        `, [year]);

        const reportsByAge55 = result.rows[0].total_reports_by_age_55 !== null ? result.rows[0].total_reports_by_age_55 : 0;

        res.json({ total_reports_by_age_55: reportsByAge55 });
    } catch (error) {
        console.error('Error fetching reports by age 55 for year:', year, error);
        res.status(500).send('Server error');
    }
});

// API to fetch statistics for a particular state and people aged 55+ over the last 10 years
app.get('/api/state_stats_age_55/:state', async (req, res) => {
    const state = req.params.state;
    try {
        const result = await pool.query(`
            SELECT EXTRACT(YEAR FROM r.date) AS year, SUM(r.amount_lost) AS total_lost_age_55
            FROM "scamreports" r
            JOIN "location" l ON r.state_id = l.state_id
            WHERE l.state_name = $1 
            AND r.age_numeric >= 55
            GROUP BY year
            ORDER BY year ASC;
        `, [state]);

        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching data for people aged 55+ in the selected state:', error);
        res.status(500).send('Server error');
    }
});

// API to fetch number of reports for a state over the last 10 years
app.get('/api/state_reports/:state', async (req, res) => {
    const state = req.params.state;
    try {
        const result = await pool.query(`
            SELECT EXTRACT(YEAR FROM r.date) AS year, COUNT(*) AS total_reports
            FROM "scamreports" r
            JOIN "location" l ON r.state_id = l.state_id
            WHERE l.state_name = $1
            GROUP BY year
            ORDER BY year ASC;
        `, [state]);

        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching reports data for state:', error);
        res.status(500).send('Server error');
    }
});


// API to fetch number of reports for a particular state and people aged 55+ over the last 10 years
app.get('/api/state_reports_age_55/:state', async (req, res) => {
    const state = req.params.state;
    try {
        const result = await pool.query(`
            SELECT EXTRACT(YEAR FROM r.date) AS year, COUNT(*) AS total_reports_age_55
            FROM "scamreports" r
            JOIN "location" l ON r.state_id = l.state_id
            WHERE l.state_name = $1 
            AND r.age_numeric >= 55
            GROUP BY year
            ORDER BY year ASC;
        `, [state]);

        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching report data for people aged 55+ in the selected state:', error);
        res.status(500).send('Server error');
    }
});


// API to get the distribution of scam types for a state
app.get('/api/scam_type_distribution/:state', async (req, res) => {
    const state = req.params.state;
    try {
        const result = await pool.query(`
            SELECT r.scam_type, COUNT(*) as count
            FROM "scamreports" r
            JOIN "location" l ON r.state_id = l.state_id
            WHERE l.state_name = $1
            GROUP BY r.scam_type
            ORDER BY count DESC;
        `, [state]);

        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching scam type distribution for state:', state, error);
        res.status(500).send('Server error');
    }
});

// API to get the distribution of scam types for a state for people aged 55+
app.get('/api/scam_type_distribution_age_55/:state/:year', async (req, res) => {
    const state = req.params.state;
    const year = parseInt(req.params.year);

    try {
        const result = await pool.query(`
            SELECT r.scam_type, COUNT(*) as count
            FROM scamreports r
            JOIN location l ON r.state_id = l.state_id
            WHERE l.state_name = $1
            AND EXTRACT(YEAR FROM r.date) = $2
            AND r.age_numeric >= 55
            GROUP BY r.scam_type
            ORDER BY count DESC;
        `, [state, year]);

        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching scam type distribution for age 55+ in state:', state, 'year:', year, error);
        res.status(500).send('Server error');
    }
});



// API to get the distribution of scam categories for a state and year
app.get('/api/scam_categories/:state/:year', async (req, res) => {
    const state = req.params.state;
    const year = parseInt(req.params.year);

    try {
        const result = await pool.query(`
            SELECT c.category_2, COUNT(*) as count
            FROM "scamreports" r
            JOIN "location" l ON r.state_id = l.state_id
            JOIN "scamcategories" c ON r.category_1 = c.category_1 AND r.category_2 = c.category_2
            WHERE l.state_name = $1
            AND EXTRACT(YEAR FROM r.date) = $2
            GROUP BY c.category_2
            ORDER BY count DESC;
        `, [state, year]);

        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching scam categories for state:', state, 'and year:', year, error);
        res.status(500).send('Server error');
    }
});

// API to get the trends of scam categories for a state and year
app.get('/api/scam_categories_trends/:state/:year', async (req, res) => {
    const state = req.params.state;
    const year = parseInt(req.params.year);

    try {
        const result = await pool.query(`
            SELECT c.category_2, EXTRACT(MONTH FROM r.date) AS month, COUNT(*) AS count
            FROM "scamreports" r
            JOIN "location" l ON r.state_id = l.state_id
            JOIN "scamcategories" c ON r.category_1 = c.category_1 AND r.category_2 = c.category_2
            WHERE l.state_name = $1
            AND EXTRACT(YEAR FROM r.date) = $2
            GROUP BY c.category_2, EXTRACT(MONTH FROM r.date)
            ORDER BY c.category_2, month;
        `, [state, year]);

        // Ensure the count is a proper number and format the result
        const formattedResult = result.rows.map(row => ({
            category_2: row.category_2,
            month: row.month,
            count: parseInt(row.count, 10)  // Ensure count is returned as an integer
        }));

        res.json(formattedResult);
    } catch (error) {
        console.error('Error fetching scam categories trends for state:', state, 'and year:', year, error);
        res.status(500).send('Server error');
    }
});


// Start the Express server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
