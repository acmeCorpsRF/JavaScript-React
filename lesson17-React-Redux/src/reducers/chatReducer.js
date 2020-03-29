import update from 'react-addons-update';
import {SEND_MESSAGE} from '../actions/messageActions';
import {ADD_CHAT, REMOVE_CHAT} from "../actions/chatActions";

const initialStore = {

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

export default function chatReducer(store = initialStore, action) {
    switch (action.type) {
        case SEND_MESSAGE: {
            const dictionary = Object.values(store.messages);
            const sender = (action.sender !== 'robot') ? action.sender : 'robot';
            if ((((dictionary[dictionary.length - 1]).author == 'robot') && action.sender == 'robot')
                || action.sender !== sender) {
                return store;
            }
            const messageId = Object.keys(store.messages).length + 1;
            return update(store, {
                chats: {
                    $merge: {
                        [action.chatId]: {
                            title: store.chats[action.chatId].title,
                            messageList: [...store.chats[action.chatId].messageList, messageId],
                            link: store.chats[action.chatId].link
                        }
                    }
                },
                messages: {
                    $merge: {
                        ...store.messages, [messageId]: {author: action.sender, text: action.senderText}
                    }
                }
            });
        }
        case ADD_CHAT: {
            let lastChatKeyValue = (Object.keys(store.chats)).length ? Number(Object.keys(store.chats)[(Object.keys(store.chats)).length - 1]) : 0;
            const newChatId = lastChatKeyValue + 1;
            let lastMessageKeyValue = (Object.keys(store.messages)).length ? Number(Object.keys(store.messages)[(Object.keys(store.messages)).length - 1]) : 0;
            const messageId = lastMessageKeyValue + 1;
            return update(store, {
                messages: {
                    $merge: {
                        ...store.messages, [messageId]: {author: 'robot', text: `Это чат №${newChatId}.`}
                    }
                },
                chats: {
                    $merge: {
                        ...store.chats,
                        [newChatId]: {
                            title: 'Chat ' + newChatId,
                            messageList: [messageId],
                            link: '/chat/' + newChatId
                        }
                    }
                }
            });

        }
        case REMOVE_CHAT: {
            // delete store.chats[action.chat.link.slice(6)];        // при таком действии не идет новая запись в LocalStorage.
            // return store;                                         // нет update store - нет перезаписи данных.

            const newMessagesStore = () => {
                store.chats[action.chat.link.slice(6)].messageList.map(messageId => {
                    delete store.messages[messageId];
                });
                return store.messages;
            };
            const newChatStore = () => {
                delete store.chats[action.chat.link.slice(6)];
                return store.chats;
            };
            return update(store, {
                messages: {
                    $merge: newMessagesStore()
                },
                chats: {
                    $merge: newChatStore()
                }
            });
        }
        default:
            return store;
    }
}
