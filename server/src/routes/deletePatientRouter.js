const router = require('express').Router();
const { USER_ROUTE } = require('../utils/constants');
const deletePatientAccount = require('./user/deletePatientAccount');

router.use(USER_ROUTE, deletePatientAccount);

module.exports = router;
