// File: controllers/replyController.js
const db = require('../database');

const replyController = {
  createReply: (req, res) => {
    try {
      const { thread_id, content, author } = req.body;

      if (!thread_id || !content || !author) {
        return res
          .status(400)
          .json({ error: 'Thread ID, content and author are required' });
      }

      const thread = db
        .prepare('SELECT * FROM threads WHERE id = ?')
        .get(thread_id);
      if (!thread) {
        return res.status(404).json({ error: 'Thread not found' });
      }

      const result = db
        .prepare(
          'INSERT INTO replies (thread_id, content, author) VALUES (?, ?, ?)'
        )
        .run(thread_id, content, author);

      db.prepare(
        'UPDATE threads SET updated_at = CURRENT_TIMESTAMP WHERE id = ?'
      ).run(thread_id);

      const newReply = db
        .prepare('SELECT * FROM replies WHERE id = ?')
        .get(result.lastInsertRowid);

      res.status(201).json(newReply);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateReply: (req, res) => {
    try {
      const { id } = req.params;
      const { content, author } = req.body;

      if (!content) {
        return res.status(400).json({ error: 'Content is required' });
      }

      const reply = db.prepare('SELECT * FROM replies WHERE id = ?').get(id);
      if (!reply) {
        return res.status(404).json({ error: 'Reply not found' });
      }

      const replyAuthor = author || reply.author;

      db.prepare(
        'UPDATE replies SET content = ?, author = ?, created_at = CURRENT_TIMESTAMP WHERE id = ?'
      ).run(content, replyAuthor, id);

      db.prepare(
        'UPDATE threads SET updated_at = CURRENT_TIMESTAMP WHERE id = ?'
      ).run(reply.thread_id);

      const updatedReply = db
        .prepare('SELECT * FROM replies WHERE id = ?')
        .get(id);

      res.json(updatedReply);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteReply: (req, res) => {
    try {
      const { id } = req.params;

      const reply = db.prepare('SELECT * FROM replies WHERE id = ?').get(id);
      if (!reply) {
        return res.status(404).json({ error: 'Reply not found' });
      }

      db.prepare('DELETE FROM replies WHERE id = ?').run(id);

      res.json({ message: 'Reply deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = replyController;
