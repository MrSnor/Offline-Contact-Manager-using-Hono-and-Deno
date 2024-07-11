import { Hono } from "npm:hono";
import { serveStatic } from "npm:hono/deno";
import { prettyJSON } from "npm:hono/pretty-json";
import { cors } from "npm:hono/cors";
import open, { apps } from "npm:open";
import {
  isEmailExists,
  writeJson,
  writeJsonSync,
  writeToLog,
} from "./utils/index.ts";
import { ContactType, dbDataType } from "./models.ts";
import { json2csv } from "npm:json-2-csv";
import { faker } from "npm:@faker-js/faker";

const app = new Hono();
const PORT = 3002;
app.use("/api/*", cors());
app.use(prettyJSON());

app.get("/api", (c) => c.text("Welcome to the Dinosaur API!"));

app.use(prettyJSON());

// if data.json is doesn't exist, create it
try {
  const dbData = JSON.parse(await Deno.readTextFile("data.json")) as dbDataType;

  if (dbData) {
    console.log("Database data.json found");
    writeToLog(`Database data.json found - success`);
  }
} catch (error) {
  if (error.name === "NotFound") {
    writeJsonSync("data.json", {
      contactList: [],
      idCount: 0,
    });

    console.log("Database data.json created");
    writeToLog(`Database data.json created - success`);
  }
}

// if id count is 0, set it to length of contact list
try {
  const dbData = JSON.parse(await Deno.readTextFile("data.json")) as dbDataType;
  if (dbData.idCount === 0 && dbData.contactList.length !== 0) {
    const newCount = dbData.contactList.length;
    const newData = { ...dbData, idCount: newCount };

    await writeJson("data.json", newData);

    writeToLog(`idCount set to ${newCount} - success`);
  }
} catch (error) {
  console.error(error);

  writeToLog(`Error occured ${error} - error`);
}

app.get("/api/contacts/download", async (c) => {
  try {
    const dbData = JSON.parse(
      await Deno.readTextFile("data.json"),
    ) as dbDataType;

    // convert json data to csv
    const csvData = json2csv(dbData.contactList);

    c.header("Content-Type", "text/csv");
    c.header("Content-Disposition", "attachment; filename=contacts.csv");

    writeToLog(`GET /api/contacts/download - success - 200`);
    return c.body(csvData);
  } catch (error) {
    writeToLog(`GET /api/contacts/download - error - 500`);
    return c.json({ error: error }, 500);
  }
});

// add fake data
app.post("/api/contacts/add-demo-contacts", async (c) => {
  try {
    const dbData = JSON.parse(
      await Deno.readTextFile("data.json"),
    ) as dbDataType;

    // add 10 fake contacts
    let newList = dbData.contactList as ContactType[];
    for (let i = 0; i < 10; i++) {
      let fakeContact: ContactType = {
        "title": faker.person.prefix(),
        "contactPerson": faker.person.fullName(),
        "jobTitle": faker.person.jobTitle(),
        "companyName": faker.company.name(),
        "location": faker.location.city(),
        "industryType": faker.company.buzzNoun(),
        "officialEmailId": faker.internet.email(),
        "mobileNumber1": faker.phone.number(),
        "mobileNumber2": faker.phone.number(),
        "id_": faker.number.int({ min: 1, max: 1000 }).toString(),
      };
      fakeContact = {
        ...fakeContact,
        "id_": fakeContact.id_.trim(),
      };

      newList = [...newList, fakeContact];
    }
    const newData = { ...dbData, contactList: newList };
    await writeJson("data.json", newData);

    writeToLog(`GET /api/contacts/add-fake-data - success - 201`);

    return c.json({ success: true }, 201);
  } catch (error) {
    writeToLog(`GET /api/contacts/add-fake-data - error - 500`);
    return c.json({ error: error }, 500);
  }
});

// clear database
app.delete("/api/contacts/clear", async (c) => {
  try {
    await writeJson("data.json", {
      contactList: [],
      idCount: 0,
    });
    writeToLog(`GET /api/contacts/clear - success - 200`);
    return c.json({ success: true }, 200);
  } catch (error) {
    writeToLog(`GET /api/contacts/clear - error - 500`);
    return c.json({ error: error }, 500);
  }
});

// get all contacts
app.get("/api/contacts", async (c) => {
  try {
    const dbData = JSON.parse(
      await Deno.readTextFile("data.json"),
    ) as dbDataType;
    writeToLog(`GET /api/contacts - success - 200`);
    return c.json(dbData.contactList, 200);
  } catch (error) {
    writeToLog(`GET /api/contacts - error - 500`);
    return c.json({ error: error }, 500);
  }
});

