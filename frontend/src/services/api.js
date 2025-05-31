// const API_BASE_URL = 'http://localhost:3000/api';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const getThreads = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(`${API_BASE_URL}/threads?${queryString}`);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
};

export const getThread = async (id) => {
  const response = await fetch(`${API_BASE_URL}/threads/${id}`);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
};

export const createThread = async (threadData) => {
  const response = await fetch(`${API_BASE_URL}/threads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(threadData),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
};

export const updateThread = async (id, threadData) => {
  const response = await fetch(`${API_BASE_URL}/threads/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(threadData),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
};

export const deleteThread = async (id) => {
  const response = await fetch(`${API_BASE_URL}/threads/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
};

export const getReplies = async (threadId) => {
  const response = await fetch(`${API_BASE_URL}/replies/thread/${threadId}`);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
};

export const createReply = async (threadId, content) => {
  const response = await fetch(`${API_BASE_URL}/replies/thread/${threadId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
};

export const updateReply = async (id, content) => {
  const response = await fetch(`${API_BASE_URL}/replies/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
};

export const deleteReply = async (id) => {
  const response = await fetch(`${API_BASE_URL}/replies/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
};
