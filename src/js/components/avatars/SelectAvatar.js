import React, {Component} from 'react';
import {connect} from "react-redux";

import avatars from './_locations';
import {setAvatar} from "../../actions/userActions";
import Avatar from "./Avatar";
import SCREEN from "../../constants";
import {withRouter} from "react-router-dom";

@connect((store) => {
    return {
        window: store.window,
    }
})
export default class SelectAvatar extends Component {
    constructor(props) {
        super(props);
        this.renderRows = this.renderRows.bind(this);
    }

    renderRows() {
        return withRouter(({history}) => {
            return avatars.map((avatar, index) => {
                return (
                    <a key={index}
                       onClick={() => {
                           this.props.dispatch(setAvatar(avatar));
                           if (this.props.window.width < SCREEN.MEDIUM.MIN) {
                               history.push('/');
                           }
                       }}>
                        <Avatar alias={avatar.alias}/>
                    </a>
                );
            });
        });
    }

    render() {
        const Rows = this.renderRows();
        return (
            <div className='select-avatar-component'>
                <h3 style={{textAlign: 'center'}}>Choose an avatar</h3>
                <Rows/>
            </div>
        );
    }
}