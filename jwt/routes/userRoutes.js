const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const { getAllUsers, deleteUser } = require('../controllers/userController');

router.get('/users', auth, getAllUsers);
router.delete('/delete/:id', [auth, admin], deleteUser);

module.exports = router;
