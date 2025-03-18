import ReplyItem from './ReplyItem';

function ReplyList({ replies, threadId, refreshThread }) {
  if (replies.length === 0) {
    return <p>No replies yet.</p>;
  }

  return (
    <div className="reply-list">
      {replies.map((reply) => (
        <ReplyItem
          key={reply.id}
          reply={reply}
          threadId={threadId}
          refreshThread={refreshThread}
        />
      ))}
    </div>
  );
}

export default ReplyList;
