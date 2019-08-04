// importing modules
import React from 'react';
import PropTypes from 'prop-types';

const suggestionItem = props => (
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

suggestionItem.propTypes = {
    name: PropTypes.string,
    clearSuggestion: PropTypes.func,
    selectSearch: PropTypes.func
};

suggestionItem.defaultProps = {
    name: '',
    clearSuggestion: () => {},
    selectSearch: () => {}
};

export default suggestionItem;
