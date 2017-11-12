import * as React from "react";
import {setNotifications} from "../../actions/windowActions";
import {connect} from "react-redux";

@connect((store) => {
    return {
        asked: store.window.notifications.asked,
    }
})
export default class EnableNotifications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: true,
        };
    }

    componentDidMount() {
        if (!this.props.asked) {
            window.setTimeout(() => {
                switch (Notification.permission) {
                    case 'granted': {
                        this.setState({
                            hidden: true,
                        });
                        break;
                    }
                    case 'denied':
                    default: {
                        this.setState({
                            hidden: false,
                        });
                    }
                }
                this.props.dispatch(setNotifications({
                    asked: true,
                }));
            }, 3000);
        }
    }

    render() {
        const hidden = this.state.hidden && !this.props.asked ? 'hidden' : 'shown';
        return (
            <div className={'enable-notification ' + hidden}>
                <button onClick={() => {
                    Notification.requestPermission((permission) => {
                        this.props.dispatch(setNotifications({
                            permission: permission,
                        }));
                    });
                    this.setState({hidden: true});
                }}>
                    <i className="button-icon fa fa-bell-slash" aria-hidden="true"/>
                    <div>
                        <span className='button-title'>Do you want to get notified?</span><br/>
                        <span className='button-body'>Enable Desktop-Notifications</span>
                    </div>
                </button>
            </div>
        );
    }
}