import React, {Component} from 'react';
import './Aside.scss';
import ChatList from '../../components/ChatList/ChatList';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

export default class Aside extends Component {

    addChat() {
        const {chatId, updateDataAddChat} = this.props;
        const {messages, chats} = this.props.state;
        const newChatId = Object.keys(chats).length + 1;
        const messageId = Object.keys(messages).length + 1;
        updateDataAddChat(chats, newChatId, chatId, messageId, messages);
    }

    render() {
        return (
            <aside className="aside">
                <ChatList state={this.props.state} url={this.props.url}/>
                <Button className="add-chat" variant="contained" color="primary" startIcon={<CloudUploadIcon/>}
                        onClick={this.addChat.bind(this)}>Добавить чат...</Button>
            </aside>
        );
    }
}