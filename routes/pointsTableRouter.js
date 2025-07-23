var express = require("express");
var router = express.Router();
const axios = require("axios");
const {
  YEARS_WISE_META_OBJECT,
  POINTS_TABLE,
  POINTS_TABLE_SUFFIX,
} = require("../constants/urlConstants");

async function fetchPointsTable(yearId) {
  try {
    const response = await axios.get(`${POINTS_TABLE}${yearId}${POINTS_TABLE_SUFFIX}`);
    const jsonString = response.data.replace(/^.*?\(/, "").replace(/\);?$/, "");
    const json = JSON.parse(jsonString);
    console.log("Points Table Data:", json);
    if (json.points && json.points.length > 0) {
      return json.points;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error Fetching Points Table:", error);
  }
}

router.get("/", async function (req, res) {
  try {
    let year = req.query.year;
    year = year || new Date().getFullYear().toString();
    let yearId = YEARS_WISE_META_OBJECT[year];
    let response = await fetchPointsTable(yearId);
    let status = 404;
    if (response.length > 0) {
        status = 200;
    }
    return res.status(status).json(response);
  } catch (error) {
    console.error("Error fetching live match details:", error);
    res.status(500).json({ error: "Internal server error!" });
  }
});

module.exports = router;
