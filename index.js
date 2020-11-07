const express = require('express')
const mongoose = require('mongoose')
const Scores = require('./scores') // on importe notre model
const body = require('body-parser')
const cors = require('cors');

let app = express(); // création de l'objet représentant notre application express
app.use(body())
app.use(cors());

mongoose.connect('mongodb://localhost:27017/scoreboard', {useUnifiedTopology: true, useNewUrlParser: true});
let port = 8080;


//Get tous les scores
app.get('/', async (req, res) => {
    const scores = await Scores.find() // On récupère tout les livres
    await res.json(scores)
})

//Get le score d'un id
app.get('/:id', async (req, res) => {
    const id = req.params.id
})

//Post un score
app.post('/', async (req, res) => {
    const user = req.body.user // récupération des variables du body
    const score = req.body.score

    if (!user  || !score) { // on vérifie que les trois variables sont présentes
        res.send('Il manque un argument')
        return
    }

    const nouveau_score = new Scores({ // création d'un objet représentant notre nouveau livre
        user : user,
        score : score
    })

    await nouveau_score.save() // sauvegarde asynchrone du nouveau livre
    res.json(nouveau_score)
    return
})

app.listen(port, () =>  { // ecoute du serveur sur le port 8080
    console.log('le serveur fonctionne')
})