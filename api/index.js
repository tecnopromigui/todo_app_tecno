require("dotenv").config();
require("./src/db/models/relationShips");
const server = require("./src/server/index");
const baseDeDatos = require("./src/db/index");

const PORT = process.env.PORT || 3001;

baseDeDatos.sync({ force: false }).then(() => {
    server.listen(PORT, () => {
        console.log("server listening on PORT: ", PORT);

        
    })
})

