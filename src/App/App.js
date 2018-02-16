import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state.searchResults = {
        name: '',
        artist: '',
        album: '',
    };
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            <Playlist />
          </div>
        </div>
      </div>
    );
  }
}

export default App
