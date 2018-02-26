
import React, { Component } from 'react';
import Spotify from 'C:/Users/Pie0ne1/Desktop/ALL/Programowanie/CODECADEMY/projects/jamming/src/util/Spotify.js';
import SearchBar from 'C:/Users/Pie0ne1/Desktop/ALL/Programowanie/CODECADEMY/projects/jamming/src/Components/SearchBar/SearchBar';
import SearchResults from 'C:/Users/Pie0ne1/Desktop/ALL/Programowanie/CODECADEMY/projects/jamming/src/Components/SearchResults/SearchResults';
import Playlist from 'C:/Users/Pie0ne1/Desktop/ALL/Programowanie/CODECADEMY/projects/jamming/src/Components/Playlist/Playlist';
import './App.css';


//Spotify.getAccessToken();

class App extends Component {
  constructor(props) {
    super(props);

    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

    this.state = {
        searchResults: [],
        playlistName: 'New Playlist',
        playListTracks: [],
    };
  }

  search(term) {
      Spotify.search(term).then((tracks) => {
        this.setState({
          searchResults: tracks
        })
      })
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
      let trackUris = this.state.playlistTrack.map(track => track.uri);
      Spotify.savePlaylist(this.state.playlistName, trackUris);
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mm</span>ing</h1>
        <div className="App">
          <SearchBar 
            onSearch={this.search}
          />
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
