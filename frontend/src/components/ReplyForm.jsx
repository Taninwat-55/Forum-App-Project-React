import { useEffect, useState } from 'react';

function ReplyForm({ threadId, onReplyAdded }) {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [author, setAuthor] = useState('');

  // When page loads
  useEffect(() => {
    const savedAuthor = localStorage.getItem('forumAuthorName');
    if (savedAuthor) {
      setAuthor(savedAuthor);
    }
  }, []);

  // When author changes
  useEffect(() => {
    if (author) {
      localStorage.setItem('forumAuthorName', author);
    }
  }, [author]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      setError('Reply content is required');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:3000/api/replies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ thread_id: threadId, content, author }),
      });

      if (!response.ok) {
        throw new Error('Failed to add reply');
      }

      const newReply = await response.json();

      // Add reply to the list
      onReplyAdded(newReply);

      // Clear form
      setContent('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="reply-form">
      <h4>Add Reply</h4>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="replyAuthor">Author Name</label>
          <input
            type="text"
            id="replyAuthor"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your reply..."
            rows="4"
            required
          ></textarea>
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Reply'}
        </button>
      </form>
    </div>
  );
}

export default ReplyForm;
