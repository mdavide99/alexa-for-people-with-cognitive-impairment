var express = require('express');
var router = express.Router();
var path = require('path');

var authJwt = require("../models/authJwt.model");
var admin = require("../controllers/admin.controller");

router.use(function(req, res, next) {
  res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.get('/', [authJwt.isAdmin],function(req, res, next) {
  res.sendFile(path.resolve('public/admin.html'));
});
router.post('/createNewUser',[authJwt.isAdmin],admin.createUser);
router.get('/list',[authJwt.isAdmin],admin.findAllUsers);
router.get('/user/:idUser',[authJwt.isAdmin],admin.findUserById);
router.delete('/user/:idUser',[authJwt.isAdmin],admin.deleteUserById);
router.get('/user/:idUser/reset',[authJwt.isAdmin],admin.deleteUserById);
module.exports = router;
