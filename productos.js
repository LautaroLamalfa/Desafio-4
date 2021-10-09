const express = require('express');
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const router = express.Router()

const arr = [
    {
        title: "Block de Dibujo",
        price: 95,
        thumnail: "link"
    }
]

router.get("/productos", (req, res) => {
    res.send(arr)
})

router.post("/productos", (req, res) => {

    console.log(req.body);
    let {title, price, thumbnail} = req.body;

    let obj = {
        title,
        price,
        thumbnail,
    }

    arr.push(obj)
    res.status(201).send("Producto creado")

})



module.exports = router