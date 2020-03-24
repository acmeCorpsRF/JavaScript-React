import React, {Component} from 'react';
import './App.scss';
import {BrowserRouter} from 'react-router-dom';
import Router from './common/Router';
import {Provider} from 'react-redux';
import initStore from './utils/store';

export default class App extends Component {

    render() {
        return (
            <Provider store={initStore()}>
                <BrowserRouter>
                    <Router/>
                </BrowserRouter>
            </Provider>
        )
    }
}
