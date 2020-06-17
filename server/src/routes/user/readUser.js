const router = require('express').Router();
const sqlClient = require('../../utils/sqlClient');
const logger = require('../../utils/logger');
const { formatPatientResponse } = require('./userUtil');

router.get('/patient/:id', async (req, res) => {
  try {
    const patientRes = await sqlClient.query(`SELECT * FROM PATIENT WHERE id='${req.params.id}' LIMIT 1`);
    if (patientRes) {
      const medHistRes = await sqlClient.query(`SELECT * FROM MEDICAL_HISTORY WHERE id=${parseInt(patientRes.rows[0].mid, 10)} LIMIT 1`);
      formatPatientResponse(res, patientRes.rows[0], medHistRes.rows[0]);
      return;
    }
  } catch (err) {
    logger.debug(`Error reading patient with id ${req.params.id}, error: ${err}`);
  }
  res.status(400);
});

module.exports = router;
