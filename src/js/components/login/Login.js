import React from "react";
import {connect} from "react-redux";

import {setUser} from "../../actions/userActions";
import Avatar from "../avatars/Avatar";
import {Link, withRouter} from "react-router-dom";
import SCREEN from "../../constants";

@connect((store) => {
    return {
        socket: store.client.socket,
        user: store.user,
        window: store.window,
    }
})
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.renderAvatar = this.renderAvatar.bind(this);
        this.renderSubmit = this.renderSubmit.bind(this);
    }

    handleInput(event) {
        event.preventDefault();
        this.props.dispatch(setUser({name: event.target.value}));
    }

    renderAvatar() {
        if (this.props.window.width > SCREEN.MEDIUM.MIN) {
            return () => (
                <Avatar alias={this.props.user.avatar}/>
            );
        } else {
            return withRouter(({history}) => (
                <div>
                    <h3>Choose an avatar</h3>
                    <a>
                        <Avatar
                            onClick={() => {
                                history.push('/avatars');
                            }}
                            alias={this.props.user.avatar}/>
                    </a>
                </div>
            ));
        }
    }

    renderSubmit() {
        return withRouter(({history}) => {
            const login = (event) => {
                event.preventDefault();
                // broadcast this user
                const send = this.props.socket.emitUser(this.props.user);
                if (send) {
                    // navigate
                    this.props.socket.fetchUsers();
                    history.push('/chat');
                } else {
                    // show error message
                }
                return false;
            };
            return (
                <button
                    className='navigate'
                    type='submit'
                    onTouchStart={login}
                    onClick={login}>
                    Let's Go
                </button>
            );
        });
    }

    render() {
        const Avatar = this.renderAvatar();
        const Submit = this.renderSubmit();
        return (
            <div className='login'>
                <form>
                    <Avatar/>
                    <h3>Enter your name</h3>
                    <input
                        autoFocus='true'
                        className='name-input'
                        placeholder='Jon Snow'
                        onChange={this.handleInput.bind(this)}
                        value={this.props.user.name}>
                    </input>
                    <Submit/>
                </form>
            </div>
        );
    }
}