import * as React from "react";
import {Route} from "react-router-dom";

import {Routes} from '../../routes';
import SCREEN from "../../constants";

import EnableNotifications from "../notifications/EnableNotifications";

export default class Sidebar extends React.Component {
    render() {
        const {window} = this.props;
        if (window.width > SCREEN.SMALL.MAX) {
            return (
                <div className='sidebar'>
                    <div className='header'>
                        <EnableNotifications/>
                    </div>
                    <div className='body'>
                        {Routes.map((route, index) => {
                            if (route.sidebar) {
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        exact={route.exact}
                                        component={route.sidebar}/>
                                );
                            } else return null;
                        })}
                    </div>
                </div>
            );
        } else return null;
    }
}