// get single contact
app.get("/api/contacts/:id", async (c) => {
  const { id } = c.req.param();

  try {
    const dbData = JSON.parse(
      await Deno.readTextFile("data.json"),
    ) as dbDataType;
    const found = dbData.contactList.find((item) => item.id_ === id);
    if (found) {
      writeToLog(`GET /api/contacts/${id} - success - 200`);
      return c.json(found, 200);
    } else {
      writeToLog(`GET /api/contacts/${id} - error - 404`);
      return c.json({ error: "No contacts found." }, 404);
    }
  } catch (error) {
    writeToLog(`GET /api/contacts/${id} - error - 500`);
    return c.json({ error: error }, 500);
  }
});

// add new contact
app.post("/api/contacts", async (c) => {
  try {
    const dbData = JSON.parse(
      await Deno.readTextFile("data.json"),
    ) as dbDataType;
    const newFormData: ContactType = await c.req.json();

    // if email already exists
    if (isEmailExists(newFormData.officialEmailId, dbData.contactList)) {
      writeToLog(`POST /api/contacts - error - 400`);
      return c.json({ error: "Email already exists." }, 400);
    }

    // if name already exists (not working as intended)
    // if (isNameExists(newFormData.contactPerson, dbData.contactList)) {
    //   writeToLog(`POST /api/contacts - error - 409`);
    //   return c.json({error: "Name already exists."}, 409);
    // }

    let newContact: ContactType = newFormData;
    newContact = {
      ...newContact,
      "id_": (dbData.idCount + 1).toString(),
    };

    if (newContact) {
      const newList = [...dbData.contactList, newContact];
      const newData = {
        ...dbData,
        contactList: newList,
        idCount: dbData.idCount + 1,
      };
      writeJson("data.json", newData);
      writeToLog(`POST /api/contacts - success - 201`);
      return c.json(newContact, 201);
    } else {
      writeToLog(`POST /api/contacts - error - 404`);
      return c.json({ error: "No contacts found." }, 404);
    }
  } catch (error) {
    console.error(error);
    writeToLog(`POST /api/contacts - error - 500`);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

// delete contact
app.delete("/api/contacts/:id", async (c) => {
  const { id } = c.req.param();

  const dbData = JSON.parse(await Deno.readTextFile("data.json")) as dbDataType;
  const found = dbData.contactList.find((item) => item.id_ === id);

  try {
    if (found) {
      const dbData = JSON.parse(
        await Deno.readTextFile("data.json"),
      ) as dbDataType;
      const newList = dbData.contactList.filter((contact) =>
        contact.id_ !== id
      );
      const newData = {
        ...dbData,
        contactList: newList,
      };

      writeJsonSync("data.json", newData);

      writeToLog(`DELETE /api/contacts/${id} - success - 200`);
      return c.json("deleted", 200);
    } else {
      writeToLog(`DELETE /api/contacts/${id} - error - 404`);
      return c.json({ error: "No contacts found." }, 404);
    }
  } catch (error) {
    console.error(error);
    writeToLog(`DELETE /api/contacts/${id} - error - 500`);
    return c.json({ error: error }, 500);
  }
});

// update contact
app.put("/api/contacts/:id", async (c) => {
  const { id } = c.req.param();
  try {
    const dbData = JSON.parse(
      await Deno.readTextFile("data.json"),
    ) as dbDataType;
    const found = dbData.contactList.find((item) => item.id_ === id);

    if (found !== undefined) {
      const newFormData = await c.req.json();
      let newContact: ContactType = newFormData;
      newContact = {
        ...newContact,
        "id_": id,
      };

      if (newContact) {
        const newList = dbData.contactList.map((contact) => {
          if (contact.id_ === id) {
            return newContact;
          } else {
            return contact;
          }
        });

        const newData = {
          ...dbData,
          contactList: newList,
        };
        writeJsonSync("data.json", newData);
        writeToLog(`PUT /api/contacts/${id} - success - 200`);
        return c.json(newContact, 200);
      }
    } else {
      writeToLog(`PUT /api/contacts/${id} - error - 404`);
      return c.json({ error: "No contacts found." }, 404);
    }
  } catch (error) {
    writeToLog(`PUT /api/contacts/${id} - error - 500`);
    return c.json({ error: error }, 500);
  }
});

// serve static files
app.use(
  // "/dist/*",
  "/*",
  serveStatic({
    // root: "./",
    root: "./dist",
  }),
);

Deno.serve({ port: PORT }, app.fetch);

// // open chrome
// const openChrome = await open(`http://localhost:${PORT}`, {
//   app: {
//     name: apps.chrome,
//     arguments: ["--incognito"],
//   },
//   wait: true,
// });

// // after chrome is closed, exit deno
// if (openChrome.exitCode === 0) {
//   Deno.exit(0);
// }
