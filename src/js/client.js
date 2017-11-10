import React from "react";
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {Provider} from "react-redux";
import {store} from "./store";

import SocketIOClient from "./components/chat/socket/SocketIOClient";
import {setSocket} from "./actions/usersActions";

import Login from "./components/login/Login";
import Chat from "./components/chat/Chat";
import SelectAvatar from "./components/avatars/SelectAvatar";
import Users from "./components/users/Users";

class App extends React.Component {
    componentDidMount() {
        const socket = new SocketIOClient(store);
        store.dispatch(setSocket(socket));
        // connect socket
        socket.connect();
    }

    componentWillUnmount() {
        store.dispatch(setSocket(null));
        SocketIOClient.disconnect();
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route path='/' exact component={Login}/>
                        <Route path='/chat' exact component={Chat}/>
                        <Route path='/avatars' exact component={SelectAvatar}/>
                        <Route path='/users' exact component={Users}/>
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));
