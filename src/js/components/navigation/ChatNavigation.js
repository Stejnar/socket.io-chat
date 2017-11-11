
import * as React from "react";
import Navigation from "./Navigation";

export default class ChatNavigation extends React.Component {
    render() {
        const usersIcon = './res/icons/users.png';
        const rightButtons = [{
            template: <img className='icon' src={usersIcon}/>,
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