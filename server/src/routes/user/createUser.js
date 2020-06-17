const router = require('express').Router();
const sqlClient = require('../../utils/sqlClient');
const logger = require('../../utils/logger');
const { formatPatientResponse } = require('./userUtil');

router.post('/patient/:id', async (req, res) => {
  // Create medical history
  try {
    const medHisResponse = await sqlClient.query(`INSERT INTO Medical_History (guardian_name, height, weight, date_created) VALUES ('', 0, 0, to_timestamp(${Date.now()} / 1000.0)) RETURNING *`);
    if (medHisResponse) {
      const medHisId = medHisResponse.rows[0].id;
      const patientResponse = await sqlClient.query(`INSERT INTO Patient (id, mid, email, password, full_name, profile_picture_url) VALUES ('${req.params.id}', ${medHisId}, '${req.body.username}', '', '', '') RETURNING *`);
      formatPatientResponse(res, patientResponse.rows[0], medHisResponse.rows[0]);
      return;
    }
  } catch (err) {
    logger.debug(`Error creating patient with id ${req.params.id}, error: ${err}`);
  }

  res.status(400);
});

module.exports = router;
