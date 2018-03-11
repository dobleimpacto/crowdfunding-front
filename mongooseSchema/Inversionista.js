'use strict';


__debug("Inversionista");
var inspect = myinspect;
var verbosity = "NONE INFO VERB DEBUG".split(' ');


function Schema(db){
    let Direccion = new db.Schema({
        pais:{
            type:String,
            required:true,
            //myRef:"Paises",
            name:"País"
        },
        region:{
            type:String,
            required:true,
            name:"Región"
        },
        comuna:{
            type:String,
            required:true,
            name:"Comuna"
        },
        calle:{
            type:String,
            required:true,
            name:"Calle"
        },
        numero:{
            type:Number,
            name:"Número"
        },
        detalle:{
            type:String,
            name:"Detalle Dirección"
        }
    },{_id:false});
    let Inversionista = new db.Schema({
        name:{
            type:String,
            required:true,
            name:"Razon Social"
        },
        fantasia:{
            type:String,
            required:true,
            name:"Nombre de Fantasía",
        },
        giro:{
            type:String,
            required:true,
            name:"Giro"
        },
        tipo_organizacion:{
            type:String,
            enum:["Fundación","Empresa","Corporación"],
            name:"Tipo de Organización"
        },
        vigencia:{
            type:Number,
            required:true,
        },
        email: {
            type: "Email", 
            required: "Debe existir el correo", 
            doubleCheck: true,
            auth:"password",
            filter:true,
            name:"Correo Electrónico"
        },
        url: {
            type: String,
            filter:true,
            name:"Sitio WEB"
        },
        direccion_comercial:Direccion
    },{discriminatorKey:"User"});
    Inversionista.path("direccion_comercial").options.name="Dirección Comercial";
    return {Inversionista};
}

module.exports = Schema;
