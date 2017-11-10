import React, {Component} from 'react';
import {connect} from "react-redux";

import avatars from './_locations';
import {setAvatar} from "../../actions/userActions";
import Avatar from "./Avatar";

@connect()
export default class SelectAvatar extends Component {
    render() {
        const rows = avatars.map((avatar, index) => {
            return (
                <a
                    key={index}
                    onClick={() => {
                    this.props.dispatch(setAvatar(avatar));
                    this.props.history.push('/');
                    }}>
                    <Avatar
                        alias={avatar.alias}/>
                </a>
            );
        });
        return (
            <div className='select-avatar-component'>{rows}</div>
        );
    }
}