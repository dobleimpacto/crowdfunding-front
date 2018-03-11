'use strict';
console.log("Cargando Schemas de 2ble impacto");
module.exports = db=>require('fs').readdirSync(__dirname).filter(file=>file!=="index.js" && file.endsWith('.js')).reduce((arr,file)=>arr.concat(require(`./${file}`)(db)),[]);
