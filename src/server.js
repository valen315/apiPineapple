const express= require('express')
const app=express();
var path=require('path')
// configuracion del puertos
app.set('port',process.env.POST || 3001);

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//initRoutes(app);
//Import routes

/* const employeeRouters=require('./routes/EmployeeRoute');
app.use('/api',employeeRouters)

const RoleRouters=require('./routes/RoleRoute');
app.use('/api',RoleRouters) */

const productRouters=require('./routes/ProductRoute');
app.use('/api',productRouters)

const categoryRouters=require('./routes/CategoryRoute');
app.use('/api',categoryRouters) 

/* const ImageRouters=require('./routes/ImageRoute');
app.use('/api',ImageRouters) */


//static Images folder
//app.use('/Images', express.static('./Images'))
app.use(express.static(path.join(__dirname,'Images')))

// app.use('/test', (req, res) => {
//     res.send("test route");
// });

/* app.use('/',(req,res)=>{
    res.send("hello world")
}); */

// starting the servers
app.listen(app.get('port'),()=>{
    console.log("starting server ")
})