const router = require('express').Router();
const sqlClient = require('../../utils/sqlClient');
const logger = require('../../utils/logger');
const { formatPatientResponse } = require('./userUtil');

router.route('/patient/:id').put(async (req, res) => {
  const patientId = req.params.id;
  const { medHistory } = req.body;
  try {
    const patientRes = await sqlClient.query(`UPDATE Patient SET full_name='${req.body.fullName}', profile_picture_url='${req.body.profilePicUrl}' WHERE id='${patientId}' RETURNING *`);
    const medHisRes = await sqlClient.query(`UPDATE Medical_History SET guardian_name='${medHistory.guardianName}', height=${medHistory.height === '' ? 'NULL' : medHistory.height}, weight=${medHistory.weight === '' ? 'NULL' : medHistory.weight} WHERE id=${patientRes.rows[0].mid} RETURNING *`);
    formatPatientResponse(res, patientRes.rows[0], medHisRes.rows[0]);
    return;
  } catch (err) {
    logger.debug(`Failed to update patient with id: ${patientId}`);
    res.status(500);
  }
});

module.exports = router;
