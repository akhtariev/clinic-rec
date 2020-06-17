const router = require('express').Router();
const sqlClient = require('../../utils/sqlClient');
const logger = require('../../utils/logger');
const { formatPatientResponse } = require('./userUtil');

router.route('/patient/:id').put(async (req, res) => {
  const patientId = req.params.id;
  try {
    const patientRes = await sqlClient.query(`UPDATE Patient SET full_name='${req.body.fullName}' WHERE id='${req}' RETURNING *`);
    const medHisRes = await sqlClient.query(`UPDATE Medical_History SET guarian_name='${req.body.guardianName}', height=${req.body.height}, weight=${req.body.weight} WHERE id=${patientRes.rows[0]} RETURNING *`);
    formatPatientResponse(res, patientRes.rows[0], medHisRes.rows[0]);
    return;
  } catch (err) {
    logger.debug(`Failed to update patient with id: ${patientId}`);
    res.status(500);
  }
});

module.exports = router;
