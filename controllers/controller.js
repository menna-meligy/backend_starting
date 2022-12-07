const { response } = require('..');
var Userdb = require('../models/demander')

//create and save a new user 
exports.create = (req , res) =>{
//validate request 
if(!req.body){
    res.status(400).send({message : "content can not be empty!"});
    return;
}

//new user 
const User = new Userdb ({
    demanderName:req.body.name,
    Email:req.body.Email,
    phone:req.body.phone,
    Password:req.body.Password
})

//save user in the database 

User
.save(User)
.then(data => {
    res.send(data)
})
.catch(err => {
    res.status(500).send({
        message : err.message || "some error occurred whilre creating an operation"
    });
});

}

//retrieve and return all users/ retrive and return a single user 

exports.find = (req , res )=>{
 
if (req.query.id){
 const id = req.query.id;
 Userdb.findById(id)
 .then(data =>{
    if(!data){
        res.status(404).send({message : "Not found user with id "+id})
    }
    else {
        res.send(data)
    }
 }).catch(err => {
    res.status(500).send({message : "error retriving user with id"+id})
 }
    
    )

}else {
    Userdb.find()
    .then(User => {
        res.send (User)
    })
    .catch (err =>{
        res.status(500).send ({message:err || "Error Occurred while retriving user information"})
    })
}
}

//update a new identifier user by user id 
exports.update = (req , res)=>{
if (!req.body){
    return res.status(400).send({message : "Dtata to update can not be empty"})
}
const id = req.params.id;
Userdb.findByIdAndUpdate(id , req.body,{useFindAndModify : false})
.then(data =>{
    if(!data){
        res.status(404).send({message : `cannot update user with ${id} , Maybe user not found`})
    }else {
        res.send(data)
    }
})
.catch(err =>{
    res.status(500).send({message : "Error Update user infromation"})
})
}


//delete a new identifier user by user id 
exports.delete = (req , res)=>{
const id = req.params.id ;


Userdb.findByIdAndDelete(id)
.then(data => {
    if (!data){
        res.status(404).send({message : `cannot delete with id ${id}, maybe id is wrong or not found `})
    }else {
        res.send({
            message : "User was deleted successfully "
        })
    }
})
.catch(err =>{
    res.status(500).send ({
        message : "couldn't delete yser with id =" +id
    });
});

}
    