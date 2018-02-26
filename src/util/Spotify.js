const clientID = 'ef3ff6d4b61f4b26be597b55112afc9b';
const redirectUri = "http://localhost:3000/";
const spotifyUri = 'https://accounts.spotify.com/authorize?response_type=token&scope=playlist-modify-public&client_id=${clientId}&redirect_uri=${redirectUri}';
let accesToken = undefined;
let expiresIn = undefined;

let Spotify = {
  getAccessToken() {
    if (this.accessToken) return this.accessToken

    let expirationTime
    if (window.location.href.match(/access_token=([^&]*)/)) {
      this.accessToken = window.location.href.match(/access_token=([^&]*)/)[1]
      expirationTime = window.location.href.match(/expires_in=([^&]*)/)[1]
    }

    if (this.accessToken && expirationTime) {
      window.setTimeout(() => {
        this.accessToken = undefined
      }, expirationTime * 1000)
      window.location.hash = ''
      return this.accessToken
    }

    return window.location.href = `https://accounts.spotify.com/authorize?client_id=${this.clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${this.redirectUri}`
  },

  search(term) {

    return new Promise((resolve, reject) => {

      this.accessToken = this.getAccessToken()

      fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        }
      }).then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Request Failed!')
      }, networkError => console.log(networkError.message)).then(jsonResponse => {
        let tracks = jsonResponse.tracks.items.map(track => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }
        })
        resolve(tracks)
      })

    })
  },

  savePlaylist(playlistName, trackURIs) {
    if (!playlistName || !trackURIs) return
    let userId, playlistId, headers = {
      Authorization: `Bearer ${this.accessToken}`
    }

    // Get user ID
    fetch('https://api.spotify.com/v1/me', { headers }).then(response => {
      if (response.ok) return response.json()
      throw new Error('Request Failed!')
    }, networkError => console.log(networkError.message)).then(jsonResponse => {
      userId = jsonResponse.id
      createPlaylist()
    })

    // Post for creating playlist
    function createPlaylist() {
      console.log('userId: ' + userId);
      fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: playlistName })
      }).then(response => {
        if (response.ok) return response.json()
        throw new Error('Request Failed!')
      }, networkError => console.log(networkError.message)).then(jsonResponse => {
        playlistId = jsonResponse.id
        savePlaylist()
      })
    }

    // Post for saving playlist
    function savePlaylist() {
      fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({uris: trackURIs})
      }).then(response => {
        if (response.ok) return response.json()
        throw new Error('Request Failed!')
      }, networkError => console.log(networkError.message)).then(jsonResponse => {
        playlistId = jsonResponse.snapshot_id
      })
    }

  }
}

export default Spotify;

