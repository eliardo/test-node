const express = require("express");
const Datasource = require('./database/Datasource')

const app = express();

app.use(express.json());
app.datasource = new Datasource();

const PORT = process.env.PORT || 3000;

require("./routes/userRoutes")(app);

app.listen(PORT, () => {
    console.log("Server running at port " + PORT);
});
