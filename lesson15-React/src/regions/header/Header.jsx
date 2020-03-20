import React, {Component} from 'react';
import './Header.scss';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {Link} from 'react-router-dom';

export default class Header extends Component {

    render() {
        return (
            <header className="header">
                    <Link className="header__profile-link" to="/profile/">
                        <ListItemAvatar>
                            <Avatar>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Грета Тумблер" secondary="Активистка"/>
                    </Link>
            </header>
        );
    }
}