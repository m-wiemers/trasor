import { printPassword, printPasswordSet } from "./messages";
import { AskForPasswordValue } from "./questions";
import { createPasswordDoc, readPasswordDoc, updatePasswordValue } from "./db";

export const hastAccess = (masterPassword: string): boolean =>
  masterPassword === "password123";

export const handleSetPassword = async (
  passwordName: string
): Promise<void> => {
  const passwordValue = await AskForPasswordValue();
  const passwordDoc = await readPasswordDoc(passwordName);
  if (passwordDoc) {
    console.log("Password already present. Changing existing value!");
    await updatePasswordValue(passwordName, passwordValue);
  } else {
    await createPasswordDoc({ name: passwordName, value: passwordValue });
  }
  printPasswordSet(passwordName);
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
