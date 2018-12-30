import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getAuthorsQuery } from '../queries/queries';

class AddBook extends Component {
    state = {
        name : '',
        genre : '',
        authorId : ''
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
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
                        <input id="name" type="text" onChange={this.handleChange} />
                    </div>

                    <div className="input-field">
                        <label>Genre</label>
                        <input id="genre" type="text" onChange={this.handleChange} />
                    </div>

                    <div className="input-field">
                        <select id="authorId" className="browser-default" onChange={this.handleChange} defaultValue=''>
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