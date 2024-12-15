const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const cors = require('cors');


const app = express();
// const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors());

// Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Akshat@4420',
  database: 'verification_system',
  port : '3306'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL database.');
  }
});

// API Endpoint for Passport Verification
app.post('/api/verify', (req, res) => {
  const { passportNumber } = req.body;

  if (!passportNumber) {
    return res.status(400).json({ message: 'Passport number is required.' });
  }

  const query = 'SELECT * FROM passports WHERE passport_number = ?';
  db.query(query, [passportNumber], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Internal server error.' });
    }

    if (results.length > 0) {
      const passport = results[0];
      res.json({
        name: passport.name,
        age: passport.age,
        nationality: passport.nationality,
        issueDate: passport.issue_date,
        expiryDate: passport.expiry_date
      });
    } else {
      res.status(404).json({ message: 'Passport not found.' });
    }
  });
});

// Start Server
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
