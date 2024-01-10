const express = require("express");
const bodyParser = require("body-parser");
const foglalasRoute = require("./routes/foglalas.route.js");
const { foglalasGETController, foglalasPOSTController } = require("./controllers/foglalas.controller.js");


const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.json());

app.use("/", foglalasRoute);

var userNumber = 2;

var users=[
    {name:"user1", password:"asd1", id:1},
    {name:"user2", password:"asd2", id:2}
];


var currentUser = undefined;



app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.get(foglalasRoute , foglalasGETController);

app.post(foglalasRoute, foglalasPOSTController);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/bejelentkezes", (req, res) => {
    if(req.body.name === undefined){
        res.status(400).json({
            "error":"felhasználónév nincs megadva"
        });
        return;
    }

    if(req.body.password === undefined){
        res.status(400).json({
            "error":"jelszó nincs megadva"
        });
        return;
    }


        if(users.find((({ name }) => name === req.body.name)) === undefined){
            res.status(400).json({
                "error":"nincs ilyen felhasználónév"
            });
            return;
        }

        let bejelentkezesAdatok = users.find((({ name }) => name === req.body.name));
        if( bejelentkezesAdatok.password === req.body.password){
            currentUser = bejelentkezesAdatok;
            res.status(200).json({
                "response":"sikeres bejelentkezés!",
                "name": currentUser.name
                    
            });
        }else{
            res.status(400).json({
                "error":"ilyen bejelentkezési adatokkal nincs fiók"
            })
        }
       
        

    });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    app.post("/regisztracio", (req,res)=>{

        if(req.body.name === undefined){
            res.status(400).json({
               "error": "adjon meg egy felhasználónevet" 
            });
            return;
        }
    
        if(req.body.password === undefined){
            res.status(400).json({
                "error": "adjon meg egy jelszót" 
            });
            return;
        }
    
        userNumber++;
        users.push(
            {"name": req.body.name, "password":req.body.password, "id":userNumber}
            );
        
        res.status(200).json({
            "response":"sikeres regisztráció"
        });

        users.forEach((user) =>{
            console.log("felhasználó: " + user.name + "; jelszó: " + user.password + "; id: " + user.id);
        });
    });
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    app.get("/kijelentkezes", (req,res) => {
        if(currentUser === undefined){
            res.status(400).json({"response": "nincs bejelentkezve felhasználó!"});
            return;
        }

        currentUser = undefined;
        res.status(200).json({"response":"kijelentkezés megtörtént"});
        
    });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

