const fs = require('fs');

class ProductManager {
    #products;
    #lastId;
    #path;

    constructor(filePath) {
        this.#products = [];
        this.#lastId = 0;
        this.#path = filePath;
        this.loadProducts();
    }

    async loadProducts() {
        try {
            const data = await fs.promises.readFile(this.#path, 'utf8');
            this.#products = JSON.parse(data);
            if (this.#products.length > 0) {
                // Find the maximum id in the loaded products
                const maxId = Math.max(...this.#products.map(product => product.id));
                this.#lastId = maxId;
            }
        } catch (err) {
            console.log("Error reading or parsing file. Initializing with empty array.");
            this.#products = [];
        }
    }

    async saveProducts() {
        try {
            const data = JSON.stringify(this.#products, null, 2);
            await fs.promises.writeFile(this.#path, data);
            console.log('Products saved successfully.');
        } catch (err) {
            console.error('Error writing to file:', err);
        }
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        // Validar que todos los campos sean obligatorios
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("Todos los campos son obligatorios.");
            return;
        }

        // Validar que no se repita el campo "code"
        const isCodeDuplicate = this.#products.some(product => product.code === code);
        if (isCodeDuplicate) {
            console.error("Ya existe un producto con ese código.");
            return;
        }

        // Agregar el producto con un id autoincrementable
        const product = {
            id: ++this.#lastId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        this.#products.push(product);
        this.saveProducts();
        console.log('Producto agregado');
    }

    getProducts(limit) {
        if (limit) {
            return this.#products.slice(0, limit);
        } else {
            return this.#products;
        }
    }

    getProductById(id) {
        const product = this.#products.find(product => product.id === id);
        if (!product) {
            console.error("Producto no encontrado.");
            return;
        }
        return product;
    }

    updateProduct(id, updatedFields) {
        const index = this.#products.findIndex(product => product.id === id);
        if (index === -1) {
            console.error("Producto no encontrado.");
            return;
        }

        this.#products[index] = { ...this.#products[index], ...updatedFields };
        this.saveProducts();
        console.log("Producto actualizado correctamente.");
    }

    deleteProduct(id) {
        const index = this.#products.findIndex(product => product.id === id);
        if (index === -1) {
            console.error("Producto no encontrado.");
            return;
        }

        this.#products.splice(index, 1);
        this.saveProducts();
        console.log("Producto eliminado correctamente.");
    }
}

module.exports = ProductManager;
