const express = require('express');
const app = express();
const fs = require('fs');

const logger = (req, res, next) => {
    console.log(`Visited ${req.url} at ${new Date()}`)
    next();
}

app.use(express.json())

app.get('/', logger, (req, res) => {
    res.send(
    `<h1> Welcome to Song Search</h1>`
    )
})

app.get('/search', (req, res) => {
    const file = fs.readFileSync('./song.json', 'utf-8');
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(file);
})

app.get('/search/:id', (req, res) => {
    const file = JSON.parse(fs.readFileSync('./song.json', 'utf-8'));
    const song = file.find(s => s.id === parseInt(req.params.id));
    if (!song) res.status(403).send('The song with the given ID was not found.');
    res.send(song);
})

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Listening on port ${port}!`))