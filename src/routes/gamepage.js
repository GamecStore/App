const express = require('express')
const router = express.Router()




router.get('/gamepage/:id', (req, res) => {

    games = [
        {
            id: 1,
            name: 'God Of war Ragnarock',
            sideDescription: 'Journey to dangerous and stunning landscapes Embark on an epic and heartfelt journey as Kratos and Atreus struggle with holding on and letting go.',
            mainDescription: 'From Santa Monica Studio comes the sequelto the critically acclaimed God of War (2018). Fimbulwinter is well underway. Kratos and Atreus must journey to each of the Nine Realms in search of answers as Asgardian forces prepare for a prophesied battle that will end the world.Along the way they will explore stunning, mythical landscapes, and face fearsome enemies in the form of Norse gods and monsters. The threat of Ragnarök grows ever closer.Kratos and Atreus must choose between their own safety and the safety of the realms. ',
            developer: 'Sony Santa Monica ',
            publisher: 'Sony Entertainment',
            price: [59.99, 69.99, 79.99],
            editionsDesc: ['God of War Ragnarök ps4'],
            sliderImgs: ''
        },
        {
            id: 2,
            name: 'God Of war Ragnarock',
            description: 'Journey to dangerous and stunning landscapes Embark on an epic and heartfelt journey as Kratos and Atreus struggle with holding on and letting go.',
            developer: 'Sony Santa Monica ',
            publisher: 'Sony Entertainment',
            price: [59.99, 69.99, 79.99],
            editionsDescription: ['God of War Ragnarök ps4'],
            sliderImgs: ''
        }
    ]
    game = games.find(game => game.id === parseInt(req.params.id))


    res.render('pages/gamePage', { game })
})

module.exports = router