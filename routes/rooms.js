const express = require('express');
const Room = require('../models/Room');
const auth = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');
const { getRedisClient } = require('../config/redisClient');


const router = express.Router();


// Create room (admin)
router.post('/', auth, requireRole('Admin'), async (req, res) => {
const { name, capacity, type } = req.body;
const room = await Room.create({ name, capacity, type });
// invalidate cache
const client = getRedisClient();
if (client) await client.del('rooms:list');
res.status(201).json(room);
});


// Get all rooms (cache via Redis)
router.get('/', auth, async (req, res) => {
const client = getRedisClient();
if (client) {
const cached = await client.get('rooms:list');
if (cached) return res.json(JSON.parse(cached));
}
const rooms = await Room.find();
if (client) await client.set('rooms:list', JSON.stringify(rooms), { EX: 60 });
res.json(rooms);
});


// Update room (admin)
router.put('/:id', auth, requireRole('Admin'), async (req, res) => {
const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
const client = getRedisClient();
if (client) await client.del('rooms:list');
res.json(room);
});


// Delete room (admin)
router.delete('/:id', auth, requireRole('Admin'), async (req, res) => {
await Room.findByIdAndDelete(req.params.id);
const client = getRedisClient();
if (client) await client.del('rooms:list');
res.status(204).end();
});


module.exports = router;