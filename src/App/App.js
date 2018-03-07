import React from 'react';
import Spotify from 'C:/Users/Pie0ne1/Desktop/ALL/Programowanie/CODECADEMY/projects/jamming/src/util/Spotify.js';
import SearchBar from 'C:/Users/Pie0ne1/Desktop/ALL/Programowanie/CODECADEMY/projects/jamming/src/Components/SearchBar/SearchBar';
import SearchResults from 'C:/Users/Pie0ne1/Desktop/ALL/Programowanie/CODECADEMY/projects/jamming/src/Components/SearchResults/SearchResults';
import Playlist from 'C:/Users/Pie0ne1/Desktop/ALL/Programowanie/CODECADEMY/projects/jamming/src/Components/Playlist/Playlist';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        searchResults: [],
        playlistName: 'New Playlist',
        playlistTracks: [],
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);   
  }

  addTrack(track) {
    if (!this.state.playlistTracks.find(tracks => tracks.id === track.id)) {
      this.state.playlistTracks.push(track);
      this.setState({
        playlistTracks: this.state.playlistTracks
      });
    }
  }

  removeTrack(track) {
    let removeTrack = this.state.playlistTracks.filter(Track => Track.id !== track.id);
    this.setState({
      playlistTracks: removeTrack
    });
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({ searchResults: searchResults })
    });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing !</h1>
        <div className="App">
          <SearchBar 
            onSearch={this.search}
          />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}  onAdd={this.addTrack}   onRemove={this.removeTrack}/>
            <Playlist 
                playlistName={this.state.playlistName} 
                playlistTracks={this.state.playlistTracks} 
                onRemove={this.removeTrack} 
                onNameChange={this.updatePlaylistName}  
                onSave={this.savePlaylist}
                onAdd={this.addTrack}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App
