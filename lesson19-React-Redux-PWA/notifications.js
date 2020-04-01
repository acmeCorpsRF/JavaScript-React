function notifications(window) {
    'use strict';

    if (!('PushManager' in window)) {
        alert('Извините, Push-уведомления не поддерживаются вашим браузером.');
        return;
    }

    // navigator.serviceWorker.ready
    //     .then(function (registration) {
    //         registration.pushManager.getSubscription()
    //             .then(function (subscription) {
    //                 if (subscription) {
    //                     console.log(subscription);
    //                 }
    //                 else {
    //                     console.log('Возникла ошибка');
    //                 }
    //             })
    //             .catch(function (error) {
    //                 console.error('Возникла ошибка', error);
    //             });
    //     });

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
