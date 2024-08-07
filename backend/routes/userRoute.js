const express = require('express');
const router = express.Router();

const { getUsers, newUser} = require('../controllers/userController');

router.post('/new', newUser);
router.get('/users', getUsers)

module.exports = router;