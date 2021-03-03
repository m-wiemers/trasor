import prompts from "prompts";
import { handleGetPassword, handleSetPassword, hastAccess } from "./commands";
import { printNoAccess, printWelcomeMessage } from "./messages";
import { askForAction, askForCredentials } from "./questions";
import dotenv from "dotenv";
import { closeDB, connectDB, getCollection } from "./db";
dotenv.config();

const run = async () => {
  printWelcomeMessage();
  const url = process.env.MONGODB_URL;

  try {
    await connectDB(url, "trasor-marcel");
    await getCollection("passwords");
    await closeDB();
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
