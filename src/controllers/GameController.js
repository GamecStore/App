const Game = require('../models/Game.js')
const user = require('../models/User.js')

const games = require('../models/Game')

const createGame = async (req, res) => {
    try {
        const game = new Game(req.body);
        await game.save();
        res.status(201).json(game);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllGames = async (req, res) => {
    try {
        const games = await Game.find();
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getGameById = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }
        res.status(200).json(game);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateGameById = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }
        Object.keys(req.body).forEach((key) => {
            game[key] = req.body[key];
        });
        await game.save();
        res.status(200).json(game);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteGameById = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }
        await game.remove();
        res.status(200).json({ message: 'Game deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const filterGames = async (req, res) => {
    try {
        const filter = {};
        if (req.query.name) {
            filter.name = { $regex: req.query.name, $options: 'i' };
        }
        if (req.query.developer) {
            filter.developer = { $regex: req.query.developer, $options: 'i' };
        }
        if (req.query.publisher) {
            filter.publisher = { $regex: req.query.publisher, $options: 'i' };
        }
        if (req.query.genre) {
            filter.genre = { $in: req.query.genre };
        }
        if (req.query.price) {
            filter.price = { $lte: req.query.price };
        }
        const games = await Game.find(filter);
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const gamepage = (req, res) => {
    const id = req.params.id;
    game = games.findOne({ _id: id }).then((game) => {
        console.log(game)
        res.render('pages/gamePage', { game, user: req.session.user })
    })
}


module.exports = {
    createGame,
    getAllGames,
    getGameById,
    updateGameById,
    deleteGameById,
    filterGames,
    gamepage,
};
