const router = require('express').Router();
const sqlClient = require('../../utils/sqlClient');

router.get("/getDynamicClinicDetails/", (req, res) => {
    const projColName = req.query.colName; 
    const cityName = req.query.cityName; 
    var query = ''; 
     switch(projColName) {
        case 'name': 
                     query = 'select c.name from clinic c, cliniclocation cl where cl.city = $1 and c.postal_code = cl.postal_code;'
                     break; 
        case 'opening_time': 
                     query = 'select c.opening_time from clinic c, cliniclocation cl where cl.city = $1 and c.postal_code = cl.postal_code;'
                     break; 
        case 'closing_time': 
                    query = 'select c.closing_time from clinic c, cliniclocation cl where cl.city = $1 and c.postal_code = cl.postal_code;'
                     break; 
        case 'days_open': 
                     query = 'select c.days_open from clinic c, cliniclocation cl where cl.city = $1 and c.postal_code = cl.postal_code;'
                     break; 
        case 'postal_code': 
                     query = 'select c.postal_code from clinic c, cliniclocation cl where cl.city = $1 and c.postal_code = cl.postal_code;'
                     break; 
        case 'city': 
                     query = 'select c.city from clinic c, cliniclocation cl where cl.city = $1 and c.postal_code = cl.postal_code;'
                     break; 
        default:     
                     query='select * from clinic c, cliniclocation cl where cl.city = $1 and c.postal_code = cl.postal_code;'
                     break; 

    }
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