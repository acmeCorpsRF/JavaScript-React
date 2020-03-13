import React, {Component} from 'react';
import './App.css';
import {MessageField} from "./MessageField/MessageField";


export default class App extends Component {

    render() {
        return (
            <div className="wrapper">
                <MessageField/>
            </div>
        )
    }
}
