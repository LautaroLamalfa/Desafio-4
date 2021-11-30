const fs = require('fs');

class Contenedor {

    constructor(name) {
        this.name = name;
    }

    async read() {
        try {
            let data = await fs.promises.readFile("./" + this.name, "utf8");
            return data
        } catch (error) {
            res.status(300).json({ error: "Error al leer" + this.name });
        }
    }

    async write(datos) {
        try {
            await fs.promises.writeFile("./" + this.name, JSON.stringify(datos, null, 2), "utf8");       
        } catch (error) {
            res.status(300).json({ error: "Error al escribir en" + this.name });
        }
    }

    async save (product) {
        try {
            let newId = 1
            let newProduct = {}

            let data = await fs.promises.readFile("./"+this.name, "utf-8");
            let datos = [JSON.parse(data)];

            if(!data) {
                product.id = newId;
                newProduct = [product];
            } else {
                product.id = datos [datos.length - 1].id + 1;
                newProduct = product;
            }
            datos.push(newProduct);

            await this.write(datos);
        } catch (error) {
            res.status(300).json({ error: "Error al guardar"});
        }
    }

    async getById(num) {
        try {
            let data = await this.read();
            let datos = JSON.parse(data);

            let result = datos.filter( product => product.id === num);
            return result

        } catch (error) {
            res.status(300).json({ error: "Error al conseguir el id"});
        }
    }

    async getAll() {
        try {
            let data = await this.read();
            let datos = JSON.parse(data);

            return datos;
        } catch (error) {
            res.status(300).json({ error: "Error al conseguir todos los productos"});
        }
    }

    async deleteById(num) {
        try {
            let data = await this.read();
            let datos = JSON.parse(data);
            let result = datos.find( product => product.id === num);

            if(result) {
                let index = datos.indexOf(result)
                datos.splice(index, 1)
                await this.write(datos, `Producto con ID ${num} eliminado`);
            } else {
                console.log(` El producto ${num} no existe`);
                return[]
            }
        } catch (error) {
            res.status(300).json({ error: "Error al borrar por id"});
            }
        }

    async deleteALL() {
        try {
            let data = [];
            await this.write(data, "Productos eliminados")
        } catch (error) {
            res.status(300).json({ error: "Error al borrar todos los productos"});
        }
    }
}

module.exports = Contenedor;