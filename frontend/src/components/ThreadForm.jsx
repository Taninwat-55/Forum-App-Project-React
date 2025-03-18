import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThreadContext } from '../context/ThreadContext2';
import { THREAD_CATEGORIES } from '../constants';
import { validateThreadForm } from '../utils/formValidation';

function ThreadForm({ initialValues = null }) {
  const navigate = useNavigate();
  const {
    createThread,
    updateThread,
    authorName,
    setAuthorName,
    resetAuthorName,
  } = useContext(ThreadContext);

  const [title, setTitle] = useState(initialValues ? initialValues.title : '');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState(
    initialValues ? initialValues.content : ''
  );
  const [category, setCategory] = useState(
    initialValues ? initialValues.category : 'General'
  );
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialValues) {
      setAuthor(initialValues.author);
    } else if (authorName) {
      setAuthor(authorName);
    } else {
      const savedAuthor = localStorage.getItem('forumAuthorName');
      if (savedAuthor) {
        setAuthor(savedAuthor);
      }
    }
  }, [initialValues, authorName]);

  useEffect(() => {
    if (author && author !== authorName) {
      setAuthorName(author);
    }
  }, [author, setAuthorName, authorName]);

  const validateForm = () => {
    const newErrors = validateThreadForm(title, content, author);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (initialValues) {
        const updatedThread = await updateThread(initialValues.id, {
          title,
          content,
          category,
          author,
        });

        if (updatedThread) {
          navigate(`/threads/${updatedThread.id}`);
        }
      } else {
        const newThread = await createThread({
          title,
          content,
          category,
          author,
        });

        if (newThread) {
          setTitle('');
          setContent('');
          setCategory('General');
          resetAuthorName();
          navigate(`/threads/${newThread.id}`);
        }
      }
    } catch (error) {
      console.error('Error submitting thread:', error);
      setErrors({ submit: 'Failed to submit thread. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="thread-form-container">
      <h2>{initialValues ? 'Edit Thread' : 'Create New Thread'}</h2>

      <form onSubmit={handleSubmit} className="thread-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter thread title"
            className={errors.title ? 'error' : ''}
          />
          {errors.title && (
            <span className="error-message">{errors.title}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {THREAD_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your thread content here..."
            className={errors.content ? 'error' : ''}
            rows="6"
          ></textarea>
          {errors.content && (
            <span className="error-message">{errors.content}</span>
          )}
        </div>

        {errors.submit && <div className="error-message">{errors.submit}</div>}

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="cancel-btn"
          >
            Cancel
          </button>
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting
              ? 'Submitting...'
              : initialValues
              ? 'Update Thread'
              : 'Create Thread'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ThreadForm;
