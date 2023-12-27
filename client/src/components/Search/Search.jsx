import React, {Fragment, useState} from 'react';
import {useNavigate} from "react-router-dom";

const Search = () => {

    const [Keyword, setKeyword] = useState()

    const navigate = useNavigate();
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (Keyword.trim()) {
            navigate(`/products/${Keyword}`);
        } else {
            navigate('/products');
        }
    }


    return (
        <Fragment>
            <form className="searchBox" onSubmit={searchSubmitHandler}>
                <input
                    type="text"
                    placeholder="Search a products ..."
                    onChange={(e) => setKeyword(e.target.value)}
                />

                <input type="submit" value="search"/>
            </form>
        </Fragment>
    );
};

export default Search;