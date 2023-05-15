// import { ValuesController } from "./Controllers/ValuesController.js";
// import { UserController } from "./Controllers/UserController.js";
import { NotesController } from "./Controllers/NotesController.js"

class App {
  // valuesController = new ValuesController();

  notesController = new NotesController();
}

window["app"] = new App();
