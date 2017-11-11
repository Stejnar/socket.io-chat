import React from "react";
import {Router, Route} from 'react-router-dom';

import Login from "./components/login/Login";
import Chat from "./components/chat/Chat";
import SelectAvatar from "./components/avatars/SelectAvatar";
import Users from "./components/users/Users";
import {connect} from "react-redux";
import SCREEN from "./constants";
import {createMemoryHistory} from "history";

const memoryHistory = createMemoryHistory();
const routes = [
    {
        path: '/',
        exact: true,
        sidebar: () => <SelectAvatar/>,
        main: () => <Login/>
    },
    {
        exact: true,
        path: '/chat',
        sidebar: () => <Users/>,
        main: () => <Chat/>
    },
    {
        exact: true,
        path: '/users',
        main: () => <Users/>
    },
    {
        exact: true,
        path: '/avatars',
        main: () => <SelectAvatar/>
    },
];

@connect((store) => {
    return {
        window: store.window,
    }
})
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.renderSidebar = this.renderSidebar.bind(this);
    }
    renderSidebar() {
        if (this.props.window.width > SCREEN.SMALL.MAX) {
            return (
                <div className='sidebar'>
                    {routes.map((route, index) => {
                        if (route.sidebar) {
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    component={route.sidebar}/>
                            );
                        }
                    })}
                </div>
            );
        }
    }

    render() {
        return (
            <Router history={memoryHistory}>
                <div className='wrapper'>
                    {this.renderSidebar()}
                    <div className='content'>
                        {routes.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                component={route.main}/>
                        ))}
                    </div>
                </div>
            </Router>
        );
    }
}





