const convert = require("xml-js");
const fs = require("fs");
var iconvlite = require("iconv-lite");
var mongo = require('mongodb');

var content = fs.readFileSync("il_ilceler.xml");
const xmlFile = iconvlite.decode(content, "utf8");

// parse xml file as a json object
const jsonData = JSON.parse(
  convert.xml2json(xmlFile, { compact: true, spaces: 4 })
);

let MongoDizisi = [];
for (let i = 0; i < jsonData.cityset.CITY.length; i++) {
  let toPush = {};

  let veri = jsonData.cityset.CITY[i];
  toPush.ilAdi = veri._attributes.cityname;
  toPush.plakaNo = veri._attributes.cityid;
  toPush.ilceler = [];
  for (let j = 0; j < veri.DISTRICT.length; j++) {
    toPush.ilceler.push(veri.DISTRICT[j].DISTNAME._text);
  }
  MongoDizisi.push(toPush);
}
 
// stringify JSON Object
var jsonContent = JSON.stringify(MongoDizisi);
 
fs.writeFile("output.json", jsonContent, 'utf8', function (err) {
    
});