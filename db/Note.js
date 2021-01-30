const fs = require('fs');
const util = require('util');
const writeAsync = util.promisify(fs.writeFile)
const readAsync = util.promisify(fs.readFile)

const { v4: uuidv4 } = require('uuid');

class Notes {
    read() {
        return readAsync('db/db.json', 'utf8')
    }
    write(note) {
        return writeAsync('db/db.json', JSON.stringify(note))
    }
    getNotes() {
        return this.read().then(notes => {
            let parseNotes = [];
            try {
                parseNotes = parseNotes.concat(JSON.parse(notes))
            } catch (error) {
                parseNotes = [];
            }
            return parseNotes;
        })
    }
    addNotes(notes) {
        const newNote = {
            title: notes.title,
            text: notes.text,
            id: uuidv4()
        }

        return this.getNotes().then(notesArr => [...notesArr, newNote]).then(updateNotes => this.write(updateNotes)).then(() => newNote)
    }
    removeNotes(id) {
        return this.getNotes().then(notesArr => notesArr.filter((note) => note.id !== id)).then(note => this.write(note))
    }
}

module.exports = new Notes();