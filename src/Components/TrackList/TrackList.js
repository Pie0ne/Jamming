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
    			<Track key={track.id}
                       track={track}
                       onAdd={this.props.onAdd}
                       onRemove={this.props.onRemove}
                       isRemoval={this.props.isRemoval}
                       tracks={this.props.tracks}/>)}
    		</div> 
		)
	}
}

export default TrackList;