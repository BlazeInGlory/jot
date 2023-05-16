import { generateId } from "../Utils/generateId.js";

export class Note {
  constructor(data) {
    this.id = data.id || generateId()
    this.title = data.title
    this.body = data.body || 'heya'
    this.createdAt = data.createdAt || new Date().toLocaleTimeString('en-US')
    this.updatedAt = data.Updated || new Date().toLocaleTimeString('en-US')
    this.words = data.words
    this.characters = data.characters
    this.account = data.account
    this.color = data.color
  }

  get notesTemplate() {
    return `<div class="col-12 my-5 border">
    <div class="row">
      <div class="col-md-4">
        <p>${this.title}</p>
        <p style="color: ${this.color}" class="fs-2"><i class="mdi mdi-circle-small"></i></p>
        <p>Created On:${this.createdAt}</p>
        <p>Last Updated On:${this.updatedAt}</p>
        <div class="d-flex justify-content-around">
          <p>Words: ${this.words}</p>
          <p>Characters: ${this.characters}</p>
        </div>
      </div>
      <div class="col-md-6 my-5">
        <form onsubmit="app.notesController.saveNote('${this.id}')">
          <textarea class="textArea" id="noteBody" name="body" cols="55" rows="20">${this.body}
        </textarea>
        <button onclick="app.notesController.updateNote(${this.id})
         class="btn btn-outline-secondary bg-light"><i
            class="mdi mdi-plus-circle-outline"></i>add</button>
      </div>
      <div class="col-md-2">
        <button class="btn btn-danger mt-3 text-end" onclick="app.notesController.deleteNote('${this.id}')">
          <i class="mdi mdi-trash-can-outline"></i></button>
      </div>
      </form>
    </div>
  </div>`
  }


  get noteTitle() {
    return `
    <button onclick="app.notesController.setNote('${this.id}')">${this.title}</button>
    `
  }



}