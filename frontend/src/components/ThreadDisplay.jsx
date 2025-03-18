import React from 'react';

function ThreadDisplay({ thread, onEdit, onDelete }) {
  return (
    <>
      <div className="thread-header">
        <h2>{thread.title}</h2>
        <div className="thread-meta">
          <span className="category">{thread.category}</span>
          <span className="author">Posted by: {thread.author}</span>
          <span className="date">
            Created: {new Date(thread.created_at).toLocaleString()}
          </span>
          {thread.updated_at !== thread.created_at && (
            <span className="date">
              Updated: {new Date(thread.updated_at).toLocaleString()}
            </span>
          )}
        </div>
      </div>

      <div className="thread-content">
        <p>{thread.content}</p>
      </div>

      <div className="thread-actions">
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </>
  );
}

export default ThreadDisplay;
