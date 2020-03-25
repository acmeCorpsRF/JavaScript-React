import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import Layout from './Layout';
import NotFound from '../components/404/';
import Profile from '../components/Profile/';

export default class Router extends Component {

    render() {
        return (
            <Switch>
                <Route exact path='/' component={Layout}/>
                <Route exact path='/chat/:chatId/' component={Layout}/>
                <Route exact path='/profile/' component={Profile}/>
                <Route component={NotFound}/>
            </Switch>

        )
    }
}

