import { printPassword, printPasswordSet } from "./messages";
import { askForAction, AskForPasswordValue } from "./questions";
import {
  createPasswordDoc,
  getCollection,
  PasswordDoc,
  readPasswordDoc,
  updatePasswordValue,
} from "./db";

export const hastAccess = (masterPassword: string): boolean =>
  masterPassword === "password123";

export const handleSetPassword = async (
  passwordName: string
): Promise<void> => {
  const passwordDoc = await readPasswordDoc(passwordName);
  if (!passwordDoc) {
    const passwordValue = await AskForPasswordValue();
    const newPasswordDoc = {
      name: passwordName,
      value: passwordValue,
    };
    await createPasswordDoc(newPasswordDoc);
    printPasswordSet(passwordName);
  } else if (passwordDoc && passwordName === passwordDoc.name) {
    console.log(
      `password allready exists. Please set your new password for ${passwordName}`
    );
    const newPasswordValue = await AskForPasswordValue();
    await updatePasswordValue(passwordName, newPasswordValue);
    printPasswordSet(passwordDoc.name);
  }
};

export const handleGetPassword = async (
  passwordName: string
): Promise<void> => {
  const passwordDoc = await readPasswordDoc(passwordName);
  if (!passwordDoc) {
    console.log("no password found");
    return;
  }
  printPassword(passwordDoc.name, passwordDoc.value);
};
