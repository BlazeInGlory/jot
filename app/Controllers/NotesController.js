import { appState } from "../AppState.js";
import { getFormData } from "../Utils/FormHandler.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML } from "../Utils/Writer.js";
import { notesService } from "../Services/NotesService.js"


function _getNotes() {
  let notes = appState.note
  let template = ''
  // let filterNotes = notes.filter(n => n.account == appState.activeNote)
  notes.forEach(n => template += n.notesTemplate)
  setHTML('noteID', template)
}

function _drawActive() {
  console.log('drawing active');
  let activeNote = appState.activeNote
  setHTML('newNoteId', activeNote.ActiveTemplate)
}





export class NotesController {
  constructor() {
    // console.log("Notes Controller is linked to front end")
    // _drawCreateNoteButton
    appState.on('activeNote', _drawActive)
    appState.on('note', _getNotes)
    // appState.on('userName', _drawCreateNoteButton)


    this.createAccount()
    this.getNotes()

  }
  async createAccount() {
    let accountName = await Pop.prompt("Enter your name!")
    if (!accountName) return
    notesService.createAccount(accountName)
    window.event.preventDefault()
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
    formHTML.reset()
  }
  getNotes() {
    _getNotes()
  }

  updateNote() {
    window.event.preventDefault()
    let note = document.getElementById('newNoteId')
    // @ts-ignore
    let updatedNote = note.value
    console.log(updatedNote, "This is my updated Note log")
    notesService.updateNote(updatedNote)
  }


  async deleteNote(noteId) {

    const yes = await Pop.confirm('Are you sure?')
    if (!yes) { return }
    notesService.deleteNote(noteId)
  }

  // saveNote() {
  //   let note = document.getElementById('noteBody')
  //   let noteBody = note.value
  //   notesService.saveNotes(noteBody)
  // }





}