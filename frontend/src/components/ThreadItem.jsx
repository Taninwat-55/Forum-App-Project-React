import { Link } from 'react-router-dom';

function ThreadItem({ thread }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="thread-item">
      <h3>
        <Link to={`/threads/${thread.id}`}>{thread.title}</Link>
      </h3>
      <p className="thread-excerpt">
        {thread.content.length > 150
          ? `${thread.content.substring(0, 150)}...`
          : thread.content}
      </p>
      <div className="thread-meta">
        <span className="category">{thread.category}</span>
        <span className="author">Posted By: {thread.author}</span>
        <span className="reply-count">Replies: {thread.reply_count || 0}</span>
        <span className="date">
          Last updated: {formatDate(thread.updated_at)}
        </span>
      </div>
    </div>
  );
}

export default ThreadItem;
