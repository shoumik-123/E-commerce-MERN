import React from 'react';
import MetaData from "../components/Layout/MetaData.jsx";
import Search from "../components/Search/Search.jsx";

const SearchPage = () => {
    return (
        <div>
            <MetaData title="Search"/>
            <Search/>
        </div>
    );
};

export default SearchPage;