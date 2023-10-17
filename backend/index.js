const express = require('express') // Call express
const app= express(); // create app
const port = 3100; // puerto

const routerApi = require('./routes/index')


const cors = require('cors')

app.use(express.json())
app.use(cors()) // 
app.get('/', (req,res)=>{
    res.send('this is the test the base server')
})


app.listen(port,()=>{
    console.log('The port is activated' + port)
}

)

routerApi(app)




