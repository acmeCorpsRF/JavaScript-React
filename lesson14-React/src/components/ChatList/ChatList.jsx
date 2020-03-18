import React, {Component} from 'react';
import './ChatList.scss';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

export default class ChatList extends Component {

    render() {
        return (
            <List className="chatlist" disablePadding={true}>
                <ListItem className="chatlist-item">
                    <ListItemAvatar>
                        <Avatar>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Chat 1" secondary="Jan 9, 2014"/>
                </ListItem>
                <ListItem className="chatlist-item">
                    <ListItemAvatar>
                        <Avatar>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Chat 2" secondary="Jan 7, 2014" />
                </ListItem>
                <ListItem className="chatlist-item">
                    <ListItemAvatar>
                        <Avatar>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Chat 3" secondary="July 20, 2014" />
                </ListItem>
                <ListItem className="chatlist-item">
                    <ListItemAvatar>
                        <Avatar>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Chat 4" secondary="July 20, 2014" />
                </ListItem>
                <ListItem className="chatlist-item">
                    <ListItemAvatar>
                        <Avatar>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Chat 5" secondary="July 20, 2014" />
                </ListItem>
            </List>
        )
    }
}