import React, {Component} from 'react';
import Avatar from "../avatars/Avatar";

export default class UserListItem extends Component {
    render() {
        return (
            <div className='user-list-item'>
                <Avatar alias={this.props.avatar}/>
                <div className='body'><span>{this.props.name}</span></div>
            </div>
        );
    }
}
const styles = {
    container: {
        minWidth: 100,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        flexDirection: 'row',
        flex: 1,
        padding: 10,
        paddingLeft: 20,
    },
    avatar: {
        alignSelf: 'flex-start',
    },
    name: {
        paddingLeft: 20,
        textAlignVertical: 'center',
        fontSize: 16,
    },
};