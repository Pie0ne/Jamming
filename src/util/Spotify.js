const clientID = 'ef3ff6d4b61f4b26be597b55112afc9b';
const redirectUri = "http://localhost:3000/";
const spotifyUri = 'https://accounts.spotify.com/authorize?client_id=CLIENT_ID&response_type=token&scope=playlist-modify-public&redirect_uri=REDIRECT_URI';
let accesToken = undefined;
let expiresIn = undefined;

const Spotify = {
	getAccessToken() {
	    if (this.accessToken) {
	      return this.accessToken;
	    }

	    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
	    const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);

	    if (urlAccessToken && urlExpiresIn) {
	      this.accessToken = urlAccessToken[1];
	      this.expiresIn = urlExpiresIn[1];
	      window.setTimeout(() => this.accessToken = '', this.expiresIn * 1000);
	      window.history.pushState('Access Token', null, '/');
	    } 

	    else {
	      window.location = this.spotifyUrl;
	    }
	},

    search(term) {
	    const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${term.replace(' ', '%20')}`;
	    
	    return fetch(searchUrl, {
	        headers: {
	          Authorization: `Bearer ${this.accessToken}`
	        }
	      })
	      .then(response => response.json())
	      .then(jsonResponse => {
	        if (!jsonResponse.tracks) return [];
	        return jsonResponse.tracks.items.map(track => {
	          return {
	            id: track.id,
	            name: track.name,
	            artist: track.artists[0].name,
	            album: track.album.name,
	            uri: track.uri
	          }
	        })
	      });
	  },

	savePlaylist(name, trackUris) {
	  	if (!name || !trackUris || trackUris.length === 0) return;
	  	let usersUrl = 'https://api.spotify.com/v1/me';
	  	let headers = {
	  		Authorization: `Bearer ${this.accessToken}`
	  	}
	  	let usersId = undefined;
	  	let PlaylistId = undefined;

	  	fetch(this.userUrl, {
	      headers: headers 
	    })
	    .then(response => response.json())
	    .then(jsonResponse => this.userId = jsonResponse.id)
	    .then(() => {
	      const createPlaylistUrl = `https://api.spotify.com/v1/users/${this.userId}/playlists`;
	      fetch(createPlaylistUrl, {
	          method: 'POST',
	          headers: headers,
	          body: JSON.stringify({
	            name: name
	          })
	        })
	        .then(response => response.json())
	        .then(jsonResponse => this.playlistId = jsonResponse.id)
	        .then(() => {
	          	const addPlaylistTracksUrl = `https://api.spotify.com/v1/users/${this.userId}/playlists/${this.playlistId}/tracks`;
	          	fetch(addPlaylistTracksUrl, {
		            method: 'POST',
		            headers: headers,
		            body: JSON.stringify({
	              	uris: trackUris
            		})
          		});
        	})
    	})
  	}
} 

export default Spotify;

