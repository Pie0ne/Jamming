import React from 'react';
import Track from '../Track/Track';
import './TrackList.css';

class TrackList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		let tracks = this.props.tracks ? this.props.tracks : [];
		return (
			<div className="TrackList">
    			{tracks.map(track => 
    			<Track key={track.id} track={track} name={this.props.track.name} artist={this.props.track.artist} 
    			album={this.props.track.album}  onAdd={this.props.onAdd} onRemove={this.props.onRemove}/>)}
    		</div> 
		)
	}
}

export default TrackList;