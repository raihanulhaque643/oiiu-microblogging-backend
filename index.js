const express = require("express");
require('./src/db/mongoose')
const bodyParser = require("body-parser");

const app = express();

// PORT
const PORT = process.env.PORT || 4000;

const cors = require('cors')
app.use(cors({origin: '*'}))

app.use(express.json())

app.get("/", (req, res) => {
  res.json({ message: "API Working…" });
});


app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});

