const express = require('express');
const app = express();
const productos = require('./productos')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use("/productos", productos)

app.use(express.static(__dirname + "/public"));

//Rutas
app.get("/", (req,res) => {
    res.sendFile("index.html")
})

const PORT = process.env.PORT || 8080
app.listen(8080, () => {
    console.log("Servidor corriendo en " + PORT);
})