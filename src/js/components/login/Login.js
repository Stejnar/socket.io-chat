import React from "react";
import {connect} from "react-redux";

import {setUser} from "../../actions/userActions";
import Avatar from "../avatars/Avatar";
import {Link} from "react-router-dom";

@connect((store) => {
    return {
        socket: store.client.socket,
        user: store.user,
    }
})
export default class Login extends React.Component {
    navigate(event) {
        event.preventDefault();
        // broadcast this user
        const send = this.props.socket.emitUser(this.props.user);
        if (send) {
            // navigate
            this.props.socket.fetchUsers();
            this.props.history.push('/chat');
        } else {
            // show error message
        }
        return false;
    }

    handleInput(event) {
        event.preventDefault();
        this.props.dispatch(setUser({name: event.target.value}));
    }

    render() {
        return (
            <div className='login'>
                <form>
                    <h3>Enter your name</h3>
                    <input
                        className='name-input'
                        placeholder='Jon Snow'
                        onChange={this.handleInput.bind(this)}
                        value={this.props.user.name}>
                    </input>
                    <h3>Choose an avatar</h3>
                    <Link to='/avatars'>
                        <Avatar alias={this.props.user.avatar}/>
                    </Link>
                    <button
                        className='navigate'
                        type='submit'
                        onClick={this.navigate.bind(this)}>
                        Let's Go
                    </button>
                </form>
            </div>
        );
    }
}