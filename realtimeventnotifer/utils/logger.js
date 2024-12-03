const fs = require('fs');

const logEvent = (event) => {
    fs.appendFile('completed_events.log', JSON.stringify(event) + '\n', err => {
        if (err) console.error('Error logging event:', err);
    });
};

module.exports = { logEvent };
