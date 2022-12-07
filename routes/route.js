const express = require('express');
const route = express.Router()
const controller  = require('../controllers/controller')

//routers

/*
route.get('../models/demander.js' ,demander_add_user);

route.get('../models/suppliers.js', supplier_add_user );

route.get('../models/pharmacists.js' , pharmacists_add_user)
route.get('../models/medecine.js' , add_medicine)
*/

//API 
route.post('/api/users' , controller.create);
route.get('/api/users' , controller.find);
route.put('/api/users:id' , controller.update);
route.delete('/api/users:id' , controller.delete);





module.exports= route