const express = require("express");
const router = express.Router();
const friendInvitationControllers = require('../controllers/friendInvitation/FriendInvitationController');

const joi = require("joi");
const verifyJwtToken = require("../middleware/TokenAuth");
const validator = require("express-joi-validation").createValidator({}); 

const postInvitation = joi.object({
    targetMailAddress : joi.string().email().required(),
});

router.post('/invite', verifyJwtToken, validator.body(postInvitation), friendInvitationControllers.controllers.postInvite);

module.exports = router;