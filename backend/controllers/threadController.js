// const db = require('../database');

// // Get all threads
// const getAllThreads = (req, res) => {
//   try {
//     const { sort, category, search } = req.query;

//     let query = `
//       SELECT t.*, COUNT(r.id) as reply_count,
//       MAX(r.created_at) as latest_reply
//       FROM threads t
//       LEFT JOIN replies r ON t.id = r.thread_id
//     `;

//     const whereConditions = [];
//     const queryParams = [];

//     // Add category filter if provided
//     if (category) {
//       whereConditions.push('t.category = ?');
//       queryParams.push(category);
//     }

//     // Add search filter if provided
//     if (search) {
//       whereConditions.push('(t.title LIKE ? OR t.content LIKE ?)');
//       queryParams.push(`%${search}%`, `%${search}%`);
//     }

//     // Add WHERE clause if we have conditions
//     if (whereConditions.length > 0) {
//       query += ' WHERE ' + whereConditions.join(' AND ');
//     }

//     query += ' GROUP BY t.id';

//     // Add sorting
//     if (sort === 'replies') {
//       query += ' ORDER BY reply_count DESC';
//     } else {
//       // Default to latest activity
//       query += ' ORDER BY COALESCE(latest_reply, t.created_at) DESC';
//     }

//     const threads = db.prepare(query).all(...queryParams);

//     res.json(threads);
//   } catch (error) {
//     console.error('Error getting threads:', error);
//     res.status(500).json({ error: 'Failed to retrieve threads' });
//   }
// };

// // Get a single thread by ID
// const getThreadById = (req, res) => {
//   try {
//     const { id } = req.params;

//     // Get thread details
//     const thread = db.prepare('SELECT * FROM threads WHERE id = ?').get(id);

//     if (!thread) {
//       return res.status(404).json({ error: 'Thread not found' });
//     }

//     // Get replies for this thread
//     const replies = db
//       .prepare('SELECT * FROM replies WHERE thread_id = ? ORDER BY created_at')
//       .all(id);

//     // Include replies with thread
//     thread.replies = replies;

//     res.json(thread);
//   } catch (error) {
//     console.error('Error getting thread:', error);
//     res.status(500).json({ error: 'Failed to retrieve thread' });
//   }
// };

// // Create a new thread
// const createThread = (req, res) => {
//   try {
//     const { title, content, category } = req.body;

//     // Validate input
//     if (!title || !content || !category) {
//       return res
//         .status(400)
//         .json({ error: 'Title, content, and category are required' });
//     }

//     // Insert the new thread
//     const result = db
//       .prepare(
//         'INSERT INTO threads (title, content, category) VALUES (?, ?, ?)'
//       )
//       .run(title, content, category);

//     // Get the created thread
//     const thread = db
//       .prepare('SELECT * FROM threads WHERE id = ?')
//       .get(result.lastInsertRowid);

//     res.status(201).json(thread);
//   } catch (error) {
//     console.error('Error creating thread:', error);
//     res.status(500).json({ error: 'Failed to create thread' });
//   }
// };

// // Update a thread
// const updateThread = (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, content, category } = req.body;

//     // Validate input
//     if (!title && !content && !category) {
//       return res
//         .status(400)
//         .json({ error: 'At least one field must be provided' });
//     }

//     // Check if thread exists
//     const thread = db.prepare('SELECT * FROM threads WHERE id = ?').get(id);
//     if (!thread) {
//       return res.status(404).json({ error: 'Thread not found' });
//     }

//     // Update thread
//     db.prepare(
//       `
//       UPDATE threads 
//       SET title = COALESCE(?, title), 
//           content = COALESCE(?, content), 
//           category = COALESCE(?, category),
//           updated_at = CURRENT_TIMESTAMP
//       WHERE id = ?
//     `
//     ).run(title || null, content || null, category || null, id);

//     // Get updated thread
//     const updatedThread = db
//       .prepare('SELECT * FROM threads WHERE id = ?')
//       .get(id);

//     res.json(updatedThread);
//   } catch (error) {
//     console.error('Error updating thread:', error);
//     res.status(500).json({ error: 'Failed to update thread' });
//   }
// };

// // Delete a thread
// const deleteThread = (req, res) => {
//   try {
//     const { id } = req.params;

//     // Check if thread exists
//     const thread = db.prepare('SELECT * FROM threads WHERE id = ?').get(id);
//     if (!thread) {
//       return res.status(404).json({ error: 'Thread not found' });
//     }

//     // Delete thread (cascade will delete replies due to foreign key constraint)
//     db.prepare('DELETE FROM threads WHERE id = ?').run(id);

//     res.json({ message: 'Thread deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting thread:', error);
//     res.status(500).json({ error: 'Failed to delete thread' });
//   }
// };

// module.exports = {
//   getAllThreads,
//   getThreadById,
//   createThread,
//   updateThread,
//   deleteThread,
// };
