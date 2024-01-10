const express = require('express');
const foglalasRouter = express.Router();
const foglalasController = require("../controllers/foglalas.controller");



foglalasRouter.get("/foglalasAdatok", foglalasController.foglalasGETController);

foglalasRouter.post("/foglalas", foglalasController.foglalasPOSTController);
/*
router.put("/", (reg,res) => {
    res.send({data:"szerkesztés"});
});

router.delete("/", (reg,res) => {
    res.send({data:"törlés"});
});*/

module.exports = foglalasRouter;