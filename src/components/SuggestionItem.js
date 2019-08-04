// importing modules
import React from 'react';
import PropTypes from 'prop-types';

const SuggestionItem = props => (
    <React.Fragment>
        <li
          className="list__item"
          onClick={((e) => {
            props.selectSearch(e, props.name); // sets the suggestion input to the name
            props.clearSuggestion(); // clears the suggestions list
        })}
        >
        {props.name}

        </li>
    </React.Fragment>
);

export default SuggestionItem;
