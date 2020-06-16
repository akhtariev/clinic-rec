const router = require('express').Router();
const sqlClient = require('../../utils/sqlClient');

router.get("/getAvgDoctorRating/:specialty", (req, res) => {
    const doctorSpecialty = req.params.specialty;
    const query = 'select d.full_name, avg(r.stars) from rating r, doctor d, specialty s, specializes sp where r.did = d.id and sp.name = $1 and sp.did = d.id group by d.full_name;'
    sqlClient.query(query, [doctorSpecialty],
        (err, qres) => {
             if(err){
                return res.status(500);
                throw err; 
            }  
            else {
                res.send(qres.rows); 
                return res.status(200);
            } 
    });
});

module.exports = router;