const express = require('express');
const app = express();
const productos = require('./productos')


app.use(express.json())

const arr = [
    {
        title: "Block de Dibujo",
        price: 95,
        thumnail: "link"
    }
]


app.use("/productos", productos)





const PORT = process.env.PORT || 8080
app.listen(8080, () => {
    console.log("Servidor corriendo en " + PORT);
})