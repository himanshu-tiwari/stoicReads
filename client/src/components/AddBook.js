import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`;

class AddBook extends Component {
    handleChange = (e) => {
        console.log(e.target.value);
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.value);
    };

    displayAuthors = () => {
        const { data } = this.props;

        if (data.loading) {
            return(
                <option>Loading...</option>
            );
        } else {
            return data.authors.map(author => <option value={author.id} key={author.id}>{ author.name }</option>);
        }
    };

    render() {
        return(
            <div className="">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="black-text">Add Book</h5>

                    <div className="input-field">
                        <label>Book Name</label>
                        <input type="text" onChange={this.handleChange} />
                    </div>

                    <div className="input-field">
                        <label>Genre</label>
                        <input type="text" onChange={this.handleChange} />
                    </div>

                    <div className="input-field">
                        <select className="browser-default" onChange={this.handleChange} defaultValue=''>
                            <option disabled value=''>Select Author</option>
                            { this.displayAuthors() }
                        </select>
                    </div>

                    <div className="input-field">
                        <button className="btn-floating waves-effect waves-light black z-depth-0">
                            <i className="material-icons">add</i>
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default graphql(getAuthorsQuery)(AddBook);