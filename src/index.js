const express = require("express");

const searchRouter = require("./routes/search.route");
const indexRouter = require("./routes/management.route");

const app = express();

app.use(express.json());

app.use("/search", searchRouter);
app.use("/index", indexRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`)
})