import { appState } from "../AppState.js";
import { Note } from "../Models/Note.js";
import { saveState } from "../Utils/Store.js";
import { NotesController } from "../Controllers/NotesController.js";
import { EventEmitter } from "../Utils/EventEmitter.js";

class NotesService {
  setNote(noteId) {
    let setNote = appState.note.find(n => n.id == noteId)
    // @ts-ignore
    
    appState.activeNote = setNote
    console.log(noteId)
    appState.emit('activeNote')
  }
   _saveNotes(note) {
console.log(note)
   let foundNote = appState.note.find(n => note.id == n.id)
   // @ts-ignore
   let updatedNoteBody = foundNote.body = note.body
   appState.note.push(updatedNoteBody)
  //  console.log(foundNote, updatedNoteBody)
    saveState('note', appState.note)
    appState.emit('note')
  }
  updateNote(note) {
    // @ts-ignore
    appState.activeNote.body = note
    // @ts-ignore
    appState.activeNote.updatedAt = new Date().toLocaleTimeString('en-US')
    appState.emit('activeNote')
    // this._saveNotes()

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
    // this._saveNotes()
    appState.emit('note')
    console.log(appState.note, "This is the newly created note object")
  }



  setActive(noteId) {
    let foundNote = appState.note.find(n => n.id == noteId)
    // @ts-ignore
    appState.activeNote = foundNote
    appState.emit('activeNote')
  }

  deleteNote(noteId) {
    console.log(noteId)
    let noteToDelete = appState.note.find(n => n.id == noteId)
    appState.note = appState.note.filter(n => n.id != noteId)
    console.log(noteToDelete, "Is it gone?")
    // this._saveNotes()
    appState.emit('note')
  }
}


export const notesService = new NotesService()

