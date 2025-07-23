const express = require('express');
require('dotenv').config();
const app = express();
const router = express.Router();

var indexRouter = require('./routes/pointsTableRouter');
var matchScheduleRouter = require('./routes/matchScheduleRouter');

app.use('/pointsTable', indexRouter);
app.use('/matchSchedule', matchScheduleRouter);



const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log(`server is running on Port ${PORT}`);
})