const express = require('express');
const router = express.Router();

// Event storage
let events = [];


router.post('/', (req, res) => {
    const { title, description, time } = req.body;
    const event = { title, description, time: new Date(time), id: Date.now() };
    events.push(event);
    events.sort((a, b) => a.time - b.time); // Sort events by time
    console.log(events); // Log the events array to confirm
    res.status(201).json({ message: 'Event added successfully', event });
});


// Get Events
router.get('/', (req, res) => {
    const upcomingEvents = events.filter(event => new Date(event.time) > new Date());
    res.status(200).json(upcomingEvents);
});

module.exports = router;
