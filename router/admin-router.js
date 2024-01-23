const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin-controller.js");
const authMiddleware = require("../middlewares/auth-middleware.js");
const adminMiddleware = require( "../middlewares/admin-middleware.js" );

router.route('/users').get(authMiddleware,adminMiddleware,adminController.getAllUsers);
router.route('/users/:id').get(authMiddleware,adminMiddleware,adminController.getUserById);
router.route('/users/update/:id').patch(authMiddleware,adminMiddleware,adminController.updateUserById);
router.route('/users/delete/:id').delete(authMiddleware,adminMiddleware,adminController.deleteUserById);
router.route('/contacts').get(authMiddleware,adminMiddleware,adminController.getAllContacts);
router.route('/contacts/:id').get(authMiddleware,adminMiddleware,adminController.getContactById);
router.route('/contacts/update/:id').patch(authMiddleware,adminMiddleware,adminController.updateContactById);
router.route('/contacts/delete/:id').delete(authMiddleware,adminMiddleware,adminController.deleteContactById);

module.exports = router;