import * as React from "react";

import {Routes} from "../../routes";
import {Route} from "react-router-dom";

export default class Content extends React.Component {
    render() {
        return (
            <div className='content'>
                {Routes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.main}/>
                ))}
            </div>
        );
    }
}