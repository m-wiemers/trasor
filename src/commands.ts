import { printPassword, printPasswordSet } from "./messages";
import { AskForPasswordValue } from "./questions";
import { createPasswordDoc, readPasswordDoc } from "./db";

export const hastAccess = (masterPassword: string): boolean =>
  masterPassword === "password123";

export const handleSetPassword = async (
  passwordName: string
): Promise<void> => {
  const passwordValue = await AskForPasswordValue();
  const passwordDoc = {
    name: passwordName,
    value: passwordValue,
  };
  await createPasswordDoc(passwordDoc);
  printPasswordSet(passwordDoc.name);
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
