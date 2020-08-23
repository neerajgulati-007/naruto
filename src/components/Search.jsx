import React, { useState } from 'react';

const Search = ({ onSubmit, queryParams }) => {

  const [searchQuery, setSearchQuery] = useState(queryParams.query);

  const onFormSubmit = (e) => {
    const newQueryParams = { ...queryParams };
    newQueryParams.query = searchQuery;
    onSubmit(newQueryParams);
    e.preventDefault();
  }
  return (
    <form onSubmit={onFormSubmit}>
      <input
        type="text"
        id="animeName"
        name="animeName"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="input-style"
      />
      <button type="submit" className="search-btn">
        Go
      </button>
    </form>
  );
};

export default Search;