const express = require('express') //instal express using npm
const productRouter = require('./productRouter')
const userRouter = require('./userRouter')

function routerApi(app){ //funcion para usar los datos del product router
    const router = express.Router();
    app.use('/api/v1',router); // poner un  endpoint base
    // para crear un versionamiento del api
 router.use(`/products`,productRouter);
 router.use(`/users`,userRouter);
}


module.exports = routerApi; 