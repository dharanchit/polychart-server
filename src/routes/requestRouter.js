const express = require('express');
const getDataController = require('../controller/getDataController');
const getMonthlyReportsController = require('../controller/getMonthlyReportsController');
const getPolicyDataController = require('../controller/getPolicyDataController');
const updateDataController = require('../controller/updateDataController');

const router = express.Router();

router.get("/", getDataController);
router.patch("/", updateDataController);
router.get("/policy-data", getPolicyDataController);
router.get("/reports/monthly", getMonthlyReportsController);

module.exports = router;