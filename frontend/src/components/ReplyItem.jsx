import { useState } from 'react';

function ReplyItem({ reply, refreshThread }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(reply.content);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this reply?')) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/replies/${reply.id}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete reply');
      }

      refreshThread();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editContent.trim()) {
      setError('Reply content cannot be empty');
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/replies/${reply.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: editContent,
            author: reply.author,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update reply');
      }

      refreshThread();

      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="reply-item">
      {error && <p className="error">{error}</p>}

      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows="4"
              required
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <p>{reply.content}</p>
          <div className="reply-meta">
            <span className="author">From: {reply.author}</span>
            <span className="date">
              {new Date(reply.created_at).toLocaleString()}
            </span>
            <div className="reply-actions">
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ReplyItem;
