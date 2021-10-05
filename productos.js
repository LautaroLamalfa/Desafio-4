const express = require('express');


const router = express.Router()

router.get("/", (req, res) => {
    res.send("Hola a todos. Bienvenido a mi pagina")
})

router.post("/", (req, res) => {

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