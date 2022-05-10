const express = require ('express')

//######## JSON Web Token ###############

const jwt = require('jsonwebtoken')

//###############################

const app = express ()

app.get('/api', (req,res)=> {
    res.json({
        message: 'Hey there! Welcome to this API service',
    });
});


app.post('/api/posts', verifyToken, (req,res)=> {
    jwt.verify(req.token, 'secretkey', (err, authData)=> {
        if(err)
        {
            res.sendStatus(403); //forbidden 
        }else {
            res.json({
                message: 'Posts created...',
                authData,
            });
        }
    });
    }); 

    /* app.post('/api/posts',(req,res)=> {
        
                res.json({
                    message: 'Posts created...',
                });
        }); */


app.post('/api/login', (req,res)=> {
    const user = 
        {
            id:1,
            name:'Jhon',
            email: 'john@gmail.com'
        };
      /*   {
            id: 2,
            name :'Smith',
            email: 'smith@gmail.com'
        }
        ,
        {
            id: 3,
            name :'carl',
            email: 'carl@gmail.com'
        },
    ]; */

    jwt.sign({user: user}, "secretkey", (err, token)=>
    {
        res.json (
            {
                token,
            }
        );
    });
});


function verifyToken(req, res, next)
{
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader!== 'undefined')
    {
        const bearerToken= bearerHeader.split(' ')[1]
        req.token = bearerToken 
        next()
    }else
    {
        res.sendStatus(403); //forbidden 
    }
} 


 
app.use (express.json())
app.use (express.urlencoded({extended: false}))

app.use('/api/users', require ('./routes/api/users')) 

app.listen(3000, function()
{
    console.log('Server started on port 3000');

});


