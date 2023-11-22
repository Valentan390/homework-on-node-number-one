import { Command } from "commander";
import * as contactsService from "./contacts.js";

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, ...data }) {
  switch (action) {
    case "list":
      const allContacts = await contactsService.listContacts();
      return console.table(allContacts);
      break;

    case "get":
      const oneContac = await contactsService.getContactById(id);
      return console.log(oneContac);
      break;

    case "add":
      const newContac = await contactsService.addContact(data);
      return console.log(newContac);
      break;

    case "remove":
      const removeContac = await contactsService.removeContact(id);
      return console.log(removeContac);
      break;

    case "updateById":
      const updateContact = await contactsService.updateContactById(id, data);
      return console.log(updateContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
