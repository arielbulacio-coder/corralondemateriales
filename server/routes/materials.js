const express = require('express');
const router = express.Router();
const { Material } = require('../models');
const jwt = require('jsonwebtoken');

// Middleware to check admin
const isAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

// Get all materials
router.get('/', async (req, res) => {
    try {
        const materials = await Material.findAll();
        res.json(materials);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create material (Admin only)
router.post('/', isAdmin, async (req, res) => {
    try {
        const material = await Material.create(req.body);
        res.status(201).json(material);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update material (Admin only)
router.put('/:id', isAdmin, async (req, res) => {
    try {
        const material = await Material.findByPk(req.params.id);
        if (!material) return res.status(404).json({ message: 'Not found' });
        await material.update(req.body);
        res.json(material);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete material (Admin only)
router.delete('/:id', isAdmin, async (req, res) => {
    try {
        const material = await Material.findByPk(req.params.id);
        if (!material) return res.status(404).json({ message: 'Not found' });
        await material.destroy();
        res.json({ message: 'Deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
