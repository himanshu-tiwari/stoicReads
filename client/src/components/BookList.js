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
                <div className="row">
                    <div className="col m8 s12">
                        <ul id="book-list">
                            { Books }
                        </ul>
                    </div>

                    <div className="col m4 s12">
                        <BookDetails bookId={this.state.selected} />
                    </div>
                </div>
            );
        }
    }
};

export default graphql(getBooksQuery)(BookList);