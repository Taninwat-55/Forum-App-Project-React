import ThreadItem from './ThreadItem';

function ThreadList({ threads }) {
  if (threads.length === 0) {
    return <p>No threads found.</p>;
  }

  return (
    <div className="thread-list">
      {threads.map((thread) => (
        <ThreadItem key={thread.id} thread={thread} />
      ))}
    </div>
  );
}

export default ThreadList;
