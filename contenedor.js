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
            throw Error ("Error reading file " + this.name)
        }
    }

    async write(datos) {
        try {
            await fs.promises.writeFile("./" + this.name, JSON.stringify(datos, null, 2), "utf8");       
        } catch (error) {
            throw Error ("Error writing file " + this.name)
        }
    }

    async save (product) {
        try {
            let newId = 1
            let newProduct = {}

            let data = await fs.promises.readFile("./" + this.name, "utf-8");
            let datos = JSON.parse(data);

            if(!data) {
                product.id = newId;
                newProduct = [product];
            } else {
                product.id = datos [datos.length - 1].id + 1;
                newProduct = product;
            }
            datos.push(newProduct);

            await this.write(datos, "Producto Agregado");
        } catch (error) {
            throw Error ("Error saving")
        }
    }

    async getById(num) {
        try {
            let data = await this.read();
            let datos = JSON.parse(data);

            let result = datos.filter( product => product.id === num);
            return result

        } catch (error) {
            throw Error ("Error getting Id")
        }
    }

    async getAll() {
        try {
            let data = await this.read();
            let datos = JSON.parse(data);

            return datos;
        } catch (error) {
            throw Error ("Error getting all products")
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
                throw Error ("Error deleting by Id")
            }
        }

    async deleteALL() {
        try {
            let data = [];
            await this.write(data, "Productos eliminados")
        } catch (error) {
            throw Error ("Error deleting all products")
        }
    }
}

module.exports = Contenedor;