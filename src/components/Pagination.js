import React from 'react';

const pagination = ({queryParams, navigateToParams, lastPage}) => {
  
  const onClick = () => {
    const newQueryParams = { ...queryParams };
    newQueryParams.page = parseInt(newQueryParams.page) + 1;
    navigateToParams(newQueryParams);
  }
  if(queryParams.page && queryParams.page >= lastPage) {
    return null;
  }
  
  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        className="loadmore-btn"
      >
        Load More
    </button>
    </div>
  );

};

export default pagination;