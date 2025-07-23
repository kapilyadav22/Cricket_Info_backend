var express = require('express');
var router = express.Router();
const axios = require('axios');

const {
    YEARS_WISE_META_OBJECT,
    MATCHSCHEDULE,
    MATCHSCHEDULE_SUFFIX
  } = require('../constants/urlConstants');


async function fetchMatchSchedule(yearId) {
    try {
        const response = await axios.get(`${MATCHSCHEDULE}${yearId}${MATCHSCHEDULE_SUFFIX}`);
        const jsonString = response.data.replace(/^.*?\(/, '').replace(/\);?$/, '');
        const json = JSON.parse(jsonString);
        if (json.Matchsummary && json.Matchsummary.length > 0) {
            return json.Matchsummary;
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error Fetching Points Table:", error);
    }
}

router.get('/', async function(req, res) {
      try {
        let year = req.query.year;
        year = year || new Date().getFullYear().toString(); 
        let yearId = YEARS_WISE_META_OBJECT[year];
        let response = await fetchMatchSchedule(yearId);

        let status = 404;
        if (response.length > 0) {
            status = 200;
        } 
        return res.status(200).json(response);
    } catch (error) {
        console.error("Error fetching live match details:", error);
        res.status(500).json({ error: "Internal server error!" });
    }

});

module.exports = router;

