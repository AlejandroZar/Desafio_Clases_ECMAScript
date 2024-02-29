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

    loadProducts() {
        try {
            const data = fs.readFileSync(this.#path, 'utf8');
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

    saveProducts() {
        try {
            const data = JSON.stringify(this.#products, null, 2);
            fs.writeFileSync(this.#path, data);
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

    getProducts() {
        return this.#products;
    }

    getProductById(id) {
        const product = this.#products.find(product => product.id === id);
        if (!product) {
            console.error("Producto no encontrado.");
            return;
        }
        return product;
    }
}

module.exports = ProductManager;
