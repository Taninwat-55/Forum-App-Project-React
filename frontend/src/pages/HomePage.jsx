import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useThreadContext } from '../context/ThreadContext2';
import ThreadList from '../components/ThreadList';
import { filterAndSortThreads } from '../utils/threadUtils';

function HomePage() {
  const { threads, loading, error, fetchThreads } = useThreadContext();
  const [sortBy, setSortBy] = useState('latest');
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchThreads();
  }, []);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const filterThreads = () => {
    return filterAndSortThreads(threads, searchTerm, category, sortBy);
  };

  const getUniqueCategories = () => {
    const allCategories = [
      '',
      'General',
      'Technology',
      'Gaming',
      'Travel',
      'Sports',
      'Education',
      'Economics',
      'Entertainment',
      'Health',
      'Politics',
    ];
    const usedCategories = threads.map((thread) => thread.category);
    return [...new Set([...allCategories, ...usedCategories])];
  };

  return (
    <div className="home-page">
      <div className="filters">
        <input
          type="text"
          placeholder="Search threads..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />

        <select
          value={category}
          onChange={handleCategoryChange}
          className="category-select"
        >
          <option value="">All Categories</option>
          {getUniqueCategories().map(
            (cat) =>
              cat && (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              )
          )}
        </select>

        <select
          value={sortBy}
          onChange={handleSortChange}
          className="sort-select"
        >
          <option value="latest">Latest Activity</option>
          <option value="replies">Most Replies</option>
        </select>
      </div>

      <div className="create-thread">
        <Link to="/new-thread" className="btn">
          Create New Thread
        </Link>
      </div>

      {loading ? (
        <p>Loading threads...</p>
      ) : error ? (
        <p className="error">Error: {error}</p>
      ) : (
        <ThreadList threads={filterThreads()} />
      )}
    </div>
  );
}

export default HomePage;
