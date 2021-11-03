import io from 'socket.io-client';
import config from '../config';

const socket = io.connect(config.socket);

export default function () {
    function fetchNotification(onDataReceived) {
        socket.on('listNotification', onDataReceived)
    }

    function sendNotification() {
        socket.emit('addNotification')
    }

    function fetchInitialNotification() {
        socket.emit('fetchInitialNotification')
    }

    function deleteAllNotification() {
        socket.emit('deleteAllNotification')
    }

    return {
        fetchNotification,
        sendNotification,
        fetchInitialNotification,
        deleteAllNotification
    }
}
