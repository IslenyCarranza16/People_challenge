const express = require('express') // llamar express

const router = express.Router();
const productServices = require('./../services/productServices');

const servici = new productServices();

router.get('/', async (req,res)=>{
  
const productos = await servici.find(); 
    res.json(productos)
})



router.get('/:id',
async (req,res,next)=>{
 try{const {id} = req.params;
 const product = await servici.findObe(id);
 res.json(product)}catch(error){
    next(error)
 }
})

router.post('/',async (req,res)=>{
 const body = req.body;
 const newProduct =  servici.create(body);
 res.status(201).json(newProduct)

})

router.patch('/:id',
 async (req,res)=>{
   try{
    const body = req.body;
    const {id}= req.params;
    const productoModificado = await servici.update(id,body)
    res.json(productoModificado)
   }catch(error){ // para capturar el error
    next(error)

   }
      
      
   })

   router.delete('/:id', async (req,res)=>{
   
    const {id}= req.params;
    const respuesta = await servici.delete((id));
    res.json(respuesta)
   
   })

module.exports = router;