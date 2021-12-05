var express = require('express'),
    router = express.Router();

var userRoutes = require('./userRoutes');

router 
    .get('/', function(req, res) {
        res.send("routes");
    })

    .use('/userRoutes', userRoutes);

module.exports = router;