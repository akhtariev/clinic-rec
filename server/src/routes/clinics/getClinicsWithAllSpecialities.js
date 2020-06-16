const router = require('express').Router();
const sqlClient = require('../../utils/sqlClient');

router.get("/getClinicsWithAllSpecialities/:city", (req, res) => {
    const cityName = req.params.city; 
    const query = 'select * from clinic c where not exists(select s1.name from specialty s1 where not exists(select d.id, d.clinic_id from doctor d, specializes s2, cliniclocation cl where d.id = s2.did and d.clinic_id = c.id and s1.name = s2.name and c.postal_code = cl.postal_code and cl.city=$1));'
    sqlClient.query(query, [cityName], 
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