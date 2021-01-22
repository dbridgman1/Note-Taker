const path = require('path');

module.exports = function(app) {

    app.get('/api/notes', function(req, res) {
        res.json(notes);
    });

    app.post('/api/notes', function(req, res) {
        notes.push(req.body);
        res.json(true);
    });

    app.delete('/api/notes/:id', function(req, res) {
        res.json(notes)
    })
}