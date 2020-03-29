import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import Layout from './Layout';
import NotFound from '../components/404/';
import Profile from '../containers/Profile/Profile';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {profileLoad} from "../actions/profileActions";

class Router extends Component {

    static propTypes = {
        chats: PropTypes.object.isRequired,
        profileLoad: PropTypes.func.isRequired
    };

    render() {
        const {chats, profileLoad} = this.props;
        profileLoad();
        if (Object.keys(chats).length == 0) {
            return (
                <Switch>
                    <Route exact path='/' component={Layout}/>
                    <Route exact path='/profile/' component={Profile}/>
                    <Route component={NotFound}/>
                </Switch>
            );
        } else {
            return (
                <Switch>
                    <Route exact path='/' component={Layout}/>
                    <Route exact path='/chat/:chatId/' component={Layout}/>
                    <Route exact path='/profile/' component={Profile}/>
                    <Route component={NotFound}/>
                </Switch>
            );
        }
    }
}

const mapStateToProps = ({chatReducer}) => ({
    chats: chatReducer.chats
});
const mapDispatchToProps = dispatch => bindActionCreators({profileLoad}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Router);

