const { faker } = require("@faker-js/faker"); //instal faker to generate data
const boom = require('@hapi/boom') // instal boom to manage errors

class productServices{


    constructor(){ // esta es en la primera instancia 
        this.products = [];
        this.generate();
       
    }
    
    generate(){
       
        for(let i=0; i<100; i++){
            this.products.push({
                id: faker.string.uuid(),
                name: faker.commerce.productName(),
                price: parseInt(faker.commerce.price(),10),
                image: faker.image.url(),
                esbloqueado: faker.datatype.boolean()
    
            })}
    
    }
     create(data){
        const productoNuevo ={
            id: faker.string.uuid(),
            ... data
        }
        this.products.push(productoNuevo);
        return productoNuevo
    
    }
    
     async find(){
    return this.products
         // devolver productos es como find todo los productos 
    
    }
    
    async findObe(id){
      // no existe error
        const producto= this.products.find((item)=>item.id === id);
        if(!producto){
          throw boom.notFound('Producto no encontrado')
        } if(producto.esbloqueado){
          throw boom.conflict('product is blocked')
        }
        return producto
    
    }
    
    async update(id, changes){
      const index = this.products.findIndex((item)=>item.id === id)
      if (index ===-1){
        throw boom.notFound('Producto no encontrado')
      }else{
        const producto = this.products[index];
     this.products[index] = {
        ...producto,
        ... changes
     };
     return this.products[index];
      }
    }
    
    async delete(id){
        const index = this.products.findIndex((item)=>item.id === id)
      if (index ===-1){
        throw boom.notFound('Producto no encontrado')
      }else{
     this.products.splice(index,1)
     return {id}
      }
    
    
    }
    
    }
    
    console.log(productServices)
    
    
    module.exports = productServices;

