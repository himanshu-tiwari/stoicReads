import React from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries';

const BookDetails = (props) => {
    const { book } = props.data;

    if (book && typeof(book) === "object") {
        return(
            <div id="book-details">
                <h4>{ book.name }</h4>
                <p><span className="genre card white black-text">{ book.genre }</span> <span className="author right"><i>- { book.author.name }</i></span></p>

                <br/>

                <h5>Other books by { book.author.name }:</h5>
                <ul className="other-books">
                    {
                        book.author.books.map(book => <li key={book.id}>{ book.name }</li>)
                    }
                </ul>
            </div>
        );
    } else {
        return(
            <div id="book-details">
                <h5>Click a book name to view more details...</h5>
            </div>
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