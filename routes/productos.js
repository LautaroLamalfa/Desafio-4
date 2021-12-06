const express = require("express");
const Contenedor = require("../contenedor.js");

const { Router } = express;
const router = new Router();

let productos = new Contenedor("productos.txt");


router.get("/", (req, res) => {
  async function getTodos(){
    try{
      let aux = await productos.getAll();
      res.send(aux);
    }
    catch(error){
            res.status(300).json({ error: "Error al conseguir los productos"});
    }  
  }    
  getTodos();
});

router.get("/:id", (req, res) =>{
  async function getxId(){
    try{
      let ptoId = await productos.getById(parseInt(req.params.id));
      if (Object.keys(ptoId).length === 0) {
        res.send({ error : 'producto no encontrado' });
      }
      else{
        res.send(ptoId);
      }
    }
    catch(error){
                res.status(300).json({ error: "Error al conseguir el producto"});
    }
    
  };
  getxId();
});

router.post("/", (req, res) => {
  console.log(req.body);
  let { titulo, precio, thumbnail } = req.body;
  let newObj = {
    titulo,
    precio,
    thumbnail,
  };

  async function savePto(){
    try {
      await productos.save(newObj);
      res.send(newObj);
      
    } catch (error) {
                res.status(300).json({ error: "Error al guardar el producto"});
    }
  }
  savePto();
});

router.put("/:id", (req, res) =>{
  let { titulo, precio, thumbnail } = req.body;

  async function modfPto(){
    try {
      let ptoMod = await productos.getById(parseInt(req.params.id));
      if (Object.keys(ptoMod).length === 0) {
        res.send({ error : 'producto no encontrado' });
      }
      else{
        ptoMod = {
        titulo,
        precio,
        thumbnail,
        id : parseInt(req.params.id)
      }
        let todosPtos = await productos.read();
        todosPtos = (JSON.parse(todosPtos, null, 2));
        let auxId = parseInt(req.params.id) - 1;
        todosPtos.slice(auxId, 1, ptoMod);
        await productos.write(todosPtos, "Producto modificado correctamente");
        res.send(todosPtos);
      }
    } catch (error) {
            res.status(300).json({ error: "Error en modificar el producto"});
    }
  }
  modfPto();

})

router.delete("/:id", (req,res) =>{
  async function deletexId(){
    try {
      let flag = await productos.getById(parseInt(req.params.id));
      if (Object.keys(flag).length === 0) {
        res.send({ error : 'producto no encontrado' });
      }
      else{
        await productos.deleteById(parseInt(req.params.id));
        res.send(await productos.getAll());
      }
    } catch (error) {
            res.status(300).json({ error: "Error al eliminar el producto"});
    }
  }
  deletexId();
})

module.exports = router;