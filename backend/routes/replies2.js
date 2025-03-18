const express = require('express');
const router = express.Router();
const replyController = require('../controllers/replyController');

router.post('/', replyController.createReply);
router.put('/:id', replyController.updateReply);
router.delete('/:id', replyController.deleteReply);

module.exports = router;
