import React, {Component} from 'react';
import './ChatList.scss';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ChatIcon from '@material-ui/icons/Chat';
import classNames from 'classnames';
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {push} from 'connected-react-router';
import PropTypes from "prop-types";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {removeChat} from '../../actions/chatActions';

class ChatList extends Component {

    static propTypes = {
        chats: PropTypes.object.isRequired,
        push: PropTypes.func.isRequired,
        removeChat: PropTypes.func.isRequired
    };

    childrenCollection = (arr, thing) => {
        if (thing.children.length) {
            for (let i = 0; i < thing.children.length; i++) {
                arr.push(thing.children[i]);
                this.childrenCollection(arr, thing.children[i]);
            }
            return arr;
        }
    };

    setLocation = (e, link, index) => {
        let button = document.getElementsByClassName('delete-chat')[index],
            arrChildren = [button];
        this.childrenCollection(arrChildren, button);
        if (arrChildren.indexOf(e.target) == -1) this.props.push(link);
    };

    render() {
        const {chats, url, messages, removeChat} = this.props;
        if (Object.keys(chats).length == 0) {
            return (
                <List className="chatlist" disablePadding={true}>
                    <ListItem className="chatlist-item" key="no-chats">
                        <ListItemText primary="Добавьте новый чат..."/>
                    </ListItem>
                </List>
            );
        } else {
            const lastMessageId = Object.keys(messages)[Object.keys(messages).length - 1];
            const genItems = (Object.values(chats).map((chat, index) => {
                let blinking = false;
                chat.messageList.map(messageId => {
                    if (messageId == lastMessageId && messages[lastMessageId].author == 'robot') blinking = true;
                });
                let classes = classNames('chatlist-item', {chosen: url == chat.link}, {'just-arrived': blinking});
                return (
                    <ListItem className={classes} key={index} onClick={(e) => this.setLocation(e, chat.link, index)}>
                        <ListItemAvatar>
                            <Avatar>
                                <ChatIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={chat.title} secondary={chat.messageList.length}/>
                        <IconButton className="delete-chat" aria-label="delete" onClick={(e) => removeChat(e, chat)}>
                            <DeleteIcon fontSize="small"/>
                        </IconButton>
                    </ListItem>
                )
            }));
            return (
                <List className="chatlist" disablePadding={true}>
                    {genItems}
                </List>
            );
        }
    }
}

const mapStateToProps = ({chatReducer}) => ({
    chats: chatReducer.chats,
    messages: chatReducer.messages
});
const mapDispatchToProps = dispatch => bindActionCreators({push, removeChat}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ChatList);