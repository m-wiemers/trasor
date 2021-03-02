const log = console.log;
const warn = console.warn;

export const printWelcomeMessage = () => log("Welcome to Trasor 🔑");

export const printNoAccess = () => warn("Wrong Password! Try again");

export const printPasswordSet = (passwordName: string) =>
  log(`you set a new ${passwordName} password.`);

export const printPassword = (passwordName: string, passwordValue: string) =>
  log(`your ${passwordName} password is ${passwordValue}`);
