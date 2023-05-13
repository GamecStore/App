const express = require('express')
const router = express.Router()




router.get('gamepage', (req, res) => {

    games: [
        {
            name: 'God Of war Ragnarock',
            description: 'Journey to dangerous and stunning landscapes Embark on an epic and heartfelt journey as Kratos and Atreus struggle with holding on andletting go.',
            developer: 'Sony Santa Monica ',
            publisher: 'Sony Entertainment',
            price: [59.99, 69.99, 79.99],
            editionsDesc: ['God of War Ragnarök ps4'],
            sliderImgs: ''
        }
    ]


    res.render('pages/gamePage', { games })
})

module.exports = router