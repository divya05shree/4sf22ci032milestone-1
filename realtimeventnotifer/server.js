const WebSocket = require('ws');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

// Create an Express app
const app = express();
const server = http.createServer(app);

// Create a WebSocket server
const wss = new WebSocket.Server({ server });

// Middleware to parse POST data
app.use(bodyParser.json());

// Handle incoming WebSocket connections
wss.on('connection', (ws) => {
    console.log('New WebSocket connection');
    
    // Send an immediate notification to the client when they connect
    const immediateNotification = [
        {
            title: 'Immediate Test',
            description: 'This is a test notification.',
            time: new Date(),
            id: Date.now()
        }
    ];
    ws.send(JSON.stringify(immediateNotification));

    // Optionally, store references to connected clients
    ws.on('message', (message) => {
        console.log('Received message from client:', message);
    });

    // Handle WebSocket connection close
    ws.on('close', () => {
        console.log('WebSocket connection closed');
    });
});

// Handle POST requests
app.post('/notify', (req, res) => {
    const postData = req.body;

    console.log('Received POST data:', postData);

    // Broadcast the POST data to all connected WebSocket clients
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify([postData]));
        }
    });

    // Send a response to acknowledge the POST data
    res.status(200).json({ message: 'Notification sent to clients' });
});

// Start the HTTP server and WebSocket server
const port = 3000;
server.listen(port, () => {
    console.log(`WebSocket server is running on ws://localhost:${port}`);
});
