const router = require('express').Router();
const {CLINIC_ROUTE} = require('../utils/constants');
const getClinicDetailsInCity = require('./clinics/getClinicDetailsInCity');
const getDynamicClincDetails = require('./clinics/getDynamicClinicDetails');
const getClinicsWithAllSpecialities = require('./clinics/getClinicsWithAllSpecialities');

router.use(CLINIC_ROUTE, getClinicDetailsInCity);
router.use(CLINIC_ROUTE, getDynamicClincDetails);
router.use(CLINIC_ROUTE, getClinicsWithAllSpecialities);

module.exports = router;