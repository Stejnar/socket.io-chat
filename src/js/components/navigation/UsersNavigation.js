
import * as React from "react";
import Navigation from "./Navigation";

export default class UsersNavigation extends React.Component {
    render() {
        return (
            <Navigation
                title='Users'
                history={this.props.history}
                backButton={true}/>
        );
    }
}