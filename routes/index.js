const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//Route to get all users
router.get('/users', userController.getAllUsers);

//Route to search users by ID
router.get('/users/:id', userController.getUsersById);

//Routes to create a new user
router.post('/users', userController.createUser);

//Route to edit a user
router.put('/users', userController.updateUser)

//Route delete
router.delete('/users', userController.deleteUser)

module.exports = router;