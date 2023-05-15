import { userService } from '../Services/UserService.js';
import { Pop } from '../Utils/Pop.js'


export class UserController {
  constructor() {
    console.log('hello from the user controller');
  }

  async enterUserName() {
    let input = await Pop.prompt("Enter your name!")
    if (!input) return
    userService.enterUserName(input)
  }

}