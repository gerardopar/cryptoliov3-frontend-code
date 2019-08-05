// importing modules
import React from 'react';
import PropTypes from 'prop-types';

// importing components
import SuggestionItem from './SuggestionItem';

const suggestionList = props => (
    <div className="list__container">
    {
        props.suggestions.map((coin, index) => (
            <SuggestionItem
              selectSearch={props.selectSearch}
              clearSuggestion={props.clearSuggestion}
              name={coin.name} 
              key={index}
            />
        ))
    }
    </div>
);

suggestionList.propTypes = {
    suggestions: PropTypes.arrayOf(PropTypes.object),
    clearSuggestion: PropTypes.func,
    selectSearch: PropTypes.func,
};

suggestionList.defaultProps = {
    suggestions: [],
    clearSuggestion: () => {},
    selectSearch: () => {}
};

export default suggestionList;
