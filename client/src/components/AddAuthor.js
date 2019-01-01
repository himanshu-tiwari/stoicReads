import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { addAuthorMutation, getAuthorsQuery } from '../queries/queries';

class AddAuthor extends Component {
    state = {
        name : null,
        age : null
    };

    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.id] : e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addAuthorMutation({
            variables : {
                name : this.state.name,
                age : Number(this.state.age)
            },
            refetchQueries : [{ query : getAuthorsQuery }]
        });
    };

    render() {
        return(
            <form onSubmit={this.handleSubmit} className="white">
                <h5 className="black-text">Add Author</h5>

                <div className="input-field">
                    <label>Author Name</label>
                    <input id="name" type="text" onChange={this.handleChange} required />
                </div>

                <div className="input-field">
                    <label>Age</label>
                    <input id="age" type="number" min="0" max="100" onChange={this.handleChange} required />
                </div>

                <div className="input-field">
                    <button className="btn-floating waves-effect waves-light black z-depth-0">
                        <i className="material-icons">add</i>
                    </button>
                </div>
            </form>
        );
    }
}

export default graphql(addAuthorMutation, { name : 'addAuthorMutation' })(AddAuthor);