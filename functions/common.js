/**
 * Stores all Common Functions used across multiple files
 */
var fs = require('fs');
var path = require('path');

var icon_mapping = {
  'wind_large': 'elements/element_wind_large.png',
  'lightning_large': 'elements/element_lightning_large.png',
  'water_large': 'elements/element_water_large.png',
  'fire_large': 'elements/element_fire_large.png',
  'mana_large': 'elements/element_mana_large.png',
  'earth_large': 'elements/element_earth_large.png',
  'wind_small': 'elements/element_wind_small.png',
  'lightning_small': 'elements/element_lightning_small.png',
  'water_small': 'elements/element_water_small.png',
  'fire_small': 'elements/element_fire_small.png',
  'mana_small': 'elements/element_mana_small.png',
  'earth_small': 'elements/element_earth_small.png',
  'heart': 'icons/icon_life.png',
  'cast_time': 'icons/icon_cast_time.png',
  'plus_one': 'icons/misc_plus_one.png',
  'attack': 'icons/type_attack.png',
  'defense': 'icons/type_defense.png',
  'healing': 'icons/type_healign.png'
}

var number_mapping = {
  '0': 'numbers/0.png',
  '1': 'numbers/1.png',
  '2': 'numbers/2.png',
  '3': 'numbers/3.png',
  '4': 'numbers/4.png',
  '5': 'numbers/5.png',
  '6': 'numbers/6.png',
  '7': 'numbers/7.png',
  '8': 'numbers/8.png',
  '9': 'numbers/9.png',
  'X': 'numbers/X.png'
}

function getImage(Image, icon_name) {
  var file_name = icon_mapping[icon_name];
  if (file_name) {
    var location = path.join(__dirname, '../images/', file_name);
    var png = fs.readFileSync(location);
    var img = new Image;
    img.src = png;
    return img;
  } else {
    return null;
  }
}

function getNumberImage(Image, number_string) {
  var file_name = number_mapping[number_string];
  if (file_name) {
    var location = path.join(__dirname, '../images/', file_name);
    var png = fs.readFileSync(location);
    var img = new Image;
    img.src = png;
    return img;
  } else {
    return null;
  }
}

module.exports = {
  getImage: getImage,
  getNumberImage: getNumberImage
}