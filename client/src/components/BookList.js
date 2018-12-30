import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`;

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
            </div>
        );
    }
};

export default graphql(getBooksQuery)(BookList);