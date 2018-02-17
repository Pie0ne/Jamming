const clientID = 'ef3ff6d4b61f4b26be597b55112afc9b';
const redirectUri = "http://localhost:3000/";
const spotifyUri = 'https://accounts.spotify.com/authorize?client_id=CLIENT_ID&response_type=token&scope=playlist-modify-public&redirect_uri=REDIRECT_URI';
const accesToken = '';

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);

    if (urlAccessToken && urlExpiresIn) {
      accessToken = urlAccessToken[1];
      expiresIn = urlExpiresIn[1];
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    } 

    else {
      window.location = spotifyUrl;
    }
  }

    search(term) {
    	const searchUrl = 'https://api.spotify.com/v1/search?type=track&q=${term.replace(' ', '%20')}';
    	return fetch(searchUrl, {
    		headers: {
    			Authorization: `Bearer ${accessToken}`
    		}
    	})
    	.then(response => response.json())
    	.then(jsonResponse => {
    		if (!jsonResponse.tacks)
    			return [];
    			return jsonResponse.tracks.items.map(track => {
    			return {
    				id: track.id,
    				name: track.name,
    				artist: track.artist[0].name,
    				album: track.album.name,
    				uri: track.uri
    				}
    			})
    		}
    	})  
  	},

export default Spotify;

