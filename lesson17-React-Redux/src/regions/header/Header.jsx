import React, {Component} from 'react';
import './Header.scss';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {Link} from 'react-router-dom';
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";

class Header extends Component {

    render() {
        const {user, userSocialActivity} = this.props;
        return (
            <header className="header">
                <Link className="header__profile-link" to="/profile/">
                    <ListItemAvatar>
                        <Avatar>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={user} secondary={userSocialActivity}/><ListItemText/>
                </Link>
            </header>
        );
    }
}

const mapStateToProps = ({profileReducer}) => ({
    user: profileReducer.user,
    userSocialActivity: profileReducer.userSocialActivity
});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Header);