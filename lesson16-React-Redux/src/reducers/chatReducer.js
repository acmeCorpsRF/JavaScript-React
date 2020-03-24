import update from 'react-addons-update';
import {SEND_MESSAGE} from '../actions/messageActions';
import {ADD_CHAT} from "../actions/chatActions";

const initialStore = {
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

export default function chatReducer(store = initialStore, action) {
    switch (action.type) {
        case SEND_MESSAGE: {
            // const dictionary = Object.keys(store.messages);
            // if ((((dictionary[dictionary.length - 1]).author == store.user) && (store.sender == 'robot'))
            //     || store.sender == store.user) {
            //     console.log(store);
            // }
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
            console.log(action.type);
            const chatId = Object.keys(store.chats).length + 1;
            return update(store, {
                chats: {
                    $merge: {
                        [chatId]: {
                            title: action.title, messageList: []
                        }
                    }
                },
            });
        }
        default:
            return store;
    }
}
