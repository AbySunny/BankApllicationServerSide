//import data service file
const dataService=require('./service/dataservice')

//import cors
const cors=require("cors")

//import json web token
const jwt=require('jsonwebtoken')

// import express

const express=require("express")

//create app using express
const app=express()

//connection string to frontend integration
app.use(cors({origin:'http://localhost:4200'}))

//to parse json data from req body
app.use(express.json())


//middleware
const jwtMiddleware=(req,res,next)=>{
    try {
        const token = req.headers['access_token']
        //verify token
        const data = jwt.verify(token, "superkey")
        console.log(data);
        next()
    }
    catch {
        res.status(422).json({
            statusCode:422,
            status:false,
            message:'please login first'
        })
    }
}


// //request
// app.get('/',(req,res)=>{
//     res.send('Get Method ....123')
// })


//register  -post
app.post('/register',(req,res)=>{

    dataService.register(req.body.uname, req.body.acno, req.body.psw).then(result=>{
        res.status(result.statusCode).json(result)
    })
    //convert object to json and dend response
    

    // console.log(req.body);
    // res.send("success")
})

//login
app.post('/login',(req,res)=>{

    dataService.login(req.body.acno, req.body.psw).then(result=>{
        res.status(result.statusCode).json(result)    //convert object to json and dend response
    })
     
})

//deposit
app.post('/deposit',jwtMiddleware,(req,res)=>{

    dataService.deposit(req.body.acnum, req.body.password, req.body.amount).then(result=>{
        res.status(result.statusCode).json(result)   //convert object to json and dend response
    })
    
    

  
})

//withdraw
app.post('/withdraw',jwtMiddleware,(req,res)=>{

    dataService.withdraw(req.body.acnum, req.body.password, req.body.amount).then(result=>{
        res.status(result.statusCode).json(result)    //convert object to json and dend response
    })
    
    

  
})

//getTransaction

app.post('/transaction',jwtMiddleware,(req,res)=>{

    dataService.getTransaction(req.body.acno).then(result=>{
        res.status(result.statusCode).json(result)
    })
    

  
})

//delete

app.delete('/delete/:acno',jwtMiddleware,(req,res)=>{
    dataService.deleteAcc(req.params.acno).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

//create port
app.listen(3000,()=>{console.log("server started at port number 3000");})