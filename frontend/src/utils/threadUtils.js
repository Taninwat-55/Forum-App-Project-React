export const filterAndSortThreads = (threads, searchTerm, category, sortBy) => {
  let filteredThreads = [...threads];

  if (searchTerm) {
    filteredThreads = filteredThreads.filter(
      (thread) =>
        thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        thread.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (category) {
    filteredThreads = filteredThreads.filter(
      (thread) => thread.category === category
    );
  }

  if (sortBy === 'latest') {
    filteredThreads.sort(
      (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
    );
  } else if (sortBy === 'replies') {
    filteredThreads.sort((a, b) => {
      const repliesA = a.reply_count || 0;
      const repliesB = b.reply_count || 0;
      return repliesB - repliesA;
    });
  }

  return filteredThreads;
};
