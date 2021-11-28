const express = require('express');
const productosRutas = require("./routes/productos")

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"));

app.use("/api/products", productosRutas);


//Rutas
app.get("/", (req,res) => {
    res.sendFile("index.html")
})

app.listen(8080, () => {
    console.log("Servidor corriendo 👍");
})

