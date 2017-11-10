import * as React from "react";
import Avatar from "../avatars/Avatar";

export default class MessageListItem extends React.Component {
    constructor(props) {
        super(props);
        this.alignment = this.alignment.bind(this);
        this.renderAvatar = this.renderAvatar.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
    }

    alignment() {

        if (this.props.message.from === this.props.user.name) {
            return 'right';
        } else if (this.props.message.from === 'server') {
            return 'center';
        } else {
            return 'left';
        }
    }

    renderAvatar(from) {
        if (from !== 'server') {
            return (
                <div className='avatar'>
                    <Avatar alias={this.props.user.avatar}/>
                </div>
            );
        }
    }

    renderFooter(from) {
        if (this.props.message.from !== 'server') {
            return (
                <div className='footer'>
                    <span>{from}, {convertDate(this.props.message.date)}</span>
                </div>
            );
        }
    }

    render() {
        const from = this.props.message.from === this.props.user.name ? 'You' : this.props.message.from;
        return (
            <div className={'message-list-item ' + this.alignment()}>
                {this.renderAvatar(from)}
                <div className='body'>
                    <div className='message'>
                        {this.props.message.message}
                    </div>
                    {this.renderFooter(from)}
                </div>
            </div>
        );
    }
}

function convertDate(data) {
    if (data) {
        const date = new Date(data);
        return (
            date.getDate() +
            '.' + (date.getMonth() + 1) +
            '. ' + date.getHours() +
            ':' + date.getMinutes()
        );
    }
}