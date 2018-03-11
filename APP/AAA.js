'use strict';

/*global REST */
const Empresa = REST({
    description : "Administración de Empresas",
    inNav : true
});

const Inversionista = REST({
    description : "Administración de Inversionistas",
    inNav : true
});


module.exports = {
    Empresa,
    Inversionista
};
