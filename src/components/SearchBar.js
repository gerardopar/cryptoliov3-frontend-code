import React from 'react';

import SuggestionList from './SuggestionList';

const SearchBar = (props) => {
    return (
        <div className="searchbar z-depth-5">
            <form onSubmit={props.handleCoinSearch} className="form">
                <div className="form__input--wrap">
                    <input 
                        onChange={props.getUserInput}
                        value={props.search}
                        className="form__input" 
                        type="text"  
                        placeholder="example: BTC" 
                        name="coinSearched" 
                        autoComplete="off"
                    />
                    {
                        props.suggestions.length !== 0 ? 
                        
                        <SuggestionList
                        suggestions={props.suggestions}
                        selectSearch={props.selectSearch}
                        clearSuggestion={props.clearSuggestion}
                        
                    /> : null
                    }
                </div>
                <button type="submit" className="material-icons btn-small waves-effect waves-light indigo lighten-1 form__btn">search</button>
            </form>
        </div>
    );
};

export default SearchBar;