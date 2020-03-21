import React, {Component} from 'react';
import './ChatList.scss';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {Link} from 'react-router-dom';
import ChatIcon from '@material-ui/icons/Chat';

export default class ChatList extends Component {

    componentDidMount() {
        const {url} = this.props;
        let list = document.getElementsByClassName('chatlist-link');
        for (let key of list) {
            let href = (key.href).slice(-url.length);
            if (href == url) {
                (key.closest('.chatlist').childNodes).forEach(node => node.classList.remove('chosen'));
                key.closest('.chatlist-item').classList.add('chosen');
            }
        }
    }

    render() {
        const {url} = this.props;
        let list = document.getElementsByClassName('chatlist-link');
        for (let key of list) {
            let href = (key.href).slice(-url.length);
            if (href == url) {
                (key.closest('.chatlist').childNodes).forEach(node => node.classList.remove('chosen'));
                key.closest('.chatlist-item').classList.add('chosen');
            }
        }

        // Как вот это ↑↑↑↑↑ впихнуть в это ↓↓↓↓↓

        const {chats} = this.props.state;
        const genItems = (Object.values(chats).map((chat, index) => (
            <ListItem className="chatlist-item" key={index}>
                <Link className="chatlist-link" to={chat.link}>
                    <ListItemAvatar>
                        <Avatar>
                            <ChatIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={chat.title} secondary={chat.messageList.length}/>
                </Link>
            </ListItem>
        )));
        return (
            <List className="chatlist" disablePadding={true}>
                {genItems}
            </List>
        );
    }
}