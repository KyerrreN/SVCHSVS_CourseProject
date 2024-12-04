require("dotenv").config({ path: `${process.cwd()}/.env` });
const path = require("path");
const PORT = process.env.APP_PORT || 3001;
const express = require("express");
const db = require("./db/models/index");
const cors = require("cors");
const router = require("./routes/index");

const app = express();

// MW
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ROUTES
app.use("/api", router);

db.sequelize
    .sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Started server on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Couldn't connect to the database");
    });
