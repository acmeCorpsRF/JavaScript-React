import React, {Component} from 'react';
import './MessageField.css';
import {Message} from "../Message/Message";


export class MessageField extends Component {
    state = {
        user: 'Грета Тумблер',
        messages: []
    };

    componentDidUpdate() {
        if ((this.state.messages[this.state.messages.length - 1]).hasOwnProperty('user')) {
            setTimeout(() => {
                this.setState({messages: [...this.state.messages, {robot: `Dear ${this.state.user}, Я робот!`}]});
            }, 1000)
        }
    }

    sendMessage = (e) => {
        e.preventDefault();
        let text2send = document.getElementById('entry-field').value;
        this.setState({messages: [...this.state.messages, {user: `${this.state.user}: ${text2send}`}]});
    };

    render() {
        const messageElements = this.state.messages.map((message, index) =>
            <Message key={index} message={message}/>);
        return (
            <form action="">
                <div className="output-field">
                    <ul className="messages-list">
                        {messageElements}
                    </ul>
                </div>
                <input id="entry-field" className="entry-field" type="text" placeholder="Сообщение"/>
                <button className="send-message" onClick={event => this.sendMessage(event)}>&gt;</button>
            </form>
        )
    }
}
