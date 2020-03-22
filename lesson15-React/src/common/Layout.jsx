import React, {Component} from 'react';
import Header from '../regions/header/Header';
import Aside from '../regions/aside/Aside';
import {MessageField} from '../components/MessageField/MessageField';

export default class Layout extends Component {
    state = {
        user: 'Грета Тумблер',
        messages: {
            1: {author: 'robot', text: 'Это чат №1.'},
            2: {author: 'robot', text: 'Это чат №2.'},
            3: {author: 'robot', text: 'Это чат №3.'},
            4: {author: 'robot', text: 'Это чат №4.'},
            5: {author: 'robot', text: 'Это чат №5.'}
        },
        chats: {
            1: {title: 'Chat 1', messageList: [1], link: '/chat/1'},
            2: {title: 'Chat 2', messageList: [2], link: '/chat/2'},
            3: {title: 'Chat 3', messageList: [3], link: '/chat/3'},
            4: {title: 'Chat 4', messageList: [4], link: '/chat/4'},
            5: {title: 'Chat 5', messageList: [5], link: '/chat/5'}
        }
    };

    static defaultProps = {
        chatId: 1,
    };

    // updateDataSendMessage = (messageId, sender, senderText, chatId) => {
    //     const {messages, chats} = this.state;
    //     this.setState({
    //         messages: {...messages, [messageId]: {author: sender, text: senderText}},
    //         chats: {
    //             ...chats,
    //             [chatId]: {...chats[chatId], messageList: [...chats[chatId].messageList, messageId]}
    //         }
    //     });
    // };

    updateDataSendMessage = (messages, messageId, sender, senderText, chats, chatId) => {
        this.setState((prevState) => ({
            messages: {...prevState.messages, [messageId]: {author: sender, text: senderText}},
            chats: {
                ...prevState.chats,
                [chatId]: {...prevState.chats[chatId], messageList: [...prevState.chats[chatId].messageList, messageId]}
            }
        }));
    };


    updateDataAddChat = (chats, newChatId, chatId, messageId, messages) => {
        this.setState({
            messages: {...messages, [messageId]: {author: 'robot', text: `Это чат №${newChatId}.`}},
            chats: {
                ...chats,
                [newChatId]: {
                    title: 'Chat ' + newChatId,
                    messageList: [messageId],
                    link: '/chat/' + newChatId
                }
            }
        });
    };

    render() {
        const incomingParams = this.props.match.params.chatId;
        return (
            <div className="wrapper">
                <Header/>
                <Aside state={this.state} updateDataAddChat={this.updateDataAddChat} url={this.props.match.url}/>
                <MessageField
                    updateDataSendMessage={this.updateDataSendMessage}
                    updateDataChangeInputText={this.updateDataChangeInputText}
                    state={this.state}
                    chatId={incomingParams ? incomingParams : this.props.chatId}
                />
            </div>
        )
    }
}
