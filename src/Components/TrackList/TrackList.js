import React from 'react';
import Track from './Track/Track';
import './TrackList.css';

class TrackList extends React.Component {
	render() {
		return (
			<div className="TrackList">
    			{this.props.tracks.map(track => 
    			<Track key={track.id} track={track} name={this.props.track.name} artist={this.props.track.artist} 
    			album={this.props.track.album}  onAdd={this.props.onAdd}/>
			</div>
		)
	}
}

export default TrackList;