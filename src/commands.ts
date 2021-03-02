import { printPassword, printPasswordSet } from "./messages";
import { AskForPasswordValue } from "./questions";

export const hastAccess = (masterPassword: string): boolean =>
  masterPassword === "password123";

export const handleSetPassword = async (
  passwordName: string
): Promise<void> => {
  const passwordValue = await AskForPasswordValue();
  // const newPassword = await setNewPassword(passwordValue);

  printPasswordSet(passwordName);
};

export const handleGetPassword = async (
  passwordName: string
): Promise<void> => {
  printPassword(passwordName, "XYZ123");
};
