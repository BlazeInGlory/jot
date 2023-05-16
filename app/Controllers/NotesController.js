import { appState } from "../AppState.js";
import { getFormData } from "../Utils/FormHandler.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML, setText } from "../Utils/Writer.js";
import { notesService } from "../Services/NotesService.js"


function getNoteTitle() {
  let freshNote = appState.note
  let template = ''
  freshNote.forEach(c => template += c.noteTitle)
  setHTML('noteID', template)
}

// function _getNotes() {
//   let notes = appState.note
//   let template = ''
//   notes.forEach(n => template += n.notesTemplate)
//   setHTML('noteTitle', template)
// }

function _drawActive() {
  console.log('drawing active');
  let activeNote = appState.activeNote
  setHTML('newNoteId', activeNote?.notesTemplate)
}

function totalNotes(){
  setText('numberOfNotes', appState.note.length)
}



export class NotesController {
  constructor() {
    appState.on('activeNote', _drawActive)
    // appState.on('note', _getNotes)
    appState.on('note', getNoteTitle)
    appState.on('note', totalNotes)
    getNoteTitle()
    totalNotes()
    
    this.createAccount()
  }

  setNote(noteId) {
    notesService.setNote(noteId)
  }

  async createAccount() {
    let accountName = await Pop.prompt("Enter your name!")
    if (!accountName) return
    notesService.createAccount(accountName)
    // window.event.preventDefault()
  }

  createNote() {
    // @ts-ignore
    window.event.preventDefault()
    // @ts-ignore
    const formHTML = event.target
    const formData = getFormData(formHTML)
    // @ts-ignore
    formData.account = appState.account
    console.log(formData, "This is Create note form data")
    notesService.createNote(formData)
    // @ts-ignore
    // formHTML.reset()
  }

  updateNote(noteId) {
    // @ts-ignore
    window.event.preventDefault()
    let note = {}
    note.body = document.getElementById('noteBody')?.innerText
    note.id = noteId
    // @ts-ignore
    // let updatedNote = note.value
    console.log(note, "This is my updated Note log")
    notesService.updateNote(note)
  }


  async deleteNote(noteId) {
    console.log("did u delete?")
    const yes = await Pop.confirm('Are you sure?')
    if (!yes) { return }
    notesService.deleteNote(noteId)
  }

  saveNote(noteId) {
    window.event?.preventDefault()
    // @ts-ignore
    let note = {}
    note.body = document.getElementById('noteBody')?.innerHTML
    note.id = noteId
    notesService._saveNotes(note)
  }





}