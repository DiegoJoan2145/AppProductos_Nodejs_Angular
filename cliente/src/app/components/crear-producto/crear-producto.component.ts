import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;
  // se crea el titulo para que muestre el nombre de la interfaz correspondiente
  titulo = 'Crear Producto';
  id: string | null;


  constructor(private fb: FormBuilder,
        private router: Router,
        private toastr: ToastrService,
        private _productoService: ProductoService,
        private aRouter: ActivatedRoute) {
    this.productoForm = this.fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required],
    })
    // de esta manera podemos obtener el id
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  // metodo para agregar producto especificado tambien en crear-producto.component.html
  agregarProducto() {

    console.log(this.productoForm);
    console.log(this.productoForm.get('producto')?.value);

    // Se guardan los datos metidos desde el archivo crear-producto.component.html
    const PRODUCTO: Producto = {
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value,

    }
    console.log(PRODUCTO);

    this._productoService.guardarProducto(PRODUCTO).subscribe(data => {

      // manda mensaje success
      this.toastr.success('Producto Registrado!', 'El producto fue registrado con éxito!');

      // se importa router para la navegación entre rutas
      this.router.navigate(['/']);
    }, error => {
      console.log(error);
      this.productoForm.reset();
    })

  }

  // este metodo verifica si existe el id
  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar producto';
      this._productoService.obtenerProducto(this.id).subscribe(data => {
        this.productoForm.setValue({
          producto: data.nombre,
          categoria: data.categoria,
          ubicacion: data.ubicacion,
          precio: data.precio,
        })
        console.log(data);
      })
    }
  }
}
