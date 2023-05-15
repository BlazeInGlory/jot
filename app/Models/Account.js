import { generateId } from "../Utils/generateId";

export class Account {
  constructor(data) {
    this.id = generateId()
    // @ts-ignore
    this.name = account
    this.createdAt = new Date().toLocaleTimeString('en-US')
  }
}