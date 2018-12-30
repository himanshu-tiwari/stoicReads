import React from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries';

const BookDetails = (props) => {
    return(
        <div id="book-details">
            <p>Book details</p>
        </div>
    );
};

export default graphql(getBookQuery)(BookDetails);