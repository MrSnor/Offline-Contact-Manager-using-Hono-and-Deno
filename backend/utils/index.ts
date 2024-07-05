import { ContactType } from "../models.ts";

/**
 * The function `writeToLog` writes a message along with the current timestamp to a log file in a
 * specific format using Deno runtime.
 * @param {string} message - The `message` parameter is a string that represents the content you want
 * to write to the log file.
 */
function writeToLog(message: string) {
  const path = "./log.txt";
  const now = new Date();
  const formattedTime = `${
    now.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    })
  } - ${now.toLocaleDateString("en-US")}`;

  const dataToWrite = `${message} - ${formattedTime}\n`;

  try {
    Deno.writeTextFileSync(path, dataToWrite, {
      append: true,
    });
  } catch (error) {
    console.error(error);
  }
}

/**
 * The function `writeJson` asynchronously writes JSON data to a file specified by the `path` parameter
 * in TypeScript using Deno.
 * @param {string} path - The `path` parameter is a string representing the file path where the JSON
 * data will be written to.
 * @param {object} data - The `data` parameter in the `writeJson` function is an object that represents
 * the JSON data that you want to write to a file. This object will be stringified using
 * `JSON.stringify` before being written to the file specified by the `path` parameter.
 * @returns The `writeJson` function returns a `Promise<string>`. If the writing operation is
 * successful, it returns a string indicating that the data has been written to the specified path. If
 * an error occurs during the writing process, it returns the error message.
 */
async function writeJson(path: string, data: object): Promise<string> {
  try {
    await Deno.writeTextFile(path, JSON.stringify(data));
    return "Written to " + path;
  } catch (error) {
    console.error(error);

    return error;
  }
}

/**
 * The function `writeJsonSync` writes JSON data to a file synchronously in TypeScript using Deno.
 * @param {string} path - The `path` parameter in the `writeJsonSync` function is a string that
 * represents the file path where the JSON data will be written to.
 * @param {object} data - The `data` parameter in the `writeJsonSync` function is an object that you
 * want to write to a JSON file.
 * @returns The `writeJsonSync` function returns a string that says "Written to " followed by the
 * `path` parameter value if the writing operation is successful. If an error occurs during the writing
 * process, the function returns the error message.
 */
function writeJsonSync(path: string, data: object): string {
  try {
    Deno.writeTextFileSync(path, JSON.stringify(data));

    return "Written to " + path;
  } catch (error) {
    console.error(error);

    return error;
  }
}

/**
 * The function `isEmailExists` checks if a given email exists in a list of contacts based on their
 * official email IDs.
 * @param {string} email - A string representing an email address that you want to check for existence
 * in the contact list.
 * @param {ContactType[]} contactList - An array of objects representing contacts, where each object
 * has a property `officialEmailId` that stores the official email address of the contact.
 * @returns The function `isEmailExists` returns a boolean value indicating whether the provided email
 * exists in the `officialEmailId` property of any contact in the `contactList` array.
 */
const isEmailExists = (email: string, contactList: ContactType[]): boolean => {
  return contactList.some((contact) => contact.officialEmailId === email);
};

/**
 * The function `isNameExists` checks if a given name exists in a list of contacts.
 * @param {string} name - The `name` parameter is a string representing the name of a contact person.
 * @param {ContactType[]} contactList - An array of objects representing contacts, where each object
 * has a property `contactPerson` that stores the name of the contact.
 * @returns The function `isNameExists` returns a boolean value indicating whether the provided `name`
 * exists in the `contactList` array of `ContactType` objects.
 */
const isNameExists = (name: string, contactList: ContactType[]): boolean => {
  return contactList.some((contact) => contact.contactPerson === name);
};

export { writeJson, writeJsonSync, writeToLog, isEmailExists, isNameExists };
