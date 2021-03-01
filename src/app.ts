console.log("Welcome to Trasor 🔑");

const [command] = process.argv.slice(2);

if (command === "set") {
  console.log("You set something");
} else if (command === "get") {
  console.log("What should I get?");
}
