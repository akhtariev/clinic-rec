const formatPatientResponse = (res, patientData, medHistData) => res.json({
  status: 200,
  message: 'GET /patient/:id successfully retrieved.',
  data: { patientData, medHistData },
});

module.exports = { formatPatientResponse };
