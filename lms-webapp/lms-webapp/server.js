const express = require('express');
const { Pool } = require('pg');
const app = express();

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'lms',
    password: 'yourpassword',
    port: 5432,
});

app.get('/api/query1', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT c.courseID, c.title, COUNT(cr.studentID) AS enrollment_count
            FROM CourseRegistrations cr
            JOIN Courses c ON cr.courseID = c.courseID
            WHERE cr.startDate >= CURRENT_DATE - INTERVAL '1 month'
            GROUP BY c.courseID, c.title
            ORDER BY enrollment_count DESC
            LIMIT 10;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});