const producto = require("../models/producto");
const Producto = require("../models/producto");

exports.crearProducto = async (req, res) => {
    try {
        let producto;

        //creamos el producto
        producto = new Producto(req.body);
        await producto.save();
        res.send(producto);

    } catch (error) {
        console.log(error);
        res.status(500).send('hubo un error');
    }
}

exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('hubo un error');
    }
}

exports.actualizarProductos = async (req, res) => {
    try {
        const { nombre, categoria, ubicacion, precio } = req.body;
        let producto = await  Producto.findById(req.params.id);
        
        if(!producto) {
            res.status(404).json({ msg: 'no existe el producto' })
        }

        producto.nombre = nombre;
        producto.categoria = categoria;
        producto.ubicacion =  ubicacion;
        producto.precio = precio;

        producto = await Producto.findOneAndUpdate({ _id: req.params.id }, producto, { new: true });
        res.json(producto);
        console.log(producto);
        
        
    } catch (error) {
        console.log(error);
        res.status(500).send('hubo un error');
    }
}

exports.eliminarProductos = async (req, res) => {
    try {
        let producto = await  Producto.findById(req.params.id);
        
        if(!producto) {
            res.status(404).json({ msg: 'no existe el producto' })
        }

        await Producto.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Producto eliminado' });
        
        
    } catch (error) {
        console.log(error);
        res.status(500).send('hubo un error');
    }
}