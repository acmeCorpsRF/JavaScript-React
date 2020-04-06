function notifications(window) {
    'use strict';

    if (!('PushManager' in window)) {
        alert('Извините, Push-уведомления не поддерживаются вашим браузером.');
        return;
    }

    Notification.requestPermission(function (result) {

        if (result === 'denied') {
            alert('Вы заблокировали Push-уведомления!');
            return;
        }

        if (result === 'granted') {
            navigator.serviceWorker.ready.then(function (registration) {
                registration.showNotification('Вы подписались на получение Push-уведомлений!');
            });
        }
    });
}

setTimeout(() => {
    notifications(window)
}, 5000);
