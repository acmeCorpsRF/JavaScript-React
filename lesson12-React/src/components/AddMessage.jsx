import React from 'react';
import './AddMessage.css';

let arrMessage = [];

function AddMessage() {
    const [messages, setMessage] = React.useState();

    function getValueSetPoint(event) {
        event.preventDefault();
        let textField = document.getElementById('any-message');
        setMessage(textField.value);
        arrMessage.push(textField.value);
    }

    return <div className="wrapper" id="wrapper">
        <form action="">
            <div id="output" className="output">{messages}</div>
            <input id="any-message" type="text" placeholder="Сообщение"/>
            <button id="add-message" onClick={event => getValueSetPoint(event)}>Добавить</button>
        </form>
    </div>
}

export default AddMessage;
