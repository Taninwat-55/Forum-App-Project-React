const db = require('../database');

const threadController = {
  getAllThreads: (req, res) => {
    try {
      const threads = db
        .prepare('SELECT * FROM threads ORDER BY updated_at DESC')
        .all();
      res.json(threads);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getThreadById: (req, res) => {
    try {
      const { id } = req.params;
      const thread = db.prepare('SELECT * FROM threads WHERE id = ?').get(id);

      if (!thread) {
        return res.status(404).json({ error: 'Thread not found' });
      }

      const replies = db
        .prepare(
          'SELECT * FROM replies WHERE thread_id = ? ORDER BY created_at'
        )
        .all(id);

      res.json({ thread, replies });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createThread: (req, res) => {
    try {
      const { title, content, category, author } = req.body;

      if (!title || !content || !author) {
        return res
          .status(400)
          .json({ error: 'Title, content and author are required' });
      }

      const result = db
        .prepare(
          'INSERT INTO threads (title, content, category, author) VALUES (?, ?, ?, ?)'
        )
        .run(title, content, category || 'General', author);

      const newThread = db
        .prepare('SELECT * FROM threads WHERE id = ?')
        .get(result.lastInsertRowid);

      res.status(201).json(newThread);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateThread: (req, res) => {
    try {
      const { id } = req.params;
      const { title, content, category, author } = req.body;

      if (!title || !content || !author) {
        return res
          .status(400)
          .json({ error: 'Title, content and author are required' });
      }

      const thread = db.prepare('SELECT * FROM threads WHERE id = ?').get(id);
      if (!thread) {
        return res.status(404).json({ error: 'Thread not found' });
      }

      db.prepare(
        'UPDATE threads SET title = ?, content = ?, author = ?, category = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
      ).run(
        title,
        content,
        author || thread.author,
        category || thread.category,
        id
      );

      const updatedThread = db
        .prepare('SELECT * FROM threads WHERE id = ?')
        .get(id);

      res.json(updatedThread);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteThread: (req, res) => {
    try {
      const { id } = req.params;

      const thread = db.prepare('SELECT * FROM threads WHERE id = ?').get(id);
      if (!thread) {
        return res.status(404).json({ error: 'Thread not found' });
      }

      db.prepare('DELETE FROM threads WHERE id = ?').run(id);

      res.json({ message: 'Thread deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = threadController;
