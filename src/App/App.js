import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);

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

    updatePlaylistName(name) {
      this.setState({
        playlistName: name
      });
    }

    savePlaylist() {
      const trackUris = this.state.playlistTrack.map(playlistTrack => playlistTrack.uri);
      Spotify.savePlaylist(this.state.playlistName, trackUris);
      this.setState({
          searchResults: [];
      });
      this.updatePlaylistName('My playlst');
      console.info(trackUris);
    }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}  onAdd={this.addTrack} />
            <Playlist 
            playlistName={this.state.playlistName} 
            playlistTracks={this.state.playlistTracks} 
            onRemove={this.removeTrack} 
            onNameChange={this.updatePlaylistName} 
            onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App
