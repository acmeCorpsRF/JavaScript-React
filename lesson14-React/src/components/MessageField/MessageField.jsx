import React, {Component} from 'react';
import './MessageField.scss';
import {Message} from '../Message/Message';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


export class MessageField extends Component {
    state = {
        user: 'Грета Тумблер',
        messages: [],
        inputText: ''
    };

    componentDidUpdate() {
        if (this.state.messages.length !== 0) {
            if ((this.state.messages[this.state.messages.length - 1]).hasOwnProperty('user')) {
                setTimeout(() => {
                    if ((this.state.messages[this.state.messages.length - 1]).hasOwnProperty('user')) {
                        this.setState({messages: [...this.state.messages, {robot: `Dear ${this.state.user}, Я робот!`}]});
                    }
                }, 300)
            }
        }
    }

    sendMessage = (e, text) => {
        e.preventDefault();
        this.setState({
            messages: [...this.state.messages, {user: `${this.state.user}: ${text}`}],
            inputText: ''
        });
    };

    sendKeyboardButtons = (e, text) => {
        if (e.shiftKey && e.keyCode === 13) {
            this.sendMessage(e, text);
        }
    };

    changeInputText = (e) => {
        this.setState({inputText: e.target.value});
    };

    render() {
        const messageElements = this.state.messages.map((message, index) =>
            <Message key={index} message={message}/>);
        return (
            <main className="main">
                <div className="output-field">
                    <ul className="messages-list">
                        {messageElements}
                    </ul>
                </div>
                <form action="">
                    <TextField
                        className="entry-field"
                        id="entry-field"
                        rowsMax={2}
                        label="Сообщение"
                        variant="outlined"
                        multiline
                        onChange={this.changeInputText}
                        onKeyDown={e => this.sendKeyboardButtons(e, this.state.inputText)}
                        value={this.state.inputText}/>
                    <Button
                        className="send-message"
                        variant="contained"
                        color="secondary"
                        onClick={e => this.sendMessage(e, this.state.inputText)}>&gt;</Button>
                </form>
            </main>
        )
    }
}
