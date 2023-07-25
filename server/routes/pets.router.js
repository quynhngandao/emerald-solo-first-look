const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const {rejectUnauthenticated } = require('../modules/authentication-middleware'
)

// This route *should* return the logged in users pets
// rejectUnauthenticated middleware used as a protection, ensuring only authenticated users can access this route
// req.isAuthenticated() check if user is authenticated 
router.get('/', rejectUnauthenticated , (req, res) => {
    console.log('/pet GET route');
    // is user logged in? 
    console.log('is authenticated?', req.isAuthenticated());
    // who is the user logged in?
    console.log('user', req.user);

    // if (req.isAuthenticated()) => { 
        let queryText = `SELECT * FROM "pets" WHERE "user_id" = $1`;
    pool.query(queryText, [req.user.id]).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    })  
    // } else {
     // res.sendStatus(403)
});

// This route *should* add a pet for the logged in user
router.post('/', (req, res) => {
    console.log('/pet POST route');
    console.log(req.body);
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    res.sendStatus(200);
    
});

module.exports = router;