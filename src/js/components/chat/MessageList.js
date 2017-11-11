import * as React from "react";
import MessageListItem from "./MessageListItem";
import {connect} from "react-redux";

@connect((store) => {
    return {
        users: store.users,
        messages: store.messages,
        user: store.user,
    };
})
export default class MessageList extends React.Component {
    constructor(props) {
        super(props);
        this.getUser = this.getUser.bind(this);
        this.renderItem = this.renderItem.bind(this);
    }

    getUser(from) {
        if (from === this.props.user.name) {
            return this.props.user;
        } else if (from !== 'server') {
            return this.props.users.find((user) => {
                return user.name === from;
            });
        }
    }

    renderItem(message, index) {
        const user = this.getUser(message.from) || { name: null };
        const fromUser = message.from === this.props.user.name;
        return (
            <MessageListItem
                key={index}
                fromUser={fromUser}
                avatar={user.avatar}
                message={message}
                name={user.name}
            />
        );
    }

    render() {
        const list = this.props.messages.map((message, index) => {
            return this.renderItem(message, index);
        });
        return (
            <div className='message-list'>
                {list}
            </div>
        );
    }
}