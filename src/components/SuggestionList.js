// importing modules
import React from 'react';

// importing components
import SuggestionItem from './SuggestionItem';

const SuggestionList = props => (
    <div className="list__container">
    {
        props.suggestions.map((lang, index) => (
            <SuggestionItem
              selectSearch={props.selectSearch}
              clearSuggestion={props.clearSuggestion}
              name={lang.name} 
              key={index}
            />
        ))
    }
    </div>
);

export default SuggestionList;
