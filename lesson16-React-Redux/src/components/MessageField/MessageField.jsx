import React, {Component} from 'react';
import './MessageField.scss';
import {Message} from '../Message/Message';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {updateDataSendMessage} from "../../actions/messageActions";

class MessageField extends Component {
    static propTypes = {
        chatId: PropTypes.number.isRequired,
        messages: PropTypes.object.isRequired,
        chats: PropTypes.object.isRequired,
        updateDataSendMessage: PropTypes.func.isRequired,

    };

    state = {
        inputText: '',
        disable: true
    };

    componentDidUpdate() {
        const {user, chatId, messages, updateDataSendMessage} = this.props;
        if ((Object.values(messages)[Object.values(messages).length - 1]).author !== 'robot') {
            setTimeout(() => {
                if ((Object.values(messages)[Object.values(messages).length - 1]).author !== 'robot') {
                    updateDataSendMessage('robot', `Dear ${user}, Я робот!`, chatId);
                }
            }, 1000);
        }
    }

    sendMessage = (e, text) => {
        e.preventDefault();
        const {chatId, user, updateDataSendMessage} = this.props;
        updateDataSendMessage(user, text, chatId);
        this.setState({
            inputText: '',
            disable: true
        });
    };

    sendKeyboardButtons = (e, text) => {
        if (e.shiftKey && e.keyCode === 13) {
            this.sendMessage(e, text);
        }
    };

    changeInputText = (e) => {
        this.setState({
            inputText: e.target.value,
            disable: false
        });
    };

    render() {
        const {chatId, chats, messages} = this.props;
        const messageElements = chats[chatId].messageList.map((messageId, index) => (
            <Message key={index} text={messages[messageId].text} author={messages[messageId].author}/>
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
                        onKeyDown={e => this.sendKeyboardButtons(e, this.state.inputText)}
                        value={this.state.inputText}/>
                    <Button
                        className="send-message"
                        variant="contained"
                        color="secondary"
                        onClick={e => this.sendMessage(e, this.state.inputText)}
                        disabled={this.state.disable}
                    >&gt;</Button>
                </form>
            </main>
        )
    }
}

const mapStateToProps = ({chatReducer}) => ({
    user: chatReducer.user,
    chats: chatReducer.chats,
    messages: chatReducer.messages
});
const mapDispatchToProps = dispatch => bindActionCreators({updateDataSendMessage}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(MessageField);