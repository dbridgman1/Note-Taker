const path = require('path');
const Notes = require('../db/Note')

module.exports = function(app) {

    app.get('/api/notes', function(req, res) {
       Notes.getNotes().then(note => res.json(note)).catch(err => res.status(500).json(err))
    });

    app.post('/api/notes', function(req, res) {
       Notes.addNotes(req.body).then(note => res.json(note)).catch(err => res.status(500).json(err))
    });

    app.delete('/api/notes/:id', function(req, res) {
      Notes.removeNotes(req.params.id).then(() => res.json({ ok: true })).catch(err => res.status(500).json(err))
    })
}