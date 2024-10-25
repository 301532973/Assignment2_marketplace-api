const Product = require('../models/product');

// Create a new product
exports.createProduct = async (req, res) => {
    const product = new Product(req.body);
    try {
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        console.log(products); // Check if data is being fetched
        res.status(200).json(products);
    } catch (error) {
        console.error(error); // Log any errors
        res.status(500).json({ message: error.message });
    }
};



// Get product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update product
exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete product
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        
        // Check if the product was found and deleted
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: `Item deleted: ${deletedProduct.name}` });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete all products
exports.deleteAllProducts = async (req, res) => {
    try {
        const result = await Product.deleteMany({});
        res.status(200).json({ message: `${result.deletedCount} products deleted.` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/// Get products by name
exports.getProductsByName = async (req, res) => {
    const nameQuery = req.params.name; // Get name from the route parameter
    try {
        const products = await Product.find({ name: { $regex: nameQuery, $options: 'i' } });

        // Check if any products were found
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found with the specified name.' });
        }

        // Respond with the found products
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};