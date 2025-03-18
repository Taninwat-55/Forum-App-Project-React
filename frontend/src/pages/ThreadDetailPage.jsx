import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReplyList from '../components/ReplyList';
import ReplyForm from '../components/ReplyForm';
import EditThreadForm from '../components/EditThreadForm';
import ThreadDisplay from '../components/ThreadDisplay';
import { getThread, updateThread, deleteThread } from '../services/api';

function ThreadDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [thread, setThread] = useState(null);
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchThread();
  }, [id]);

  const fetchThread = async () => {
    try {
      setLoading(true);
      const data = await getThread(id);
      setThread(data.thread);
      setReplies(data.replies);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this thread?')) {
      return;
    }

    try {
      await deleteThread(id);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      const updatedThread = await updateThread(id, updatedData);
      setThread(updatedThread);
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const addReply = (newReply) => {
    setReplies([...replies, newReply]);
  };

  if (loading) {
    return <p>Loading thread...</p>;
  }

  if (error) {
    return <p className="error">Error: {error}</p>;
  }

  if (!thread) {
    return <p>Thread not found</p>;
  }

  return (
    <div className="thread-detail-page">
      {isEditing ? (
        <EditThreadForm
          thread={thread}
          onUpdate={handleUpdate}
          onCancel={() => setIsEditing(false)}
          loading={loading}
        />
      ) : (
        <>
          <ThreadDisplay
            thread={thread}
            onEdit={() => setIsEditing(true)}
            onDelete={handleDelete}
          />

          <div className="replies-section">
            <h3>Replies</h3>
            <ReplyList
              replies={replies}
              threadId={thread.id}
              refreshThread={fetchThread}
            />
            <ReplyForm threadId={thread.id} onReplyAdded={addReply} />
          </div>
        </>
      )}
    </div>
  );
}

export default ThreadDetailPage;
