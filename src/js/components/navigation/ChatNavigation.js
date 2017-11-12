
import * as React from "react";
import Navigation from "./Navigation";

export default class ChatNavigation extends React.Component {
    render() {
        const rightButtons = [{
            template: <i className="fa fa-users" aria-hidden="true"/>,
            listener: (event, history) => {
                event.preventDefault();
                history.push('/users');
                return false;
            }
        }];
        return (
            <Navigation
                title='Chat'
                backButton={false}
                rightButtons={rightButtons}/>
        );
    }
}