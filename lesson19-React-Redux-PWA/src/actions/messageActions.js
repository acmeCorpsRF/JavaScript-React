export const SEND_MESSAGE = 'SEND_MESSAGE';
import {RSAA, getJSON} from 'redux-api-middleware';

export const updateDataSendMessage = (sender, senderText, chatId) => ({
    type: SEND_MESSAGE,
    sender, senderText, chatId
});

export const START_MESSAGES_LOADING = 'START_MESSAGES_LOADING';
export const SUCCESS_MESSAGES_LOADING = 'SUCCESS_MESSAGES_LOADING';
export const ERROR_MESSAGES_LOADING = 'ERROR_MESSAGES_LOADING';

export const loadMessages = () => ({
    [RSAA]: {
        endpoint: '/api/messages.json',
        method: 'GET',
        types: [
            START_MESSAGES_LOADING,
            {
                type: SUCCESS_MESSAGES_LOADING,
                payload: (action, state, response) => getJSON(response).then(data => data)
            },
            ERROR_MESSAGES_LOADING
        ]
    }
});