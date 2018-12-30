import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

class BookList extends Component {
    state = {
        selected : null
    };

    handleClick = (e) => {
        this.setState({
            selected : e.target.id
        });
    };

    render() {
        const { data } = this.props;

        if (data.loading) {
            return(
                <div>Loading Books...</div>
            );
        } else {
            const Books = data.books.map(book => <li key={book.id} id={book.id} onClick={this.handleClick}>{ book.name }</li>);
            return(
                <div>
                    <ul id="book-list">
                        { Books }
                    </ul>

                    <BookDetails bookId={this.state.selected} />
                </div>
            );
        }
    }
};

export default graphql(getBooksQuery)(BookList);