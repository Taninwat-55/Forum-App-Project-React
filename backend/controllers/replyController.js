// const db = require('../database');

// // Get all replies for a thread
// const getRepliesByThreadId = (req, res) => {
//   try {
//     const { threadId } = req.params;
    
//     // Check if thread exists
//     const thread = db.prepare('SELECT * FROM threads WHERE id = ?').get(threadId);
//     if (!thread) {
//       return res.status(404).json({ error: "Thread not found" });
//     }
    
//     // Get replies
//     const replies = db.prepare('SELECT * FROM replies WHERE thread_id = ? ORDER BY created_at').all(threadId);
    
//     res.json(replies);
//   } catch (error) {
//     console.error("Error getting replies:", error);
//     res.status(500).json({ error: "Failed to retrieve replies" });
//   }
// };

// // Create a new reply
// const createReply = (req, res) => {
//   try {
//     const { threadId } = req.params;
//     const { content } = req.body;
    
//     // Validate input
//     if (!content) {
//       return res.status(400).json({ error: "Content is required" });
//     }
    
//     // Check if thread exists
//     const thread = db.prepare('SELECT * FROM threads WHERE id = ?').get(threadId);
//     if (!thread) {
//       return res.status(404).json({ error: "Thread not found" });
//     }
    
//     // Insert reply
//     const result = db.prepare(
//       'INSERT INTO replies (thread_id, content) VALUES (?, ?)'
//     ).run(threadId, content);
    
//     // Update thread's updated_at timestamp
//     db.prepare(
//       'UPDATE threads SET updated_at = CURRENT_TIMESTAMP WHERE id = ?'
//     ).run(threadId);
    
//     // Get the created reply
//     const reply = db.prepare('SELECT * FROM replies WHERE id = ?').get(result.lastInsertRowid);
    
//     res.status(201).json(reply);
//   } catch (error) {
//     console.error("Error creating reply:", error);
//     res.status(500).json({ error: "Failed to create reply" });
//   }
// };

// // Update a reply
// const updateReply = (req, res) => {
//   try {
//     const { id } = req.params;
//     const { content } = req.body;
    
//     // Validate input
//     if (!content) {
//       return res.status(400).json({ error: "Content is required" });
//     }
    
//     // Check if reply exists
//     const reply = db.prepare('SELECT * FROM replies WHERE id = ?').get(id);
//     if (!reply) {
//       return res.status(404).json({ error: "Reply not found" });
//     }
    
//     // Update reply
//     db.prepare(
//       'UPDATE replies SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
//     ).run(content, id);
    
//     // Update thread's updated_at timestamp
//     db.prepare(
//       'UPDATE threads SET updated_at = CURRENT_TIMESTAMP WHERE id = ?'
//     ).run(reply.thread_id);
    
//     // Get updated reply
//     const updatedReply = db.prepare('SELECT * FROM replies WHERE id = ?').get(id);
    
//     res.json(updatedReply);
//   } catch (error) {
//     console.error("Error updating reply:", error);
//     res.status(500).json({ error: "Failed to update reply" });
//   }
// };

// // Delete a reply
// const deleteReply = (req, res) => {
//   try {
//     const { id } = req.params;
    
//     // Check if reply exists
//     const reply = db.prepare('SELECT * FROM replies WHERE id = ?').get(id);
//     if (!reply) {
//       return res.status(404).json({ error: "Reply not found" });
//     }
    
//     // Delete reply
//     db.prepare('DELETE FROM replies WHERE id = ?').run(id);
    
//     res.json({ message: "Reply deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting reply:", error);
//     res.status(500).json({ error: "Failed to delete reply" });
//   }
// };

// module.exports = {
//   getRepliesByThreadId,
//   createReply,
//   updateReply,
//   deleteReply
// };