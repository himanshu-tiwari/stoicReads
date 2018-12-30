import React from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries';

const BookDetails = (props) => {
    const { book } = props.data;

    if (book && typeof(book) === "object") {
        return(
            <div id="book-details">
                <h4>{ book.name }</h4>
                <p>{ book.genre }</p>
                <p>{ book.author.name }</p>
                <p>All books by { book.author.name }:</p>
                <ul className="other-books">
                    {
                        book.author.books.map(book => <li key={book.id}>{ book.name }</li>)
                    }
                </ul>
            </div>
        );
    } else {
        return(
            <div id="book-details">No book selected...</div>
        );
    }
};

export default graphql(getBookQuery, {
    options : props => {
        return {
            variables : {
                id : props.bookId
            }
        }
    }
})(BookDetails);