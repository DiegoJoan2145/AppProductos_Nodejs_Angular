export class Producto {
    _id?: number;
    nombre : string;
    categoria : string;
    ubicacion : string;
    precio : string; 

    constructor(nombre : string, categoria : string, ubicacion : string, precio : string ){
        this.nombre = nombre;
        this.categoria = nombre;
        this.ubicacion = ubicacion;
        this.precio = precio
    }
}