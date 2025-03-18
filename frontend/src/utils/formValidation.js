export const validateThreadForm = (title, content, author) => {
  const errors = {};
  
  if (!title.trim()) {
    errors.title = 'Title is required';
  } else if (title.length < 3) {
    errors.title = 'Title must be at least 3 characters';
  }
  
  if (!content.trim()) {
    errors.content = 'Content is required';
  } else if (content.length < 10) {
    errors.content = 'Content must be at least 10 characters';
  }
  
  if (!author.trim()) {
    errors.author = 'Author is required';
  }
  
  return errors;
};