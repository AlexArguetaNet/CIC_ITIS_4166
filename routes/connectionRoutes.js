const express = require('express');
const router = express.Router();
const connController = require('../controllers/connectionController');
const {isLoggedIn, isAuthor} = require('../middlewares/auth');
const {validateId} = require('../middlewares/validator');

// Get /connections: Send all stories to the user
router.get('/', connController.index);

// Get /connections/newConnection: Send form for creating a new connection
router.get('/newConnection', isLoggedIn, connController.new);

// POST /connections: Send newly created connection
router.post('/', connController.create);

// GET /stories/:id: Send details of connection identified by id
router.get('/:id', validateId,connController.show);

// GET /connections/:id/edit: Edits a connection with the specified id
router.get('/:id/edit', isLoggedIn, validateId, isAuthor,connController.edit);

router.put('/:id', isLoggedIn, validateId, isAuthor,connController.update);

// DELETE /connections/:id: Deletes the story identified by id
router.delete('/:id', isLoggedIn, validateId, isAuthor,connController.delete);



module.exports = router;