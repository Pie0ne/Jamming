import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.removeTrack = this.removeTrack.bind(this);
    this.state.searchResults = {
        name: '',
        artist: '',
        album: '',
        playlistName: '',
        playListTracks: [{}],
    };
  }

    addTrack(track) {
      if (!this.state.playlistTracks.find(playlistTrack => playlistTrack.id === track.id)) {
        this.setState(prevState => ({
        playlistTracks: [...prevState.playlistTracks, track] 
        }));
      }
    }

    removeTrack(track) {
      this.setState({
        playlistTracks: this.state.playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id)
      });
    }


  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}  onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playistTracks={this.state.playlistTracks} 
            onRemove={this.removeTrack}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App
