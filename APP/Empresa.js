'use strict';

const Portal = {
    GET(req,res){
        res.send("Prueba");
    }
};
Portal.component = "Empresa";
Portal.inNav = true;
Portal.description = "Portal de Empresa";

module.exports = {
    Portal
};
