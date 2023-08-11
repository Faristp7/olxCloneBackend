import express from "express";
const app = express();

app.get("/api", (req, res) => {
  res.json({ users: ["userOne", "userTwo", "userTwo"] });
});

app.listen(5000, () => {
  console.log("server Listening on port 5000");
});
