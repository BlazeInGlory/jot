import { appState } from "../AppState.js";
import { Note } from "../Models/Note.js";
import { saveState } from "../Utils/Store.js";

function _saveNotes() {
  saveState('note', appState.note)
}


class NotesService {
  updateNote(updatedNote) {
    // @ts-ignore
    appState.activeNote.body = updatedNote
    // @ts-ignore
    appState.activeNote.updatedAt = new Date().toLocaleTimeString('en-US')
    saveState('note', appState.note)
    appState.emit('activeNote')

  }

  createAccount(accountName) {
    appState.account = accountName
    // @ts-ignore
    // appState.account.push(accountName)
    console.log(appState.account, "Name Stored In Appstate")
  }
  createNote(formData) {
    let newNote = new Note(formData)
    appState.note.push(newNote)
    _saveNotes()
    appState.emit('note')
    console.log(appState.note, "This is the newly created note object")
  }



  setActive(noteId) {
    let foundNote = appState.note.find(n => n.id == noteId)
    appState.activeNote = foundNote
  }

  deleteNote(noteId) {
    let noteToDelete = appState.note.find(n => n.id == noteId)
    appState.note = appState.note.filter(n => n.id != noteId)
    console.log(appState.note)
    _saveNotes
    appState.emit('note')
  }
}


export const notesService = new NotesService()

