//use express and router
const express = require('express');
const router = express.Router();

const Game = require('../models/game');
//RESTful endpoints get, post, patch, delete

const getGame = async (req, res, next) => {
    let game;
    try {
        game = await Game.findById(req.params.id);
        if (game === null) {
            return res.status(404).json({ message: 'Cannot find game' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.game = game;
    next();
    }

//Get all
router.get('/', async (req, res) => {
    try {
        const games = await Game.find();
        res.json(games);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

//Get one
router.get('/:id', getGame, async (req, res) => {
    res.json(res.game);
})

//Post create
router.post('/', async (req, res) => {
    const game = new Game({
        title: req.body.title,
        genre: req.body.genre,
        year: req.body.year
    })
    try {
        const newGame = await game.save();
        res.status(201).json(newGame);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

//Patch update
router.patch('/:id', getGame, async (req, res) => {
    if(req.body.title != null) {
        res.game.title = req.body.title;
    }
    if(req.body.genre != null) {
        res.game.genre = req.body.genre;
    }
    if(req.body.year != null) {
        res.game.year = req.body.year;
    }

    try {
        const updatedGame = await res.game.save();
        res.json(updatedGame);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

//Delete
router.delete('/:id', getGame, async (req, res) => {
    try {
        await res.game.remove();
        res.json({ message: 'Deleted Game' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


module.exports = router;