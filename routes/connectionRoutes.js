const express = require('express');
const router = express.Router();
const connController = require('../controllers/connectionController');

// Get /connections: Send all stories to the user
router.get('/', connController.index);

// Get /connections/newConnection: Send form for creating a new connection
router.get('/newConnection', connController.new);

// POST /connections: Send newly created connection
router.post('/', connController.create);

// GET /stories/:id: Send details of story identified by id
router.get('/:id', connController.show);

// GET /connections/:id/edit: Edits a connection with the specified id
router.get('/:id/edit', connController.edit);

router.put('/:id', connController.update);

// DELETE /connections/:id: Deletes the story identified by id
router.delete('/:id', connController.delete);



module.exports = router;