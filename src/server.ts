import http from "http";
import dotenv from "dotenv";
import { connectDB, createPasswordDoc, readPasswordDoc } from "./db";
import { parse } from "node:path";
import { stringify } from "node:querystring";

dotenv.config();

const port = process.env.PORT;
const url = process.env.MONGODB_URL;

connectDB(url, "trasor-marcel");

const server = http.createServer((request, response) => {
  if (request.url === "/") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");
    response.end("<h1>Trasor</h1>");
    return;
  }

  if (request.method === "GET") {
    handleGet(request, response);
  }
  if (request.method === "POST") {
    handlePOST(request, response);
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

async function handleGet(
  request: http.IncomingMessage,
  response: http.ServerResponse
) {
  const parts = request.url.split("/");
  const passwordName = parts[parts.length - 1];
  const passwordDoc = await readPasswordDoc(passwordName);
  if (!passwordDoc) {
    response.statusCode = 404;
    response.end();
    return;
  }
  response.statusCode = 200;
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(passwordDoc));
  return;
}

async function handlePOST(
  request: http.IncomingMessage,
  response: http.ServerResponse
) {
  let data = "";
  request.on("data", (chunk) => {
    data += chunk;
  });
  request.on("end", async () => {
    const drawName = JSON.parse(data).name;
    const drawValue = JSON.parse(data).value;
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");
    response.end(
      JSON.stringify(
        await createPasswordDoc({
          name: drawName,
          value: drawValue,
        })
      )
    );
  });
}
