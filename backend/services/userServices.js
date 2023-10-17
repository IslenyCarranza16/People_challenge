const { faker } = require("@faker-js/faker"); //instal faker to generate data
const boom = require('@hapi/boom') // instal boom to manage errors

class userServices{


    constructor(){ // esta es en la primera instancia 
        this.users = [];
        this.generate();
       
    }
    
    generate(){
       
        for(let i=0; i<100; i++){
            this.users.push({
                id: faker.string.uuid(),
                name: faker.person.fullName(),
                gender: faker.person.gender(),
                signoZodiacal: faker.person.zodiacSign()
            })}
    
    }
     create(data){
        const userNuevo ={
            id: faker.string.uuid(),
            ... data
        }
        this.users.push(userNuevo);
        return userNuevo
    
    }
    
     async find(){
    return this.users
         // devolver productos es como find todo los productos 
    
    }
    
    async findObe(id){
      // no existe error
        const user= this.users.find((item)=>item.id === id);
        if(!user){
          throw boom.notFound('Users not found')
        } if(user.esbloqueado){
          throw boom.conflict('User is blocked')
        }
        return user
    
    }
    
    async update(id, changes){
      const index = this.users.findIndex((item)=>item.id === id)
      if (index ===-1){
        throw boom.notFound('User not found')
      }else{
        const user = this.users[index];
     this.users[index] = {
        ...user,
        ... changes
     };
     return this.users[index];
      }
    }
    
    async delete(id){
        const index = this.users.findIndex((item)=>item.id === id)
      if (index ===-1){
        throw boom.notFound('User not found')
      }else{
     this.users.splice(index,1)
     return {id}
      }
    
    
    }
    
    }
    
    console.log(userServices)
    
    
    module.exports = userServices;

