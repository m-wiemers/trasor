import prompts from "prompts";
import { handleGetPassword, handleSetPassword, hastAccess } from "./commands";
import { printNoAccess, printWelcomeMessage } from "./messages";
import { askForAction, askForCredentials } from "./questions";
import { Db, MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const run = async () => {
  printWelcomeMessage();
  const url = process.env.MONGODB_URL;

  try {
    const client = await MongoClient.connect(url, {
      useUnifiedTopology: true,
    });
    console.log("Connetcted to MongoDB");

    const db = client.db("trasor-marcel");

    await db.collection("inventory").insertOne({
      item: "T-Shirt",
      qty: 100,
      tags: ["cotton"],
      size: "L",
    });

    client.close();
  } catch (error) {
    console.error(error);
  }

  //   const credentials = await askForCredentials();
  //   if (!hastAccess(credentials.masterPassword)) {
  //     printNoAccess();
  //     run();
  //     return;
  //   }

  //   const action = await askForAction();
  //   switch (action.command) {
  //     case "set":
  //       handleSetPassword(action.passwordName);
  //       break;
  //     case "get":
  //       handleGetPassword(action.passwordName);
  //       break;
  //   }
};

run();
