// src/App.js
import React, { useState } from 'react';
import './App.css'; // Import the CSS file

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?title=${searchTerm}`
      );
      const data = await response.json();
      setBooks(data.docs.slice(0, 10)); // Display only the first 10 results
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-header">Book Finder</h1>

      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a book by title"
          className="search-input"
        />
        <button
          onClick={handleSearch}
          className="search-button"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      <div className="book-list">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book.key} className="book-card">
              <h2 className="book-title">{book.title}</h2>
              {book.author_name && (
                <p className="book-author">By: {book.author_name.join(', ')}</p>
              )}
              {book.first_publish_year && (
                <p className="book-publish-year">
                  Published in {book.first_publish_year}
                </p>
              )}
              {book.cover_i && (
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                  alt={book.title}
                  className="book-cover"
                />
              )}
            </div>
          ))
        ) : (
          <p className="no-results">
            {loading ? 'Loading...' : 'No results found'}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
