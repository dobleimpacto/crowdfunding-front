'use strict';
const got = require("got");
const isPlainObj= require("is-plain-obj");
const sortObj = require("sort-object");
const crypto = require("crypto");
const khipuGot = require('khipu-got');
process.env.KHIPU_RECEIVER_ID=169197;
process.env.KHIPU_SECRET="d9f825fbe37a3b139b3e3c9b86c0713da59efbe9";

//CLASE KHIPU para solicitudes genéricas.
class Khipu{
    constructor(id,secret,endpoint){
        this.id=id;
        this.secret=secret;
        this.endpoint = endpoint;
        return (path,opts)=>{
            if (typeof path !== 'string') {
                return Promise.reject(new TypeError('Path should be a string'));
            }

            opts = Object.assign({
                json: true,
                endpoint: this.endpoint ? this.endpoint.replace(/[^/]$/, '$&/') : 'https://khipu.com/api/2.0/'
            }, opts);

            opts.headers = Object.assign({
                accept: 'application/json',
		'user-agent': 'https://github.com/hasaezs/khipu-got'
                //'user-agent': 'ITDMovil SpA.'
            }, opts.headers);

            if (isPlainObj(opts.body)) {
                opts.body = sortObj(opts.body);
            }

            const url = /^https?/.test(path) ? path : opts.endpoint + path;

            opts.headers.authorization = generateSign({
                url,
                method: opts.method,
                params: opts.body||opts.query || {}
            },this.id,this.secret);
            console.log("khipu");
            console.log(opts);

            return got(url, opts);
        
        };
    }
}
//HELPER para generar firma
function generateSign(obj,id,secret){

    let toSign = obj.method + '&' + encodeURIComponent(obj.url);

    Object.keys(obj.params).forEach(key => {
        toSign += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(obj.params[key]);
    });

    const hash = crypto.createHmac('sha256', secret).update(toSign).digest('hex');
    const sign = `${id}:${hash}`;
    console.log("sign");
    console.log(toSign);
    console.log(sign);
    console.log(id);
    console.log(secret);

    return sign;
}
const Pago = {
    GET:{
        json(req,res){
            let {transaction_id,subject,currency,amount} = req.session.trx;
            /*
             *let khipu = new Khipu(169197,"d9f825fbe37a3b139b3e3c9b86c0713da59efbe9");
             *res.json(khipu('banks', {method: 'GET'}).then(({body})=>{
             *    console.log(body);
             *    const [{bank_id}]=body.banks;
             *    return khipu("payments",{method:"POST",body:{
             *        bank_id,
             *        subject,
             *        currency,
             *        amount,
             *        transaction_id,
             *        return_url:`http://2ble_impacto.itdmovil.cl:8081/APP/Khipu/Pago?type=return`,
             *        cancel_url:`http://2ble_impacto.itdmovil.cl:8081/APP/Khipu/Pago?type=cancel`,
             *        notify_url:`http://2ble_impacto.itdmovil.cl:8081/APP/Khipu/Pago.json?xhr=true`,
             *    }}).then(({body})=>{
             *        console.log(body);
             *        Object.assign(req.session.trx,body);
             *        return req.session.trx;
             *    });
             *}));
             */
            res.json(khipuGot('banks', {method: 'GET'}).then(({body})=>{
                console.log(body);
                const [{bank_id}]=body.banks;
                return khipuGot("payments",{method:"POST",body:{
                    bank_id,
                    subject,
                    currency,
                    amount,
                    transaction_id,
                    return_url:`http://2ble_impacto.itdmovil.cl:8081/APP/Khipu/Pago?type=return&transaction_id=${transaction_id}`,
                    cancel_url:`http://2ble_impacto.itdmovil.cl:8081/APP/Khipu/Pago?type=cancel`,
                    notify_url:`http://2ble_impacto.itdmovil.cl:8081/APP/Khipu/Pago.json?xhr=true`,
                }}).then(({body})=>{
                    console.log(body);
                    Object.assign(req.session.trx,body);
                    return body;
                });
            }));
        }
    },
    POST(req,res){
        console.log("NOTIFICACION!!!");
        console.log(req.body);
        khipuGot(`payments`,{method:"GET",query:{
            notification_token:req.body.notification_token
        }}).then(({body})=>{
            body.userId=req.session.user||"usuario de prueba";
            let trx = new req.db.Khipu(body);
            trx.save().then(trx=>{
                console.log("operación terminada");
                console.log(trx);
                TRX[trx.transaction_id].emit("confirmTrx",trx);
            },console.error);
            
        },console.error);
        res.send("OK");
    },
    description:"Pago de Prueba",
    component:"Khipu"
};
/*
 *{ payment_id: 'dhhh38tijwqz',
 *  payment_url: 'https://khipu.com/payment/info/dhhh38tijwqz',
 *    app_url: 'khipu:///pos/dhhh38tijwqz',
 *      ready_for_terminal: false,
 *        transfer_url: 'https://khipu.com/payment/manual/dhhh38tijwqz',
 *          simplified_transfer_url: 'https://app.khipu.com/payment/simplified/dhhh38tijwqz' }
 *}
 */
    /*
     *route:{
     *    component:"PagoFake",
     *    props:true,
     *    children:[
     *        {
     *            path:":id",
     *            component:{
     *                props:["id"],
     *                template:"<div>{{id}}</div>"
     *            },
     *            props:true
     *        },
     *        {
     *            path:":id/test/:id2",
     *            component:{
     *                props:["id2"],
     *                template:"<div>{{id2}}</div>"
     *            },
     *            props:true
     *        }
     *    ]
     *},
     */

module.exports = {
    Pago
};
