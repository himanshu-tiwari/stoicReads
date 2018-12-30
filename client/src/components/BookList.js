import React from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

const BookList = (props) => {
    const { data } = props;

    if (data.loading) {
        return(
            <div>Loading Books...</div>
        );
    } else {
        const Books = data.books.map(book => <li key={ book.id }>{ book.name }</li>);
        return(
            <div>
                <ul id="book-list">
                    { Books }
                </ul>

                <BookDetails />
            </div>
        );
    }
};

export default graphql(getBooksQuery)(BookList);