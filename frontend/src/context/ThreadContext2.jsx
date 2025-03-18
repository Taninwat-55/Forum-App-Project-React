import { createContext, useState, useContext, useEffect } from 'react';
import {
  getThreads,
  getThread,
  createThread as apiCreateThread,
  updateThread as apiUpdateThread,
} from '../services/api';

const ThreadContext = createContext();

export function useThreadContext() {
  return useContext(ThreadContext);
}

export function ThreadProvider({ children }) {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [authorName, setAuthorName] = useState('');

  useEffect(() => {
    const savedAuthor = localStorage.getItem('forumAuthorName');
    if (savedAuthor) {
      setAuthorName(savedAuthor);
    }
  }, []);

  useEffect(() => {
    if (authorName) {
      localStorage.setItem('forumAuthorName', authorName);
    }
  }, [authorName]);

  const fetchThreads = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getThreads();

      const threadsWithReplyCounts = await Promise.all(
        data.map(async (thread) => {
          try {
            const threadData = await getThread(thread.id);
            return {
              ...thread,
              reply_count: threadData.replies ? threadData.replies.length : 0,
            };
          } catch (err) {
            console.error(
              `Error fetching replies for thread ${thread.id}:`,
              err
            );
            return { ...thread, reply_count: 0 };
          }
        })
      );

      setThreads(threadsWithReplyCounts);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createThread = async (threadData) => {
    setLoading(true);
    try {
      const newThread = await apiCreateThread(threadData);
      await fetchThreads();
      return newThread;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateThread = async (id, threadData) => {
    setLoading(true);
    try {
      const updatedThread = await apiUpdateThread(id, threadData);
      await fetchThreads();
      return updatedThread;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetAuthorName = () => {
    setAuthorName('');
    localStorage.removeItem('forumAuthorName');
  };

  const value = {
    threads,
    loading,
    error,
    fetchThreads,
    createThread,
    updateThread,
    authorName,
    setAuthorName,
    resetAuthorName,
    setThreads,
  };

  return (
    <ThreadContext.Provider value={value}>{children}</ThreadContext.Provider>
  );
}

export { ThreadContext };
