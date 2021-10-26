require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

const userRouter = ("./user/router")

/* SETUP MIDDLEWARE */
const recipesRouter = require("./resources/recipes/router");
const usersRouter = require("./resources/user/router");

app.disable("x-powered-by");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/User", userRouter)

/* SETUP ROUTES */
app.use("/recipes", recipesRouter);
app.use("/users", usersRouter);

app.get("*", (req, res) => {
  res.json({ ok: true });
});

/* START SERVER */

const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`\n🚀 Server is running on http://localhost:${port}/\n`);
});
