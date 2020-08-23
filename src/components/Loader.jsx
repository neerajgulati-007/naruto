import React from 'react';

const Loader = ({url}) => {

  return (
    <div className="url-loader">
      <span className="label">Requesting:</span> 
      <span className="text">{url}</span>
    </div>
  );

};

export default Loader;