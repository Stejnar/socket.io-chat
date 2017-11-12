import * as React from "react";
import {Router} from "react-router-dom";
import {createMemoryHistory} from "history";

import {connect} from "react-redux";
import {store} from "../../store";
import SocketIOClient from "../chat/socket/SocketIOClient";

import {setSocket} from "../../actions/usersActions";
import {setWindow} from "../../actions/windowActions";

import Content from "./Content";
import Sidebar from "./Sidebar";

const memoryHistory = createMemoryHistory();

@connect((store) => {
    return {
        window: store.window,
    }
})
export default class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.updateDimensions = this.updateDimensions.bind(this);
        this.focusWindow = this.focusWindow.bind(this);
        this.blurWindow = this.blurWindow.bind(this);
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
        window.addEventListener('focus', this.focusWindow);
        window.addEventListener('blur', this.blurWindow);
        const socket = new SocketIOClient(store);
        store.dispatch(setSocket(socket));
        // connect socket
        socket.connect();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
        window.removeEventListener('focus', this.focusWindow);
        window.removeEventListener('blur', this.blurWindow);
        store.dispatch(setSocket(null));
        SocketIOClient.disconnect();
    }

    focusWindow() {
        store.dispatch(setWindow({isActive: true}));
    }

    blurWindow() {
        store.dispatch(setWindow({isActive: false,}));
    }

    updateDimensions() {
        store.dispatch(setWindow({
            width: window.innerWidth,
            height: window.innerHeight
        }));
    }

    render() {
        return (
            <Router history={memoryHistory}>
                <div className='wrapper'>
                    <Sidebar window={this.props.window}/>
                    <Content/>
                </div>
            </Router>
        );
    }
}