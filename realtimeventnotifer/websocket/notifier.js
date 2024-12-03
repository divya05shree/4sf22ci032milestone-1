const WebSocket = require('ws');

// WebSocket connection and broadcasting notifications
function setupWebSocket(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        console.log('New WebSocket connection');
        ws.on('message', (message) => {
            console.log(`Received: ${message}`);
        });

        // Send a welcome message when a client connects
        ws.send('Welcome to the WebSocket server!');
    });

    return wss;
}

function notifyEvent(wss, event) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(`Reminder: Event "${event.title}" is starting in 5 minutes.`);
        }
    });
}

module.exports = { setupWebSocket, notifyEvent };
