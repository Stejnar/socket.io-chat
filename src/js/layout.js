import * as React from "react";
import ReactDOM from 'react-dom';

import {Provider} from "react-redux";
import {store} from "./store";
import SocketIOClient from "./components/chat/socket/SocketIOClient";
import {setSocket} from "./actions/usersActions";
import App from "./app";
import {setWindow} from "./actions/windowActions";

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
        const socket = new SocketIOClient(store);
        store.dispatch(setSocket(socket));
        // connect socket
        socket.connect();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
        store.dispatch(setSocket(null));
        SocketIOClient.disconnect();
    }

    updateDimensions() {
        store.dispatch(setWindow({
            width: window.innerWidth,
            height: window.innerHeight
        }));
    }

    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        );
    }
}

ReactDOM.render(<Layout/>, document.getElementById('root'));