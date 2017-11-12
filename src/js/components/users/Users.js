import React, {Component} from 'react';
import {connect} from "react-redux";
import UserList from "./UserList";
import UsersNavigation from "../navigation/UsersNavigation";
import SCREEN from "../../constants";

@connect((store) => {
    return {
        users: store.users,
        socket: store.client.socket,
        user: store.user,
        fetchingUsers: store.client.fetchingUsers,
        window: store.window,
    }
})
export default class Users extends Component {
    constructor(props) {
        super(props);
        this.renderTitle = this.renderTitle.bind(this);
    }

    componentDidMount() {
        this.props.socket.fetchUsers();
    }

    renderTitle() {
        if (this.props.window.width >= SCREEN.MEDIUM.MIN) {
            return () => (
                <h3 style={{textAlign: 'center'}}>People</h3>
            );
        }
        return () => { return null; };
    }

    render() {
        const Title = this.renderTitle();
        return (
            <div className='users-component'>
                <UsersNavigation  history={this.props.history}/>
                <Title/>
                <UserList users={this.props.users}/>
            </div>
        );
    }
}