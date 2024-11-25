require("dotenv").config({ path: `${process.cwd()}/.env` });
const PORT = process.env.APP_PORT || 3002;
const express = require("express");

const app = express();

app.use("*", (req, res, next) => {
    res.status(404).json({
        status: "Error",
        message: "Provided endpoint doesn't exist",
    });
});

app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "hello world",
    });
});

app.listen(PORT, () => {
    console.log(`Started server on port ${PORT}`);
});
