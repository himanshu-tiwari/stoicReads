import React, { Component } from 'react';

// components
import BookList from './components/BookList';

class App extends Component {
	render() {
		return (
			<div className="App">
				<h3>StoicReads - A Sacred Collection</h3>

				<BookList />
			</div>
		);
	}
}

export default App;
