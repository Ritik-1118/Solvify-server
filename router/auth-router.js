const express = require("express");
const router = express.Router()
const controllers = require("../controllers/auth-controller.js");
const {signupSchema,loginSchema} = require("../validators/auth-validator.js");
const validate = require("../middlewares/validate-middleware.js");
const authMiddleware = require("../middlewares/auth-middleware.js")


router.route('/').get(controllers.home);
router.route('/register').post(validate(signupSchema),controllers.register);
router.route('/login').post(validate(loginSchema),controllers.login);
router.route('/user').get(authMiddleware,controllers.user);

module.exports = router;