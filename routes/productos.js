const express = require('express');

const Contenedor = require("../contenedor")

const { Router } = express;
const router = new Router();

let productos = new Contenedor("productos.txt");


router.get('/', (req, res) => {
    async function getAll() {
        try {
            let aux = await productos.getAll();
            res.send(aux);
        } catch (error) {
            res.status(300).json({ error: "Error al conseguir productos"});
        }
    }

    getAll();
});

router.get("/:id", (req, res) => {
    async function getTheId() {
        try {
            let oneId = await productos.getById(parseInt(req.params.id));

            if (Object.keys(oneId).length === 0) {
                res.send({ message: "Product not found"});
            } else {
                res.send(oneId);
            }
        } catch (err) {
            res.status(300).json({ error: "Error al conseguir productos"});
        }
    }
    getTheId();
});


router.post("/", (req, res) => {
    console.log(req.body);
    let { nombre, precio, thumbnail } = req.body;
    let newObj = {
      nombre,
      precio,
      thumbnail,
    };
  
    async function saveProd() {
      try {
        await productos.save(newObj);
        res.send(newObj);
        
      } catch (error) {
        res.status(300).json({ error: "Error al subir productos" });
      }
    }
    saveProd();
  });

router.put("/:id", (req, res) => {
    let { nombre, precio, thumbnail } = req.body;

    async function modProd() {
        try {
            let prodMod = await productos.getById(parseInt(req.params.id));

            if (Object.keys(oneId).length === 0) {
                res.send({ message: "Product not found"});
            } else {
                prodMod = {
                    nombre,
                    precio,
                    thumbnail,
                    id : parseInt(req.params.id)
                }

                let todosProd = await productos.read();
                todosProd = (JSON.parse(todosProd, null, 2));
                let auxId = parseInt(req.params.id) - 1;
                todosProd.slice(auxId, 1, prodMod);

                await productos.write(todosProd, "Producto modificado correctamente")

                res.send(todosProd)
            } 
        } catch (error) {
            res.status(300).json({ error: "Error al modificar productos" });
        }
    }
    modProd()
})

router.delete("/:id", (req, res) => {
    async function deleteTheId() {
        try {
            let delet = await productos.getById(parseInt(req.params.id));
            
            if (Object.keys(delet).length === 0) {
                res.send({ message: "Product not found"});
            } else {
                await productos.deleteById(parseInt(req.params.id));
                res.send(await productos.getAll())
            }
        } catch (error) {
            res.status(300).json({ error: "Error al eliminar productos" });
        }
    }

    deleteTheId()
});

module.exports = router