import * as React from "react";
import {connect} from "react-redux";
import UserListItem from "./UserListItem";

@connect((store) => {
    return {
        users: store.users,
    };
})
export default class UserList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const list = this.props.users.map((user, index) => {
            return <UserListItem name={user.name} avatar={user.avatar} key={index}/>
        });
        return (
            <div className='user-list'>
                {list}
            </div>
        );
    }
}