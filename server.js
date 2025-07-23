const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const https = require('https');
const fs = require('fs');

app.use(cors());

var indexRouter = require('./routes/pointsTableRouter');
var matchScheduleRouter = require('./routes/matchScheduleRouter');

app.use('/pointsTable', indexRouter);
app.use('/matchSchedule', matchScheduleRouter);


const port = process.env.PORT || 4000;


app.get('/', (req, res) => {
    res.json({ "test": "Welcome to CricInfo!" });
});

const key = fs.readFileSync(process.env.SSL_KEY_PATH);
const cert = fs.readFileSync(process.env.SSL_CERT_PATH);

try {
    const options = {
        key,
        cert
    };
    
    https.createServer(options, app).listen(port, () => {
        console.log(`HTTPS Server running on port ${port}`);
    });
} catch (error) {
    console.error('SSL certificates not found. Running HTTP server only.');
    app.listen(port, () => {
        console.log(`HTTP Server listening on port ${port}`);
    });
}