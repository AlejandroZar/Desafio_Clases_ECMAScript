// class ProductManager {
//     #products
//     #lastId

//     constructor() {
//         this.#products = []
//         this.#lastId = 0
//     }

//     addProduct(title, description, price, thumbnail, code, stock) {
//         // Validar que todos los campos sean obligatorios
//         if (!title || !description || !price || !thumbnail || !code || !stock) {
//             console.error("Todos los campos son obligatorios.")
//             return
//         }

//         // Validar que no se repita el campo "code"
//         const isCodeDuplicate = this.#products.some(product => product.code === code)
//         if (isCodeDuplicate) {
//             console.error("Ya existe un producto con ese código.")
//             return
//         }

//         // Agregar el producto con un id autoincrementable
//         const product = {
//             id: this.#lastId + 1,
//             title,
//             description,
//             price,
//             thumbnail,
//             code,
//             stock
//         }
//         this.#products.push(product)
//         this.#lastId++
//         console.log('Producto agregado')
//     }

//     getProducts() {
//         return this.#products
//     }

//     getProductById(id) {
//         const product = this.#products.find(product => product.id === id)
//         if (!product) {
//             console.error("Producto no encontrado.")
//             return
//         }
//         return product
//     }
// }

// // Testing de la clase ProductManager
// const productManager = new ProductManager()

// productManager.addProduct('Camisa', 'Camisa de algodón', 25.99, 'https://example.com/camisa.jpg', 'ABC123', 100)
// productManager.addProduct('Pantalón', 'Pantalón vaquero', 39.99, 'https://example.com/pantalon.jpg', 'DEF456', 50)
// productManager.addProduct('Zapatos', 'Zapatos de cuero', 59.99, 'https://example.com/zapatos.jpg', 'GHI789', 75)

// console.log(productManager.getProducts())
// console.log(productManager.getProductById(2))
// console.log(productManager.getProductById(5)) // Producto no encontrado