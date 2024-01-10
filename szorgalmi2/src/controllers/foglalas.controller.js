
var currentUser = require("../app");

var foglalások=[
    {id:1, foglalásKezdete:"2023.12.17", foglalásVége:"2023.12.20"},
    {id:2, foglalásKezdete:"2023.12.21", foglalásVége:"2023.12.21"},
];

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function foglalasGETController(req,res){
    let foglalasKeres = foglalások.find(((({ id }) => id === req.body.id)));


    if(req.body.id === undefined){
        res.status(400).json({
            "error":"felhasználó nem érvényes"
        });
        return;
    }


    if (foglalasKeres === undefined){
        res.status(400).json({
            "error":"ilyen azonosítókkal nincs foglalás"
        });
        return;
    }

    res.json({
        "respond":"foglalás adatai: azonosító:" + foglalasKeres.id + " foglalás kezdete:" + foglalasKeres.foglalásKezdete + " foglalás vége:" + foglalasKeres.foglalásVége
    })

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function foglalasPOSTController(req, res){
    
}

module.exports = {
    foglalasGETController, foglalasPOSTController
}