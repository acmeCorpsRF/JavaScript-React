export const ADD_CHAT = 'ADD_CHAT';
export const REMOVE_CHAT = 'REMOVE_CHAT';

export const addChat = () => ({
    type: ADD_CHAT
});

export const removeChat = (e, chat) => ({
    type: REMOVE_CHAT,
    e, chat
});