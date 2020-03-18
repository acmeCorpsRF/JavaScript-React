import React, {Component} from 'react';
import './App.scss';
import {Header} from '../regions/header/Header';
import {Aside} from '../regions/aside/Aside';
import {MessageField} from './MessageField/MessageField';


export default class App extends Component {

    render() {
        return (
            <div className="wrapper">
                <Header/>
                <Aside/>
                <MessageField/>
            </div>
        )
    }
}
