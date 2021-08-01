class Carrito{
  constructor(listaProductos, total) {
    this.listaProductos = [];
    this.total = 0;
  }

  removeProducto(producto){
    let index = this.listaProductos.indexOf(producto);
    this.listaProductos.splice(index, 1);
    this.restarPrecioProducto(producto.price, producto.quantity);
    console.log("Se removio el producto");
  }

  addProducto(producto){
    this.listaProductos.push(producto);
    this.sumarPrecioProducto(producto.price, producto.quantity);
  }

  getProductos(){
    console.log(this.listaProductos);
  }

  getTotal2(){
    return this.total;
  }

  sumarPrecioProducto(precio, cantidad){
    this.total += precio * cantidad;
  }

  restarPrecioProducto(precio, cantidad){
    this.total -= precio * cantidad;
  }
}

class Producto{
  constructor(id, title, category, price, quantity){
    this.id = id;
    this.title = title;
    this.category = category;
    this.price = price;
    this.quantity = quantity;
  }

  actualizar(title, category, price, quantity){
    this.title = title;
    this.category = category;
    this.price = price;
    this.quantity = quantity;
  }

  eliminar(id){

  }

  obtener(){
    return {
      id: this.id,
      title: this.title,
      category: this.category,
      price: this.price,
      quantity: this.quantity,
    }
  }
}
