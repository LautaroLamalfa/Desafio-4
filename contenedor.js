const fs = require('fs');

class Contenedor {

    constructor(name) {
        this.name = name;
    }

    async read() {
        try {
            let data = await fs.promises.readFile("./" + this.name, "utf-8");
            return data;
            
        } catch (error) {
            res.status(300).json({ error: "Error al leer" + this.name });
        }
    }

    async write(datos, msg) {
        try {
            await fs.promises.writeFile("./" + this.name, JSON.stringify(datos, null, 2));
            console.log(msg);
        } catch (error) {
            res.status(300).json({ error: "Error al escribir en" + this.name });
        }
    }


    async save(product) {
        try{
            let newId = 1;
            let newProduct = {};
    
            let data = await this.read();
            let datos = JSON.parse(data);
    
            if(!data) {
                product.id = newId;
                newProduct = [product];
            } else {
                product.id = datos[datos.length - 1].id + 1;
                newProduct = product;
            }
            datos.push(newProduct);
    
            await this.write(datos, "Producto agregado correctamente");
        }
        catch(error){
            res.status(300).json({ error: "Error al guardar"});
        }

    }


    async getById(num) {
        try{
            let data = await this.read();
            let datos = JSON.parse(data);
    
            let result = datos.filter( product => product.id == num);
            return result;
        }
        catch(error){
                res.status(300).json({ error: "Error al conseguir el producto"});
        }

    }

    async getAll() {
         try{
            let data = await this.read();
            let datos = JSON.parse(data);
    
            return datos;
        }
        catch(error){
            res.status(300).json({ error: "Error al guardar el producto"});
        };

    }

    async deleteById(num) {
        try{
            let data = await this.read();
            let datos = JSON.parse(data);
    
            let product = datos.find( product => product.id == num);
            
            if(product) {
                let index = datos.indexOf(product);
                datos.splice(index, 1);
                await this.write(datos, `Producto con ID: ${num} eliminado correctamente`);
            } else {
                console.log(`Producto con ID: ${num} no existe`);
                return [];
            }
        }
        catch(error){
            res.status(300).json({ error: "Error en modificar el producto"});
        }

    }

    async deleteAll() {
        try{
            let data = [];
            await this.write(data, "Todos los productos eliminados");
        }
        catch(error){
            res.status(300).json({ error: "Error al eliminar el producto"});
        }
    }
}

module.exports = Contenedor;