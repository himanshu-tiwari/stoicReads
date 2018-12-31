import React, { Component } from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo';

// components
import BookList from './components/BookList';
import AddBook from './components/AddBook';

// apollo client setup
const client = new ApolloClient({
	uri: "http://localhost:4000/graphql"
});

class App extends Component {
	render() {
		return (
			<ApolloProvider client={client}>
				<div className="App container">
					<div className="row">
						<h3 className="center">StoicReads - A Classic Collection</h3>
						
						<div className="col s12">
							<BookList />
						</div>
					</div>
						
					<div className="row">
						<div className="col s12">
							<AddBook />
						</div>
					</div>
				</div>
			</ApolloProvider>
		);
	}
}

export default App;
