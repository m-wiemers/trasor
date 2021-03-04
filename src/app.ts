import prompts from "prompts";
import { handleGetPassword, handleSetPassword, hastAccess } from "./commands";
import { printNoAccess, printWelcomeMessage } from "./messages";
import { askForAction, askForCredentials } from "./questions";
import dotenv from "dotenv";
import {
  closeDB,
  connectDB,
  createPasswordDoc,
  deletePasswordDoc,
  getCollection,
  updatePasswordDoc,
  updatePasswordValue,
} from "./db";
dotenv.config();

const run = async () => {
  printWelcomeMessage();
  const url = process.env.MONGODB_URL;

  try {
    await connectDB(url, "trasor-marcel");
    // console.log(
    //   await createPasswordDoc({ name: "wlan", value: "password123" })
    // );
    // console.log(await updatePasswordValue("Marcel", "1234"));
    // console.log(await updatePasswordDoc("Marcel", { name: "wland" }));
    // console.log(await deletePasswordDoc("wlan"));
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
