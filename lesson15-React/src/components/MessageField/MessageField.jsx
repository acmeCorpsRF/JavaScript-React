import React, {Component} from 'react';
import './MessageField.scss';
import {Message} from '../Message/Message';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


export class MessageField extends Component {
    state = {
        disable: true
    };

    componentDidUpdate() {
        const {user, messages, chats} = this.props.state;
        const {chatId, updateDataSendMessage} = this.props;
        const messageId = Object.keys(messages).length + 1;
        if ((Object.values(messages)[Object.values(messages).length - 1]).author !== 'robot') {
            setTimeout(() => {
                if ((Object.values(messages)[Object.values(messages).length - 1]).author !== 'robot') {
                    updateDataSendMessage(messages, messageId, 'robot', `Dear ${user}, Я робот!`, chats, chatId);
                }
            }, 1000);
        }
    }

    sendMessage = (e, text) => {
        e.preventDefault();
        const {chatId, updateDataSendMessage} = this.props;
        const {user, messages, chats} = this.props.state;
        const messageId = Object.keys(messages).length + 1;
        updateDataSendMessage(messages, messageId, user, text, chats, chatId, '');
        this.setState({
            disable: true
        });
    };

    sendKeyboardButtons = (e, text) => {
        if (e.shiftKey && e.keyCode === 13) {
            this.sendMessage(e, text);
        }
    };

    changeInputText = (e) => {
        const {updateDataChangeInputText} = this.props;
        updateDataChangeInputText(e.target.value);
        this.setState({
            disable: false
        });
    };

    render() {
        const {chatId} = this.props;
        const {messages, inputText, chats} = this.props.state;
        const messageElements = chats[chatId].messageList.map((messageId, index) => (
            <Message key={index}
                     text={messages[messageId].text}
                     author={messages[messageId].author}
            />
        ));
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
                        onKeyDown={e => this.sendKeyboardButtons(e, inputText)}
                        value={inputText}/>
                    <Button
                        className="send-message"
                        variant="contained"
                        color="secondary"
                        onClick={e => this.sendMessage(e, inputText)}
                        disabled={this.state.disable} //Если это закомментировать, то видно баг с видео...
                    >&gt;</Button>
                </form>
            </main>
        )
    }
}
