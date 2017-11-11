import React, {Component} from 'react';
import MessageList from "./MessageList";
import {connect} from "react-redux";
import Avatar from "../avatars/Avatar";
import {Link} from "react-router-dom";
import ChatNavigation from "../navigation/ChatNavigation";

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
    }

    renderSubmitButton() {
        return () => {
            let touched = false;
            const sendIcon = './res/icons/send.png';
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
                    <img className='icon' src={sendIcon}/>
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
        const SubmitButton = this.renderSubmitButton();
        return (
            <div className='chat'>
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
