const express = require('express') // llamar express

const router = express.Router();
const userServices = require('./../services/userServices');

const servici = new userServices();

router.get('/', async (req,res)=>{
  
const users = await servici.find(); 
    res.json(users)
})



router.get('/:id',
async (req,res,next)=>{
 try{const {id} = req.params;
 const user = await servici.findObe(id);
 res.json(user)}catch(error){
    next(error)
 }
})

router.post('/',async (req,res)=>{
 const body = req.body;
 const newUser =  servici.create(body);
 res.status(201).json(newUser)

})

router.patch('/:id',
 async (req,res)=>{
   try{
    const body = req.body;
    const {id}= req.params;
    const userModify = await servici.update(id,body)
    res.json(userModify)
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