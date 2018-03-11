'use strict';

//const Inversionista=REST();
const Inversionista={
    GET:{
        json(req,res){
            //console.log(require("util").inspect(req.db.Inversionista.schema,{colors:true,depth:4}));
            console.log("eachPath");
            req.db.Inversionista.schema.eachPath(pathName=>console.log(pathName));
            console.log("\n\ntoInputs");
            req.db.Inversionista.toInputs().forEach(el=>console.log(el.name));

            res.send("OK");
        }
    },
    component:"Inversionista",
    inNav:true,
    description:"Portal Inversionista"
};

const PagoFake = {
    component:"PagoFake",
    GET:{
        json(req,res){
            //generamos una transacción simulada
            req.session.trx = {
                transaction_id:Math.ceil(Math.random()*100000),
                subject:"Cobro de prueba",
                currency:"CLP",
                amount:Math.ceil(Math.random()*100000)
            };
            res.json(req.session.trx);
       }
    }

};
module.exports={
    Inversionista,
    PagoFake
};
