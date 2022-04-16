const app = require("./app");

const dotenv = require("dotenv");

const connectDatabase = require("./config/database");

//Handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

//Config

dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// unhandled Promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error:${err}`);
  console.log(`Shutting down server due to unhandled rejection`);

  server.close(() => {
    process.exit(1);
  });
});
