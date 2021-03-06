import update from 'react-addons-update';
import {SEND_MESSAGE} from '../actions/messageActions';
import {START_CHATS_LOADING, SUCCESS_CHATS_LOADING, ERROR_CHATS_LOADING} from '../actions/chatActions';
import {START_MESSAGES_LOADING, SUCCESS_MESSAGES_LOADING, ERROR_MESSAGES_LOADING} from '../actions/messageActions';
import {ADD_CHAT, REMOVE_CHAT} from "../actions/chatActions";

const initialStore = {
    isLoading: false,
    messages: {},
    chats: {},
    isLoadingMessages: false
};

export default function chatReducer(store = initialStore, action) {
    switch (action.type) {
        case START_CHATS_LOADING: {
            return update(store, {
                isLoading: {$set: true}
            });
        }
        case SUCCESS_CHATS_LOADING: {
            const downloadableChats = {};
            Object.keys(action.payload).map(chatKey => {
                const {title, messageList, link} = action.payload[chatKey];
                downloadableChats[chatKey] = {title, messageList, link};
            });
            return update(store, {
                chats: {$set: downloadableChats},
                isLoading: {$set: false}
            });
        }
        case ERROR_CHATS_LOADING: {
            return update(store, {
                isLoading: {$set: false}
            });
        }
        case START_MESSAGES_LOADING: {
            return update(store, {
                isLoading: {$set: true},
            });
        }
        case SUCCESS_MESSAGES_LOADING: {
            const downloadableMessages = {};
            Object.keys(action.payload).map(messageKey => {
                const {author, text, chatId} = action.payload[messageKey];
                downloadableMessages[messageKey] = {author, text, chatId};
            });
            return update(store, {
                messages: {$set: downloadableMessages},
                isLoading: {$set: false},
                isLoadingMessages: {$set: true}
            });
        }
        case ERROR_MESSAGES_LOADING: {
            return update(store, {
                isLoading: {$set: false},
            });
        }
        case SEND_MESSAGE: {
            if (Object.keys(store.messages).length === 0) {
                const messageId = 1;
                return update(store, {
                    chats: {
                        $merge: {
                            ...store.chats,
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
            const sender = (action.sender !== 'robot') ? action.sender : 'robot';
            let dictionary;
            Object.keys(store.messages).map(messageId => {
                if ((store.chats[action.chatId].messageList[store.chats[action.chatId].messageList.length - 1]) == messageId) {
                    dictionary = store.messages[messageId];
                }
            });
            if (store.chats[action.chatId].messageList.length !== 0) {
                if (((dictionary.author === 'robot') && action.sender == 'robot')
                    || action.sender !== sender) {
                    return store;
                }
            }
            const messageId = Number(Object.keys(store.messages)[(Object.keys(store.messages)).length - 1]) + 1;
            return update(store, {
                chats: {
                    $merge: {
                        ...store.chats,
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
            const newChatId = (Object.keys(store.chats)).length ? Number(Object.keys(store.chats)[(Object.keys(store.chats)).length - 1]) + 1 : 1;
            const messageId = (Object.keys(store.messages)).length ? Number(Object.keys(store.messages)[(Object.keys(store.messages)).length - 1]) + 1 : 1;
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
