var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});
router.get('/11', function(req, res) {
  res.send('11respond with a resource');
});
module.exports = router;
