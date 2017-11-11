import React from 'react';
import {getAvatarSource} from "./_locations";

export default class Avatar extends React.Component {
    render() {
        return (
            <div className='avatar-component'
                onClick={this.props.onClick}>
                <img className='icon' src={getAvatarSource(this.props.alias)}/>
            </div>
        );
    }
}
