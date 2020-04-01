export const ADD_CHAT = 'ADD_CHAT';
export const REMOVE_CHAT = 'REMOVE_CHAT';
import {RSAA, getJSON} from 'redux-api-middleware';
export const TOGGLE_MENU = 'TOGGLE_MENU';

export const addChat = () => ({
    type: ADD_CHAT
});

export const removeChat = (e, chat) => ({
    type: REMOVE_CHAT,
    e, chat
});

export const START_CHATS_LOADING = 'START_CHATS_LOADING';
export const SUCCESS_CHATS_LOADING = 'SUCCESS_CHATS_LOADING';
export const ERROR_CHATS_LOADING = 'ERROR_CHATS_LOADING';

export const loadChats = () => ({
    [RSAA]: {
        endpoint: '/api/chats.json',
        method: 'GET',
        types: [
            START_CHATS_LOADING,
            {
                type: SUCCESS_CHATS_LOADING,
                payload: (action, state, response) => getJSON(response).then(data => data)
            },
            ERROR_CHATS_LOADING
        ]
    }
});

export const menuToggle = () => ({
    type: TOGGLE_MENU
});