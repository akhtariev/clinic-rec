const sqlClient = require('../../utils/sqlClient');
const logger = require('../../utils/logger');

const formatPatientResponse = async (res, patientData, medHistData) => {
  try {
    const allergiesRes = await sqlClient.query(`SELECT * FROM  Allergies WHERE mid=${medHistData.id}`);

    const allergies = allergiesRes.rows.map(row =>
      ({ name: row.name, comments: row.comments, new: false }));

    res.json({
      status: 200,
      message: 'GET /patient/:id successfully retrieved.',
      data: { patientData, medHistData, allergies },
    });
  } catch (err) {
    logger.debug(`Error extracting allergies ${err}`);
    res.status(500);
  }
};

module.exports = { formatPatientResponse };
