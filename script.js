const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket) => {
    console.log('Новый клиент подключен');
    socket.send('Добро пожаловать в чат!');

    socket.on('message', (message) => {
        console.log("Получено сообщение:" +message);
        // Рассылка сообщения всем клиентам
        server.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    socket.on('close', () => {
        console.log('Клиент отключился');
    });
});

console.log('Сервер запущен на порту 8080');