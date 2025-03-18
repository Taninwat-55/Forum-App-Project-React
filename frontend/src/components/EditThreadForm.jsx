import React, { useState } from 'react';
import { THREAD_CATEGORIES } from '../constants';

function EditThreadForm({ thread, onUpdate, onCancel, loading = false }) {
  const [title, setTitle] = useState(thread.title);
  const [content, setContent] = useState(thread.content);
  const [category, setCategory] = useState(thread.category);
  const [author, setAuthor] = useState(thread.author);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await onUpdate({
        title,
        content,
        category,
        author
      });
    } catch (err) {
      setError(err.message);
    }
  };
  
  return (
    <div className="edit-thread">
      <h2>Edit Thread</h2>
      {error && <p className="error">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="editTitle">Title</label>
          <input
            type="text"
            id="editTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="editAuthor">Author</label>
          <input
            type="text"
            id="editAuthor"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="editCategory">Category</label>
          <select
            id="editCategory"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {THREAD_CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="editContent">Content</label>
          <textarea
            id="editContent"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="10"
            required
          ></textarea>
        </div>
        
        <div className="form-actions">
          <button type="submit" disabled={loading}>Save Changes</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default EditThreadForm;