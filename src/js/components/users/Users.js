import React, {Component} from 'react';
import {connect} from "react-redux";
import UserList from "./UserList";
import UsersNavigation from "../navigation/UsersNavigation";

@connect((store) => {
    return {
        users: store.users,
        socket: store.client.socket,
        user: store.user,
        fetchingUsers: store.client.fetchingUsers,
    }
})
export default class Users extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.socket.fetchUsers();
    }

    render() {
        return (
            <div className='wrapper'>
                <UsersNavigation  history={this.props.history}/>
                <div className='users-component'>
                    <UserList users={this.props.users}/>
                </div>
            </div>
        );
    }
}