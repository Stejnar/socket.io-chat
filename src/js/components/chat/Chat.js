import React, {Component} from 'react';
import MessageList from "./MessageList";
import {connect} from "react-redux";
import ChatNavigation from "../navigation/ChatNavigation";
import EnableNotifications from "../notifications/EnableNotifications";
import SCREEN from "../../constants";

@connect((store) => {
    return {
        user: store.user,
        messages: store.messages,
        socket: store.client.socket,
        window: store.window,
    }
})
export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
        };
        this.renderSubmitButton = this.renderSubmitButton.bind(this);
        this.renderNotification = this.renderNotification.bind(this);
    }

    renderNotification() {
        if (this.props.window.width >= SCREEN.MEDIUM.MIN) {
            return () => null;
        } else return () => <EnableNotifications/>;
    }

    renderSubmitButton() {
        return () => {
            let touched = false;
            const sendMessage = (event) => {
                event.preventDefault();
                if (touched || this.state.input === '') {
                    return false;
                }
                touched = true;
                // broadcast message
                const send = this.props.socket.emitMessage({
                    from: this.props.user.name,
                    message: this.state.input,
                    date: new Date().getTime(),
                });
                if (send) {
                    // clear input
                    this.setState({input: ''});
                } else {
                    // show error message
                }
                return false;
            };
            return (
                <button
                    type='submit'
                    onTouchStart={sendMessage}
                    onClick={sendMessage}>
                    <i className="fa fa-paper-plane" aria-hidden="true"/>
                </button>
            );
        }
    }

    handleInput(event) {
        event.preventDefault();
        this.setState({
            input: event.target.value,
        });
    }

    render() {
        const Notification = this.renderNotification();
        const SubmitButton = this.renderSubmitButton();
        return (
            <div className='chat'>
                <Notification/>
                <ChatNavigation history={this.props.history}/>
                <MessageList/>
                <div className='footer'>
                    <form>
                        <SubmitButton/>
                        <div className='input'>
                            <input
                                placeholder='Send a message...'
                                onChange={this.handleInput.bind(this)}
                                value={this.state.input || ''}/>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
