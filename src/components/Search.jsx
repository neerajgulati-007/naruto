import React, { useState } from 'react';

const Search = ({ onSubmit, queryParams }) => {

	const [searchQuery, setSearchQuery] = useState('');

	const onFormSubmit= (e) => {
		const newQueryParams = {...queryParams};
		newQueryParams.search = searchQuery;  
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
			/>
		</form>
	);
};

export default Search;