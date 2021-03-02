import prompts from "prompts";

const run = async () => {
  console.log("Welcome to Trasor 🔑");

  const answers = await prompts([
    {
      type: "number",
      name: "age",
      message: "How old are you?",
      validate: (age) => (age < 18 ? `Nightclub is 18+ only` : true),
    },
    {
      type: "text",
      name: "location",
      message: "Where are you from?",
    },
    {
      type: "toggle",
      name: "isWrite",
      message: "would you read or write?",
      initial: true,
      active: "write",
      inactive: "read",
    },
  ]);

  if (answers.isWrite == true) {
    console.log("Ok, how you spell your PW?");
  } else if (answers.isWrite == !true) {
    console.log("Here is your PW:");
  }
};

run();
