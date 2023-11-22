import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./contacts.js";
import { Command } from "commander";
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      return console.table(allContacts);
      break;

    case "get":
      const oneContac = await getContactById(id);
      return console.table(oneContac);
      break;

    case "add":
      const newContac = await addContact({ name, email, phone });
      return console.table(newContac);
      break;

    case "remove":
      const removeContac = await removeContact(id);
      return console.table(removeContac);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
