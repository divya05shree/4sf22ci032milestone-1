const WebSocket = require('ws');

// Define WebSocket server URL
const wsUrl = 'ws://localhost:3000';

// Create a WebSocket connection
const ws = new WebSocket(wsUrl);

// When the connection is open
ws.on('open', () => {
    console.log('Connected to WebSocket server');
});

// When a message is received from the server
ws.on('message', (message) => {
    // Convert Buffer to string
    const messageString = message.toString();  // Buffer-to-string conversion
    console.log('Notification:', messageString); // Print the received notification

    try {
        // Try to parse the incoming message
        const data = JSON.parse(messageString);
        console.log('Parsed Notification:', data);
    } catch (error) {
        console.error('Error parsing message:', error);
    }
});

// When the WebSocket connection is closed
ws.on('close', () => {
    console.log('WebSocket connection closed');
});

// In case of an error
ws.on('error', (error) => {
    console.error('WebSocket error:', error);
});
