const ProductManager = require('./ProductManager');

// Crear una instancia de ProductManager con la ruta al archivo 'productos.json'
const productManager = new ProductManager('./productos.json');

// Agregar algunos productos
productManager.addProduct('Camisa', 'Camisa de algodón', 25.99, 'https://example.com/camisa.jpg', 'ABC123', 100);
productManager.addProduct('Pantalón', 'Pantalón vaquero', 39.99, 'https://example.com/pantalon.jpg', 'DEF456', 50);
productManager.addProduct('Zapatos', 'Zapatos de cuero', 59.99, 'https://example.com/zapatos.jpg', 'GHI789', 75);

// Mostrar todos los productos
console.log('Todos los productos:', productManager.getProducts());

// Obtener un producto por ID
console.log('Producto con ID 2:', productManager.getProductById(2));
console.log('Producto con ID 5:', productManager.getProductById(5)); // Producto no encontrado
