const router = require('express').Router();
const sqlClient = require('../../utils/sqlClient');
const logger = require('../../utils/logger');

router.post('/getDynamicClinicDetails/:cityName', async (req, res) => {
  const initColNames = req.body.colNames;
  // const projColNames = initColNames.push('id');
  const projColNamesF = initColNames.join();

  const { cityName } = req.params;
  const query = `select ${projColNamesF}, id from clinic c, cliniclocation cl where cl.city = $1 and c.postal_code = cl.postal_code`;
  const result = await sqlClient.query(query, [cityName]);
  try {
    res.send(result.rows);
    return;
  } catch (err) {
    logger.debug(`Error creating patient with id ${req.params.id}, error: ${err}`);
  }
  res.status(400);
});

module.exports = router;
