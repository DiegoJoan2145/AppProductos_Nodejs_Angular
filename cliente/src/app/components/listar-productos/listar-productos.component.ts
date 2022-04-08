import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {
  listProductos: Producto[] = [];

  constructor(private _productoService: ProductoService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(){
    this._productoService.getProductos().subscribe(data => {
      console.log(data);
      this.listProductos = data;
    }, error => {
      console.log(error);
    })
  }

  eliminarProductos(id: any){
    this._productoService.eliminarProducto(id).subscribe(data =>
      {
        this.toastr.error('el producto fue eliminado con éxito', 'Producto eliminado');
        this.obtenerProductos(); // obtiene nuevamente los productos
      }, error =>{
        console.log(error);
      })
  }

}
