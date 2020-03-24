export const SEND_MESSAGE = 'SEND_MESSAGE';

export const updateDataSendMessage = (sender, senderText, chatId) => ({
    type: SEND_MESSAGE,
    sender, senderText, chatId
});